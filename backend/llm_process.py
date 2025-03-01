from typing import Dict, Any
from langgraph.graph import StateGraph, END
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_deepseek import ChatDeepSeek
import ast
import operator


# Define allowed operators
operators = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Pow: operator.pow,
    ast.Mod: operator.mod,
    ast.UAdd: operator.pos,
    ast.USub: operator.neg
}

def evaluate_expression(expression: str):
    try:
        # Parse the expression
        node = ast.parse(expression, mode='eval').body
        return evaluate(node)
    except Exception as e:
        return f"Error: {e}"

def evaluate(node):
    """ Recursively evaluate AST nodes """
    if isinstance(node, ast.Num):  # Numbers
        return node.n
    elif isinstance(node, ast.BinOp):  # Binary operations
        left = evaluate(node.left)
        right = evaluate(node.right)
        return operators[type(node.op)](left, right)
    elif isinstance(node, ast.UnaryOp):  # Unary operations
        operand = evaluate(node.operand)
        return operators[type(node.op)](operand)
    else:
        raise ValueError("Unsupported operation")


# Define the state structure
class CalculatorState(Dict[str, Any]):
    query: str
    expression: str = ""
    result: float = 0.0
    response: str = ""

# Initialize LLM (configure with your API key)
llm =  ChatDeepSeek(
    model="deepseek-chat",
    temperature=0,
    max_tokens=1000,
    timeout=None,
    max_retries=2,
)

# Define prompt for parsing
parse_prompt = PromptTemplate(
    input_variables=["query"],
    template="""
    Convert the following natural language math query into a proper mathematical expression with parentheses to enforce the correct order of operations. Use +, -, *, / for operations and ensure "then" implies sequential operations from left to right. Return only the expression without explanation.

    Query: {query}

    Expression:
    """
)

# Create the parsing chain
parse_chain = parse_prompt | llm | StrOutputParser()

# Node to parse the query using LLM
def parse_query(state: CalculatorState) -> CalculatorState:
    try:
        expression = parse_chain.invoke({"query": state["query"]})
        state["expression"] = expression.strip()
    except Exception as e:
        state["expression"] = f"Error parsing: {str(e)}"
    return state

# Node to perform calculation
def calculate(state: CalculatorState) -> CalculatorState:
    try:
        expression = state["expression"]
        
        state["result"] = evaluate_expression(expression)
        
    except Exception as e:
        state["result"] = f"Error: Invalid expression - {str(e)}"
    return state

# Node to format the response
def format_response(state: CalculatorState) -> CalculatorState:
    if isinstance(state["result"], float):
        state["response"] = f"The result of '{state['query']}' is {state['result']}"
    else:
        state["response"] = state["result"]
    return state

# Create and compile the LangGraph workflow
def create_calculator_graph():
    workflow = StateGraph(CalculatorState)
    workflow.add_node("parse", parse_query)
    workflow.add_node("calculate", calculate)
    workflow.add_node("format", format_response)
    workflow.set_entry_point("parse")
    workflow.add_edge("parse", "calculate")
    workflow.add_edge("calculate", "format")
    workflow.add_edge("format", END)
    return workflow.compile()

# Main processing function
def process_query(query: str) -> str:
    calculator = create_calculator_graph()
    initial_state = CalculatorState(query=query)
    result = calculator.invoke(initial_state)
    return result["response"]

# Test function (optional)
if __name__ == "__main__":
    test_query = "what is the result of 2 plus 4 then divide 6 then add 8"
    result = process_query(test_query)
    print(result)