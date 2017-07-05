$(document).ready(function() {

    var imdbRatings, rottenRatings, metaRatings;

    $('body').on("click", "img", function() { //dom for image click
        var dataId = $(this).attr("data-id");
        var queryURL = "https://api.themoviedb.org/3/movie/" + dataId + "?api_key=50c9867e013d532a54d305162ee29e35&append_to_response=videos";

        $.ajax({ 
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            if (response.videos.results['0'] === undefined) { //if video is undefined

                $("#modalMovieDiv").empty(); //clears div of any content

                $("#modalTitleH4").html(response.title + ' (' + response.release_date + ')' +
                    '<br><h5>' + '"' + response.tagline + '"</h5>');

                $("#myModal").modal("show");

            }
            // code to see if tagline = "", dont display it
            // else if (response.videos.results['0'] === undefined && response.tagline != '""') {

            //     $("#modalMovieDiv").empty();

            //     $("#modalTitleH4").html(response.title + ' (' + response.release_date + ')' +
            //         '<br><h5>' + '"' + response.tagline + '"</h5>');

            //     $("#myModal").modal("show");
            // }

            else {
                console.log(response.videos.results['0'].key); //if video  exists

                $("#modalMovieDiv").empty();

                $("#modalTitleH4").html(response.title + ' (' + response.release_date + ')' +
                    '<br><h5>' + '"' + response.tagline + '"</h5>');

                var ytKey = response.videos.results['0'].key;

                var youtube = $('<iframe>'); //creates iframe for movie
                youtube.addClass('allowfullscreen frameborder="0"');
                youtube.attr("src", "https://www.youtube.com/embed/" + ytKey);
                var movieDiv = $('<div>');
                movieDiv.addClass('embed-responsive embed-responsive-16by9');
                movieDiv.append(youtube);

                $('#modalMovieDiv').append(movieDiv); //appens video to div

                $("#myModal").modal("show");
            }

        });

        var dataRatings = $(this).attr("data-ratings");
        var queryURLrating = "https://www.omdbapi.com/?t=" + dataRatings + "&apikey=40e9cece";

        console.log(queryURLrating);

        $.ajax({ //ajax call to grab rating / information
            url: queryURLrating,
            method: "GET"
        }).done(function(response) {
            //clears existing divs
            $("#modalBodyDiv").empty();
            $("#modalBodyRatings").empty();
            //creates information about movie
            var information = $('<h5>').html(response.Genre + '<br>' +
                response.Plot + '<hr>' +
                'Director: ' + response.Director + '<br>' +
                'Cast: ' + response.Actors);

            $("#modalBodyDiv").append(information);

            imdbHundred = response.Ratings[0].Value;
            imdbNums = imdbHundred.split('/');
            imdbRatings = parseFloat(imdbNums[0]);

            rottenRatings = (parseFloat(response.Ratings[1].Value) / 10);

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

            var ratings = $('<h5>').html("IMDb = " + imdbRatings + " Rotten Tomatoes = " + rottenRatings + " Metacritic = " + metaRatings + "<br><br>" + "Reel Rating = " + Math.round(reelRating * 10) / 10);

            $("#modalBodyRatings").append(ratings);

        });
    });

});
