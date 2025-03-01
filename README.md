# LLM based Calculator Web Application

A web application that processes natural language mathematical queries using a combination of React frontend and FastAPI backend.

## Project Structure

The project is organized into two main directories:

1. `frontend`: Contains the React frontend code.
2. `backend`: Contains the FastAPI backend code.


## Backend Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
- On Windows:
```bash
.\venv\Scripts\activate
```
- On macOS/Linux:
```bash
source venv/bin/activate
```

4. Install required packages:
```bash
pip install fastapi uvicorn pydantic
```

### Running the Backend

1. Make sure you're in the backend directory with the virtual environment activated
2. Start the server:
```bash
    python main.py
```

The backend will be available at `http://localhost:9080`

## Frontend Setup

### Prerequisites
- Node.js 14.x or higher
- npm (Node package manager)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Frontend

1. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Usage

1. Start both the backend and frontend servers following the instructions above
2. Open your browser and navigate to `http://localhost:3000`
3. Enter mathematical queries in natural language, for example:
   - "what is 2 plus 4 then divide by 3"
   - "calculate 10 minus 5 then multiply by 2"

## API Endpoints

### POST /calculate
- Endpoint for processing mathematical queries
- Request body:
```json
{
    "query": "what is 2 plus 4 then divide 6 then add 8"
}
```
- Response:
```json
{
    "query": "what is 2 plus 4 then divide 6 then add 8",
    "result": 9.0
}
```

## Development

- Backend is built with FastAPI and runs on port 9080
- Frontend is built with React and runs on port 3000
- CORS is enabled for communication between frontend and backend

## Troubleshooting

1. CORS Issues
   - Ensure the backend is running on port 9080
   - Verify that CORS middleware is properly configured in `web_app.py`

2. Connection Issues
   - Check if both frontend and backend servers are running
   - Verify the ports (3000 for frontend, 9080 for backend) are not in use

3. Package Issues
   - Make sure all required packages are installed in the virtual environment
   - Check package versions in requirements.txt
