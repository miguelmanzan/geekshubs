# Backend GeekHubs - Miguel Manzano

## API endpoints

### Añadir nuevas películas
```
POST /movies
{
    "title": string,
    "category": string,
    "cast": Array<string>
}

return
422 if the body is malformed
400 if movie's title already exists
400 if at least one of the actors in the cast is not registered
200 if correct

if the request is successful it should store the movie
```
### Obtener todas las películas
```
GET /movies

return 
200
Array<{
    "title": string,
    "category": string,
    "cast": Array<string>
}> (list of movie titles)
```
### Añadir un nuevo actor
```
POST /actors
{
    "name": string,
    "age": number,
    "gender": "male" | "female"
}

return
422 is the body is malformed
400 if the actor's name already exists
400 if the actor's gender is not "male" or "female"
200

if the request is succesful it should store the actor
```
### Obtener todos los actores
```
GET /actors

return
200
Array<{
    "name": string,
    "age": number,
    "gender": "male" | "female"
} > (list of actors)
```
### Obtener películas en las que aparezcan los actores seleccionados
```
GET /performances?actors=string,string,...

return
400 if at least one of the actors does not exist
400 if the 'actors' query parameter is not sent
200
Array<{
    "title": string,
    "category": string,
    "cast": Array<string>
}> (list of movies where all the actors in the query appear)
```
### Obtener actores que aparezcan en las películas seleccionadas

get actors that appear in all the requested movies
```
GET /common_actors?movies=string,string,...

return
400 if at least one movie does not exist
400 if 'movies' query parameter does not exist
200
Array<{
    "name": string,
    "age": number,
    "gender": "male" | "female"
}> (list of actors that appear in all requested movies)
```
