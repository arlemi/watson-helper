# Watson Helper for the Visually Impaired

A simple web-app to describe images by voice to visually impaired users.

## Instructions

- Download or clone this repository

- Put your service credentials in a .env file at the root of the project
```
# Visual Recognition
VR_API_KEY=
VR_VERSION=v3
VR_VERSION_DATE=2016-05-20

# Text to Speech
TTS_USERNAME=
TTS_PASSWORD=
TTS_VERSION=v1
```

- Install dependencies

`npm install`

- Run from command line

`node app.js`

## TODO

- ~~Use a .env file for the credentials~~
- ~~Error handling client-side~~
- ~~Error handling server-side~~
- ~~Visual Recognition from file~~
- ~~Delete files from the temp folder after X hours~~
- ~~Create understandable text from Visual Recognition result~~
- ~~Text-to-Speech from previously created text~~
- ~~A bit of CSS couldn't hurt~~
- A little bit more of CSS
- Bonus: Tamper/Greasemonkey plugin (might reach the limit for Visual Recognition too quickly...)