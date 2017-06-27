      // This .on("click") function will trigger the AJAX Call
      $("#find-movie").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();
        // Here we grab the text from the input box
        var movie = $("#title-input").val();
        // Here we construct our url
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#movie-view").text(JSON.stringify(response));
        });

      });
