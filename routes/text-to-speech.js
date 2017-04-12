var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1'),
	fs = require('fs')

var text_to_speech = new TextToSpeechV1 ({
	username: process.env.TTS_USERNAME,
	password: process.env.TTS_PASSWORD,
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

	// dirty workaround, beforehand call to voices() to check the credentials
	text_to_speech.voices(null, function(error, voice) {
	  if (error)
	    res.status(401).send('Wrong credentials')
	  else { 
	  	text_to_speech.synthesize(params).on('error', function(err) {
			return res.status(500).send('Could not create an audio file from the provided text!')
		}).pipe(fs.createWriteStream('./public/uploads/' + timestamp + '-result.ogg').on('finish', function() {
			res.send({timestamp: timestamp})
		}))
	  }
	})
}