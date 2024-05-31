cd ..
cd restaurant-backend
call venv\Scripts\activate & python manage.py makemigrations & python manage.py migrate & python manage.py runserver