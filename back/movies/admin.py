from django.contrib import admin
from .models import Actor, Movie, Category
# Register your models here.
class ActorAdmin(admin.ModelAdmin):
    fields = ('name','age','gender')

admin.site.register(Actor, ActorAdmin)

class MovieAdmin(admin.ModelAdmin):
    fields = ('title','category','cast')

admin.site.register(Movie, MovieAdmin)


class CategoryAdmin(admin.ModelAdmin):
    fields = ('name',)

admin.site.register(Category, CategoryAdmin)