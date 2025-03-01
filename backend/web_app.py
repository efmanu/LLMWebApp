from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm_process import process_query  # Import from llm_process
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="Calculator Web App", description="A web app for nested calculations")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model
class QueryRequest(BaseModel):
    query: str

# Define HTTP endpoint
@app.post("/calculate", response_model=dict)
async def calculate_result(request: QueryRequest):
    """
    Endpoint to calculate the result of a mathematical query.
    Example: {"query": "what is the result of 2 plus 4 then divide 6 then add 8"}
    """
    try:
        result = process_query(request.query)
        return {"query": request.query, "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing query: {str(e)}")
    
def run():
    uvicorn.run(app, host="0.0.0.0", port=9080)