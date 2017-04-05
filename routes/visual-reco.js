var request = require('request'),
	fs = require('fs'),
	watson = require('watson-developer-cloud')

var visual_recognition = watson.visual_recognition({
	api_key: process.env.VR_API_KEY,
	version_date: process.env.VR_VERSION_DATE,
	version: process.env.VR_VERSION
})

module.exports.classifyFromFile = function(req, res, cb) {
	if (!req.file && !req.file.path) {
		return cb({
			error: 'Missing required parameter: file',
			code: 400
		})
	}

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

	request('https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=' + process.env.VR_API_KEY + '&url=' + imgUrl + '&version=2016-05-19', function(err, response, data) {
		if (err)
			return cb(err)
		else
			return res.send(data)
	});
}