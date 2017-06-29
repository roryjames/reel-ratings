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
          imdbRatings = response.Ratings[0].Value;
          rottenRatings = response.Ratings[1].Value;
          metaRatings = response.Ratings[2].Value;
          console.log(response);
          console.log("IMDB Rating: " + imdbRatings);
          console.log("Rotten Tomatoes Rating: " + rottenRatings);
          console.log("MetaCritic Rating: " + metaRatings);       
        });

      });
