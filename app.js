var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	dotenv = require('dotenv').config()

/* 
*   using multer for file upload 
*   when the user is getting a file from his computer 
*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(express.static(__dirname + '/public'))

/* 
*   routes declaration
*/
var visual_reco_route = require('./routes/visual-reco'),
	text_to_speech_route = require('./routes/text-to-speech')

app.get('/', function(req, res) {
	res.sendFile('index.html', {
		root: 'public'
	})
})

app.post('/classifyurl', visual_reco_route.classifyFromURL)

app.post('/classifyfile', upload.single('images_file'), visual_reco_route.classifyFromFile)

app.post('/tospeech', text_to_speech_route.toSpeech)

var port = 3000
app.listen(port, function() {
	console.log('listening at:', port)
})