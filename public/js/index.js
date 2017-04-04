$(document).ready(function() {
	$('input#sendImgUrl').on('click', function(res) {
          var imgUrl = $('input#imgUrl').val()
          $.post('/classifyurl',{imgUrl: imgUrl}).done(function(data) {
          	console.log(data)
          })
	})
})