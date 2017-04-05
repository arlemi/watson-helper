var watson = require('watson-developer-cloud'),
	fs = require('fs')

var text_to_speech = watson.text_to_speech({
	username: process.env.TTS_USERNAME,
	password: process.env.TTS_PASSWORD,
	version: process.env.TTS_VERSION
})

module.exports.toSpeech = function(req, res, cb) {
	var params = {
		text: 'Hello world',
		voice: 'en-US_AllisonVoice',
		accept: 'audio/ogg'
	}

	text_to_speech.synthesize(params).on('error', function(error) {
		console.log('Error:', error)
	}).pipe(fs.createWriteStream('./public/uploads/result.ogg').on('finish', function() {
		res.send('OK')
	}))
}