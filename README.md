# Clonify

1. <a href="#what-is-clonify">About</a>
1. <a href="#features">Features</a>
1. <a href="#technologies">Technologies</a>
1. <a href="#setup">Setup</a>


## What is Clonify?
Clonify is a clone of Spotify. The main focus for this project is to replicate the major functionalities of a music application, while using Spotify as inspiration for styling.

<img src="images/clonify-header.png">

The data for the application is largely powered by Spotify's API. This provides up-to-date data and allows for powerful functionalities, such as search and music reccomendations.

Check out the live demo <a href="https://clonify-music.herokuapp.com/">here</a>!

<a href="https://github.com/bryanlancy/Clonify/wiki">Explore the docs »</a>

## Features
### Search for music
Search for new music by song, artist, or playlist and get results that are powered directly by Spotify's expansive music database.

<img src="images/clonify-search.png">

###  Listen to music
After finding a song you like, or if you're curious about a new song or playlist, just press the green play button and you can stream the music with Spotify's embedded music player.

<img src="images/clonify-player.png">

### Get recommended music
Using songs that you've liked through Clonify, the application will begin recommending suggested music based off of your preferences.

<img src="images/clonify-recommended.png">

### Get details on your favorite music and artists
Find all the related music for an artist, song, and playlist. Being powered by Spotify's API, there's a lot of music.

<img src="images/clonify-details.png">

## Technologies
<p>Frontend</p>
<div>
    <img alt="React" src="https://img.shields.io/badge/React%20-%2320232a.svg?logo=react&logoColor=%2361DAFB">
    <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC?logo=redux">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?logo=javascript&logoColor=black">
</div>
<div>
    <img alt="HTML" src="https://img.shields.io/badge/HTML%20-%23E34F26.svg?logo=html5&logoColor=white">
    <img alt="CSS3" src="https://img.shields.io/badge/CSS3%20-%231572B6.svg?logo=css3&logoColor=white">
</div>

<p>Backend</p>
<div>
    <img alt="Express.js" src="https://img.shields.io/badge/Express.js%20-%23404d59.svg?logo=express&logoColor=white">
    <img alt="Sequelize" src ="https://img.shields.io/badge/Sequelize-52B0E7.svg?logo=sequelize&logoColor=white">
    <img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-%23316192.svg?logo=postgresql&logoColor=white">
</div>

<p>APIs</p>
<div>
    <img alt="Spotify" src="https://img.shields.io/badge/Spotify-1ED760?logo=spotify&logoColor=white">
</div>

## Setup

 <em>
    The following setup assumes that you have PostgreSQL installed and have permissions to add a new user. Documentation can be found <a href="https://www.postgresql.org/">here</a>.
</em>
<br>
<em>
    You will also need access to Spotify's API. Specifically, you will need a client id and secret key as this application uses a client credentials flow for authorization with Spotify's API. Sign up or sign in to the Spotify Developer dashboard <a href="https://developer.spotify.com/dashboard/">here</a>.
</em>

<br><br>

1. **Clone repository & install Node dependencies**
    1. Clone the project with:<br>
    `git clone https://github.com/bryanlancy/Clonify.git`

    1. In the root project directory run the command:<br>
    `npm run install`
1. **Setup the backend environment**
    1. Make a copy of the `.env.example` file found in the `backend` folder and rename it to `.env`.
    1. In the `.env` file, replace all values surrounded in `< >` with the corresponding information. Unless you have already done so, you can generate these values now.

        - `DB_USERNAME` - PostgreSQL user name
        - `DB_PASSWORD` - PostgreSQL user password
        - `DB_DATABASE` - PostgreSQL database name
            - database will be created in a later step.
        - `JWT_SECRET` - JSON Web Token Secret
            - should be unique and secure.
        - `SPOTIFY_CLIENT_ID` - Spotify Client ID
        - `SPOTIFY_CLIENT_SECRET` - Spotify Client Secret

        <br>

        :warning: *The `.env.example` is tracked by git version control, **do not** save any sensitive information in this file.*
    1. **Create PostgreSQL user.**
        - In your terminal run, `psql`, to start PostgreSQL's interactive terminal.
        - `CREATE USER <DB_USERNAME> WITH PASSWORD '<DB_PASSWORD>' CREATEDB;`. Remember to replace the values in `< >` with the values we created in the previous step.
        <img src="images/psql-user-create.png">
1. **Create & seed the database**
    1. In your terminal, navigate to the `backend` folder found in the main project directory.
    1. Then run, `npm run db-setup`. This will run a series of commands that should automatically set up your database. If any errors occur, you can run the commands individually, in this order.
        1. `npm run db-create`
        1. `npm run db-migrate`
        1. `npm run db-seed`
1. **Start the application**
    1. In your terminal, navigate to the main project folder.
    1. Then run `npm run fullstart`. This will start the backend and frontend server. <br>
        - Each server can be started manually by navigating to the respective folder, `frontend` and `backend`, and running the command `npm start`.
    1. In your browser navigate to <a href="http://localhost:3000">localhost:3000</a>
