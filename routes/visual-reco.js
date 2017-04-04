var request = require('request')

var watson = require('watson-developer-cloud'),
	credentials = require('../credentials')

var vr_creds = credentials.watson.visual_recognition

var visual_recognition = watson.visual_recognition({
	api_key: vr_creds.api_key,
	version_date: vr_creds.version_date,
	version: vr_creds.version
})

module.exports.classifyFromFile = function(req, res, cb) {
	var params = {
		images_file: fs.createReadStream(req.file.path)
	};

	visual_recognition.classify(params, function(err, data) {
		if (err)
			return cb(err)
		else
			return res.send(data)
	})
}

module.exports.classifyFromURL = function(req, res, cb) {

	var imgUrl = req.body.imgUrl
	console.log(imgUrl)

	var params = {
		images_file: imgUrl,
		parameters: {
			'url': imgUrl
		}
	}

	request('https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=' + vr_creds.api_key + '&url=' + imgUrl + '&version=2016-05-19', function(err, response, data) {
		if (err)
			return cb(err)
		else
			return res.send(data)
	});
}