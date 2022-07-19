from dataclasses import field
from rest_framework import serializers
from .models import Actor, Movie, Category

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id','name','age','gender')

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id','title','category','cast')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name',)