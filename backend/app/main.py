"""Modulo principal de la aplicación fastAPI."""
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router.api_boat_list)
app.include_router(router.api_port_list)
app.include_router(router.api_route_calc)

if __name__ == "__main__":
    print('boatco2 backend main.py')
