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
```

- Create an **uploads** folder in **public**  

- Install dependencies

`npm install`

- Run from command line

`npm start`

## TODO

- A little bit more of CSS - make the ui usable by everyone ([see here](http://www.afb.org/info/programs-and-services/technology-evaluation/creating-accessible-websites/123))
- Add Natural Language Understanding to describe the content of a website (main topic, authors...)
- Add Language Translation in the middle
- React all the things!
- Bonus: Tamper/Greasemonkey plugin (might reach the limit for Visual Recognition too quickly...)