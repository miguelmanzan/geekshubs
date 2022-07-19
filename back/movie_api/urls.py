"""movie_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import re_path, include,path
from rest_framework import routers
from movies.views import ActorViewSet,MovieViewSet,CategoryViewSet,CommonActorsAPIView,PerformancesAPIView
from movies import views
router = routers.DefaultRouter()
router.register('actors', ActorViewSet)
router.register('movies', MovieViewSet)
router.register('categories', CategoryViewSet)
urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^', include(router.urls)),
    re_path('common_actors', CommonActorsAPIView.as_view()),
    re_path('performances', PerformancesAPIView.as_view()),
    re_path(r'^actors/name/(?P<name>[\w\- ]+)/$',views.actorsname,name="actorsname"),
    #re_path(r'^actors/name/(?P<name>[A-Za-z ]+)/$',views.actorsname,name="actorsname"),
    re_path(r'^movies/title/(?P<title>[\w\- ]+)/$',views.moviestitle,name="moviestitle"),
    re_path(r'^movies/cast/(?P<cast>[\w\-]+)/$',views.moviescast,name="moviescast"),
    re_path(r'^movies/category/(?P<category>[\w\-]+)/$',views.moviescategory,name="moviescategory"),
    #path('polls/<int:pk>/',views.actorsfilter,name="actorsfilter"),
]
