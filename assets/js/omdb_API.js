  src="http://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous">

  		// Asynchronous JavaScript and XML
		$.ajax('http://www.omdbapi.com/?apikey=40e9cece&t=Parent+Trap&y=1998')
		.done(function (data) {
			if (data.Response === 'False'){
				alert('movie doesn\'t exist');
			}
			else{
			$('#movieTitle').html(data.Title);
			$('#moviePlot').html(data.Plot);
			$('#movieYear').html(data.Year);
			$('#movieActors').html(data.Actors);
			}
		});
