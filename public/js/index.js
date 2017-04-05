$(document).ready(function() {
	$('input#sendImgUrl').on('click', function(res) {
		var imgUrl = $('input#imgUrl').val()
		if (/https?:\/\/.*\.(?:png|jpg)/.test(imgUrl)) {
			waitStart()
			$.post('/classifyurl', {
				imgUrl: imgUrl
			}).done(function(data) {
				describeImage(JSON.parse(data))
			})
		} else {
			alert("please check the URL of your image")
		}
	})

	$('input#sendImgFile').on('click', function(res) {
		var formData = new FormData()
		if($('input#imgFile')[0].files[0]) {
			formData.append('images_file', $('input#imgFile')[0].files[0]);
			$.ajax({
				url: '/classifyfile',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				dataType: 'json',
				success: function(res, status, err) {
					describeImage(res)
				}
			})
		} else {
			alert("Please upload a file first")
		}
	})

	function describeImage(obj) {		
		if(!obj.images[0].classifiers[0].classes) {
			showText("I couldn't find anything in that image")
			return
		}

		var describingTxt = "",
			containsLikely = "",
			containsMaybe = ""
		var classes = obj.images[0].classifiers[0].classes
		for(var i = 0, len = classes.length; i < len; i++) {
			currentClass = classes[i]
			if(currentClass.score >= 0.7)
				containsLikely += currentClass.class + ", "
			if(currentClass.score < 0.7)
				containsMaybe += currentClass.class + ", "
		}

		if(containsLikely != "" && containsMaybe != "") {
			describingTxt = "This image probably contains:"
				+ containsLikely
				+ "it might also show: "
				+ containsMaybe
		} else if (containsLikely != "" && containsMaybe == "") {
			describingTxt = "This image probably contains:"
				+ containsLikely
		} else if(containsLikely == "" && containsMaybe != "") {
			describingTxt = "This image might contain:"
				+ containsMaybe
		}

		showText(describingTxt)
	}

	function showText(txt) {
		$('div#text').empty().html('<p>' + txt + '</p>')
		sayText(txt)
	}

	function sayText(txt) {
		$.post('/tospeech', {text: txt}).done(function(res, status, err) {
			$('#audio').empty()
			$('<audio controls>It\'s time to update your browser.</audio>').attr({
				'src': './uploads/'+ res.timestamp +'-result.ogg',
				'volume': 0.4,
				'autoplay': 'autoplay'
			}).appendTo('#audio')
		})
	}

	function waitStart() {
		$('div#text, div#audio').append('<img src="./images/wait.gif"/>')
	}
})