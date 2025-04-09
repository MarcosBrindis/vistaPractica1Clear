  # .ENV

#### Contenido del archivo .env

```javascript
VITE_URL=http://localhost:8080/user/
VITE_URL2=http://localhost:8080/filmhub/
```

 # api

 #### url de la api
```javascript
https://github.com/MarcosBrindis/practica1Hex_api.git
```

# base de datos (postgresSQL)

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    duration FLOAT NOT NULL,
    release_year INT NOT NULL
);