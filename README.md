# FastAPI backend with React frontend

 - Authentication using the **fastapi.security** package. O-Auth 2 JWT tokens.
 - Database provider using **sqlalchemy**
 - React frontend with ViteJS 

### Run this project
Start FastAPI backend:
```bash
cd backend
poetry install
poetry shell
uvicorn main:app --reload

# or with docker 
docker compose up -d # to run it as daemon
```
Start React frontend:
```bash
cd frontend
npm install
npm run dev
```

The **FastAPI SwaggerUI Docs** will be running at http://localhost:8000/docs

The **ViteJS development server** will be running at http://localhost:5173

## License
This project is licensed under the terms of the MIT license. See the LICENSE file for details.
