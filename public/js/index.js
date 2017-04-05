$(document).ready(function() {
	$('input#sendImgUrl').on('click', function(res) {
		var imgUrl = $('input#imgUrl').val()
		$.post('/classifyurl', {
			imgUrl: imgUrl
		}).done(function(data) {
			console.log(data)
		})
	})

	$('input#sendImgFile').on('click', function(res) {
		var formData = new FormData();
		formData.append('images_file', $('input#imgFile')[0].files[0]);

		/*$.post('/classifyfile', formData).done(function(data) {
			console.log(data)
		})*/

		$.ajax({
			url: '/classifyfile',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(res, status, err) {
				$.post('/tospeech').done(function(res, status, err) {
					$('#audio audio').attr({
						'src': './uploads/result.ogg',
						'volume': 0.4,
						'autoplay': 'autoplay'
					})
				})
			}
		})
	})
})