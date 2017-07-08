$(document).ready(function() {
    var imdbRatings, rottenRatings, metaRatings, dataMedia;

    $('body').on("click", "img", function() { //dom for image click
        var dataMedia = $(this).attr("data-media");

        if (dataMedia === "movie" || dataMedia === undefined) {
            var dataId = $(this).attr("data-id");
            var queryURL = "https://api.themoviedb.org/3/movie/" + dataId + "?api_key=50c9867e013d532a54d305162ee29e35&append_to_response=videos";

            $.ajax({
                url: queryURL,
                method: "GET",
                error: function(xhr, ajaxOptions, thrownError) {
                    if (xhr.status = 404) {
                        console.log(this + ' is throwing error ' + thrownError);
                    }
                }
            }).done(function(response) {

                $("#modalMovieDiv").empty(); //clears div of any content

                $("#modalTitleH4").html(response.title + ' (' + response.release_date + ')');

                if (response.tagline != "") {

                    $("#modalTitleH4").append('<br><h5 class="tagline">' + '"' + response.tagline + '"</h5>');
                }

                $("#myModal").modal("show");

                if (response.videos.results['0'] != undefined) {
                    var ytKey = response.videos.results['0'].key;

                    var youtube = $('<iframe>'); //creates iframe for movie
                    youtube.addClass('allowfullscreen frameborder="0"');
                    youtube.attr("src", "https://www.youtube.com/embed/" + ytKey);
                    var movieDiv = $('<div class="movie">');
                    movieDiv.addClass('embed-responsive embed-responsive-16by9');
                    movieDiv.append(youtube);

                    $('#modalMovieDiv').append(movieDiv); //appens video to div
                }

                $("#myModal").modal("show");

            });
        }
        if (dataMedia === "tv") {
            var dataId = $(this).attr("data-id");
            var queryURL = "https://api.themoviedb.org/3/tv/" + dataId + "?api_key=50c9867e013d532a54d305162ee29e35&append_to_response=videos";

            $.ajax({
                url: queryURL,
                method: "GET",
                error: function(xhr, ajaxOptions, thrownError) {
                    if (xhr.status = 404) {
                        console.log(this + ' is throwing error ' + thrownError);
                    }
                }
            }).done(function(response) {

                $("#modalMovieDiv").empty(); //clears div of any content

                $("#modalTitleH4").html(response.name + ' (' + response.first_air_date + ')');

                $("#myModal").modal("show");

                if (response.videos.results['0'] != undefined) {
                    var ytKey = response.videos.results['0'].key;

                    var youtube = $('<iframe>'); //creates iframe for movie
                    youtube.addClass('allowfullscreen frameborder="0"');
                    youtube.attr("src", "https://www.youtube.com/embed/" + ytKey);
                    var movieDiv = $('<div class="movie">');
                    movieDiv.addClass('embed-responsive embed-responsive-16by9');
                    movieDiv.append(youtube);

                    $('#modalMovieDiv').append(movieDiv); //appens video to div
                }

                $("#myModal").modal("show");

            });
        }
        var dataRatings = $(this).attr("data-ratings");
        var queryURLrating = "https://www.omdbapi.com/?t=" + dataRatings + "&apikey=40e9cece";

        $.ajax({ //ajax call to grab rating / information
            url: queryURLrating,
            method: "GET"
        }).done(function(response) {
            //clears existing divs
            $("#modalBodyDiv").empty();
            $("#modalBodyRatings").empty();
            //creates information about movie
            var information = $('<h5>').html(response.Genre + '<br><br>' +
                response.Plot + '<hr>' +
                'Director: ' + response.Director + '<br>' +
                'Cast: ' + response.Actors);

            $("#modalBodyDiv").append(information);

            var imdbLogo = "<img src='./assets/media/imdb_200.png'>",
                rottenLogo = "<img src='./assets/media/rottenTomatoes_200.png'>",
                metaLogo =   "<img src='./assets/media/Metacritic.png'>";
                console.log(response.Ratings);
            if (response.Ratings === undefined) {
                var noRatings = $('<h5 class="noRatings">').html("No ratings exist for this film.");
                $("#modalBodyRatings").append(noRatings);
            };

            if (response.Ratings[0].Value != undefined) {
                //IMDB ratings
                var imdbHundred = response.Ratings[0].Value;
                var imdbNums = imdbHundred.split('/');
                var imdbRatings = parseFloat(imdbNums[0]);

                $("#modalBodyRatings").append("<li class='logo imdb'> " + imdbLogo + " " + imdbHundred + "</li>");

            }
            if (response.Ratings[1].Value != undefined) {
                //Rotten Tomatoes Ratings
                var rottenPercent = response.Ratings[1].Value;
                var rottenRatings = (parseFloat(response.Ratings[1].Value) / 10);
                $("#modalBodyRatings").append("<li class='logo rotten-tomatoes'> " + rottenLogo + " " + rottenPercent + "</li>");

            }
            if (response.Ratings[2].Value != undefined) {
                //Metacritic Ratings
                var metaHundred = (response.Ratings[2].Value);
                var metaNums = metaHundred.split('/');
                var metaRatings = parseFloat(metaNums[0] / 10);
                $("#modalBodyRatings").append("<li class='logo metacritic'> " + metaLogo + " " + metaHundred + "</li>");

            }

            //Reel Ratings
            var reelRatingAdd = (imdbRatings + rottenRatings + metaRatings);
            var reelRating = Math.round(((reelRatingAdd / 3) * 10 / 10));
            console.log(metaRatings);
            $('.reel-rating').empty();
            $('.reel-rating').html("Reel Rating: " + reelRating + " / 10</h2>");
    });
    });
});