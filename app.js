// express
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

// routes
var visual_reco_route = require('./routes/visual-reco'),
	text_to_speech_route = require('./routes/text-to-speech')

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: 'public'})
})

app.post('/classifyurl', visual_reco_route.classifyFromURL)

var port = 3000
app.listen(port, function() {
	console.log('listening at:', port)
})