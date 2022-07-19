from django.contrib.auth.models import User
from django.test.client import Client
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from .views import ActorViewSet,MovieViewSet,CategoryViewSet,CommonActorsAPIView,PerformancesAPIView,actorsname, moviestitle,moviescategory,moviescast
import json
import unittest


class SimpleTest(unittest.TestCase):
    def test_get_movies_from_sub_title(self):
        sub_title = "sombra"
        client = Client()
        response = client.get('/movies/title/'+sub_title+'/')
        #print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_get_actors_from_sub_name(self):
        sub_name = "jose"
        client = Client()
        response = client.get('/actors/name/'+sub_name+'/')
        #print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_get_movies_with_category_pk(self):
        pk = "1"
        client = Client()
        response = client.get('/movies/category/'+pk+'/')
        #print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_get_movies_from_cast(self):
        cast_ids = "1-2"
        client = Client()
        response = client.get('/movies/cast/'+cast_ids+'/')
        #print(response.content)
        self.assertEqual(response.status_code, 200)

    def test_actor_view(self):
        url = "/"
        data = {
            'get': 'list',
        }
        factory = APIRequestFactory()
        request = factory.get(url,
                          content_type='application/json')
        views = ActorViewSet.as_view(data)
        response = views(request)
        response.render()
        #print(json.loads(response.content))
        assert response.status_code == 200

    def test_movie_view(self):
        url = "/"
        data = {
            'get': 'list',
        }
        factory = APIRequestFactory()
        request = factory.get(url,
                          content_type='application/json')
        views = MovieViewSet.as_view(data)
        response = views(request)
        response.render()
        #print(json.loads(response.content))
        assert response.status_code == 200

    def test_category_view(self):
        url = "/"
        data = {
            'get': 'list',
        }
        factory = APIRequestFactory()
        request = factory.get(url,
                          content_type='application/json')
        views = CategoryViewSet.as_view(data)
        response = views(request)
        response.render()
        #print(json.loads(response.content))
        assert response.status_code == 200

    def test_common_actors_view_exists(self):
        url = "/?movies=La sombra,nueva"
        factory = APIRequestFactory()
        request = factory.get(url,content_type='application/json')
        views = CommonActorsAPIView.as_view()
        response = views(request)
        response.render()
        #print(json.loads(response.content))
        assert response.status_code == 200

    def test_performances_view_exists(self):
        url = "/?actors=david,jose"
        factory = APIRequestFactory()
        request = factory.get(url,content_type='application/json')
        views = PerformancesAPIView.as_view()
        response = views(request)
        response.render()
        print(json.loads(response.content))
        assert response.status_code == 200
'''

# tests go here

class TestCalls(TestCase):


    def test_ad_login(self):
       c = Client()
       response = c.get('/movies/title/La')
       print(response.content)
       self.assertEqual(200, response.status_code)

'''
'''
    def test_admin_login(self):
       c = Client()
       response = c.post('/admin/login/', {'username': 'admin', 'password': 'admin'})
       self.assertEqual(200, response.status_code)

    def test_call_geonames(self):
        url = "/"

        data = {
            'masters': {'name':'Miguel'},
            'cp': '08191'
        }
        factory = APIRequestFactory()
        request = factory.post(url,
                          content_type='application/json',
                          data=json.dumps(data))
        views = ActorViewSet.as_view()
        response = views(request)
        response.render()
        print(json.loads(response.content))
        assert response.status_code == 200

'''