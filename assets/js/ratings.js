      $("#addShow").on("click", function(event) {
      	var imdbRatings, rottenRatings, metaRatings;
        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();
        // Here we grab the text from the input box
        var movie = $("#titleSearch").val().trim();
        // Here we construct our url
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#moviesHere").text(JSON.stringify(response));

          imdbHundred = response.Ratings[0].Value;
          imdbNums = imdbHundred.split('/');
          imdbRatings = parseFloat(imdbNums[0]);

          rottenRatings = (parseFloat(response.Ratings[1].Value) / 10) ;
          
          metaHundred = (response.Ratings[2].Value);
          metaNums = metaHundred.split('/');
          metaRatings = parseFloat(metaNums[0] / 10);

          //rating results
          console.log(imdbRatings);
          console.log(rottenRatings);
          console.log(metaRatings);

          var reelRatingAdd = (imdbRatings + rottenRatings + metaRatings); 
          var reelRating = (reelRatingAdd / 3);
          console.log("Reel Rating is " + Math.round(reelRating * 10) / 10);

        });

      });
