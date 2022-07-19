from django.db import models
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.exceptions import APIException

class ValidationError422(APIException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY


def has_numbers(inputString):
    return any(char.isdigit() for char in inputString)

# creating a validator functions
def validate_string_processable(value):
    if has_numbers(value):
        raise ValidationError422("Field has numbers")
    else:
        return value
 
def validate_age_processable(value):
    if (value<=0 or value>120):
        raise ValidationError422("Age not processable")
    else:
        return value

# Create your models here.


GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)

class Actor(models.Model):
    name = models.CharField(max_length=40,validators =[validate_string_processable],unique=True)
    age = models.IntegerField(validators =[validate_age_processable])
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    def __str__(self):
        return (self.name)

class Category(models.Model):
    name = models.CharField(max_length=40,default="",unique=True)
    def __str__(self):
        return (self.name)
class Movie(models.Model):
    title = models.CharField(max_length=40,unique=True)
    category =models.ForeignKey(Category, on_delete=models.CASCADE)
    cast = models.ManyToManyField(
        Actor,
        related_name='actors'
    )
    def __str__(self):
        return self.title

