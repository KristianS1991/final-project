import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/final-project-db')
secret = os.getenv('SECRET', 'something good')
