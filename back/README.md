## Quick start

## 1. Install pipenv

pip install --user pipenv

## 2. Go to project folder

cd back

## 3. Get system Python version

python --version

## 4. Create new environment 

pipenv --python XXXXX

XXXXX: python version get before 

## 5. Select new enviroment

pipenv shell

## 6. Install dependencies

pipenv install django
pipenv install djangorestframework
pipenv install requests
pipenv install django-cors-headers

## 7. Run server

pipenv run python manage.py runserver