from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

from rest_framework import viewsets
from .serializers import ActorSerializer, MovieSerializer, CategorySerializer
from .models import Actor, Movie, Category
import json
from django.http import HttpResponse

class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CommonActorsAPIView(APIView):
    serializer_class = MovieSerializer

    def get(self, request, *args, **kwargs):
        try:
            movies = request.query_params["movies"]
            if movies != None:
                movies = movies.split(sep=',')
                actors = []
                for movie in movies:
                    if Movie.objects.filter(title=movie).exists():
                        actors=actors+list(Movie.objects.get(title=movie).cast.values_list())
                    else:
                        content = {'common_actors': 'at least one movie does not exist'}
                        return Response(content, status=status.HTTP_400_BAD_REQUEST)
                result = []
                for actor in actors:
                    result.append(Actor.objects.get(pk=actor[0]))
                serializer = ActorSerializer(result, many=True)
        except Exception as e:
            content = {'common_actors': 'movies query parameter does not exist'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data,status=status.HTTP_200_OK)


class PerformancesAPIView(APIView):
    serializer_class = ActorSerializer
    def check_together(self,actors,cast):
        actorsinmovie = []
        for actor in cast:
            actorsinmovie.append(actor[0])
        #check if list1 (movie cast) contains all elements in list2 (actors list)
        return all(elem in actorsinmovie  for elem in actors)
        
    def get(self, request, *args, **kwargs):
        try:
            actors = request.query_params["actors"]
            if actors != None:
                actors = actors.split(sep=',')
                for actor in actors:
                    if Actor.objects.filter(name=actor).exists():
                        pass
                    else:
                        content = {'performance': 'at least one of the actors does not exist'}
                        return Response(content, status=status.HTTP_400_BAD_REQUEST)
                #movies that those actors have acted.
                movies = Movie.objects.filter(cast__name__in=actors).distinct()
                #movies that those actors have acted together
                movies_all_actors_appear = []
                for mov in movies:
                    cast = list(mov.cast.values_list())
                    if(self.check_together(actors,cast)):
                        movies_all_actors_appear.append(mov)
                serializer = MovieSerializer(movies_all_actors_appear, many=True)
        except Exception as e:
            content = {'performances': 'actors query parameter is not sent'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data,status=status.HTTP_200_OK)


def actorsname(request,name):
    try:
        actors = Actor.objects.filter(name__icontains=name)
        serializer = ActorSerializer(actors, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type='application/json')
    except Exception as e:
        return HttpResponse(str(e), status=status.HTTP_400_BAD_REQUEST)


def moviestitle(request,title):
    try:
        movies = Movie.objects.filter(title__icontains=title)
        serializer = MovieSerializer(movies, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type='application/json')
    except Exception as e:
    	return HttpResponse(str(e), status=status.HTTP_400_BAD_REQUEST)

def moviescategory(request,category):
    try:
        movies = Movie.objects.filter(category__pk=category)
        serializer = MovieSerializer(movies, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type='application/json')
    except Exception as e:
    	return HttpResponse(str(e), status=status.HTTP_400_BAD_REQUEST)


def check_together(actors,cast):
    actors = list(map(int, actors))
    actorsinmovie = []
    for actor in cast:
        actorsinmovie.append(actor[0])
    #check if list1 (movie cast) contains all elements in list2 (actors list)
    return all(elem in actorsinmovie  for elem in actors)

def moviescast(request,cast):
    try:
        actors = cast.split(sep='-')
        for actor in actors:
            if Actor.objects.filter(pk=actor).exists():
                pass
            else:
                content = {'performance': 'at least one of the actors does not exist'}
                dump = json.dumps(content)
                return HttpResponse(dump, status=status.HTTP_400_BAD_REQUEST)
        movies = Movie.objects.filter(cast__pk__in=actors).distinct()
        movies_all_actors_appear = []
        for mov in movies:
            cast = list(mov.cast.values_list())
            if(check_together(actors,cast)):
                movies_all_actors_appear.append(mov)
        serializer = MovieSerializer(movies_all_actors_appear, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type='application/json')
    except Exception as e:
    	return HttpResponse(str(e), status=status.HTTP_400_BAD_REQUEST)