var watson = require('watson-developer-cloud'),
	fs = require('fs')

var text_to_speech = watson.text_to_speech({
	username: process.env.TTS_USERNAME,
	password: process.env.TTS_PASSWORD,
	version: process.env.TTS_VERSION
})

/* 
*   Transforms text to an audio file
*   - creates an audio file in public/uploads
*   - using a timestamp for unique naming
* 	- returns the timestamp to frontend
*/
module.exports.toSpeech = function(req, res, cb) {
	var text = req.body.text
	var timestamp = Date.now()
	var params = {
		text: text,
		voice: 'en-US_AllisonVoice',
		accept: 'audio/ogg'
	}

	text_to_speech.synthesize(params).on('error', function(err) {
		return res.status(500).send('Could not create audio file from text!')
	}).pipe(fs.createWriteStream('./public/uploads/' + timestamp + '-result.ogg').on('finish', function() {
		res.send({timestamp: timestamp})
	}))
}