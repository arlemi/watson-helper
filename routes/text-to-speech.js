var watson = require('watson-developer-cloud'),
	credentials = require('../credentials')

var tts_creds = credentials.watson.text_to_speech

var text_to_speech = watson.text_to_speech({
	version: tts_creds.version,
	username: tts_creds.username,
	password: tts_creds.password
})

