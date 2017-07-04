    $(document).ready(function() {
    $('#genre-input').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing

        // var genre = $('#genreSearch').val().trim(); //takes user input from search
        var genre = $("#genreSearch option:selected").text();
        console.log(genre);
                //from themoviedb - to convert genre name to genre id
                var genreArray =
                        [{"id": 28,"name": "Action"},
                        {"id": 12,"name": "Adventure"},
                        {"id": 16,"name": "Animation"},
                        {"id": 35,"name": "Comedy"},
                        {"id": 80,"name": "Crime"},
                        {"id": 99,"name": "Documentary"},
                        {"id": 18,"name": "Drama"},
                        {"id": 10751,"name": "Family"},
                        {"id": 14,"name": "Fantasy"},
                        {"id": 36,"name": "History"},
                        {"id": 27,"name": "Horror"},
                        {"id": 10402,"name": "Music"},
                        {"id": 9648,"name": "Mystery"},
                        {"id": 10749,"name": "Romance"},
                        {"id": 878,"name": "Science Fiction"},
                        {"id": 10770,"name": "TV Movie"},
                        {"id": 53,"name": "Thriller"},
                        {"id": 10752,"name": "War"},
                        {"id": 37,"name": "Western"}];

                for (var j=0; j<genreArray.length; j++){
                    if (genre === genreArray[j].name){
                        var genre_ids = genreArray[j].id;
                        // console.log(id, name);
                        console.log(genre_ids);
                    }
                    
                }

        //use converted genre ids to find movies
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=50c9867e013d532a54d305162ee29e35&query&with_genres="+genre_ids;

        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            // console.log(response.results);
            console.log(response.results);

            $('#moviesHere').empty();

            var pages = response.total_pages;
            var results = response.results;
            
            for (var i = 0; i < results.length; i++) {

                var str = results[i].genre_ids;
                
                var movieBox = $('<div>');
                movieBox.addClass('col-xs-12 col-md-6');
                movieBox.attr('data-name', str)

                var posterBox = $('<div>');
                posterBox.addClass('col-xs-12 col-md-4');

                var img = $('<img>');
                img.addClass('img-responsive');
                img.attr("src", "http://image.tmdb.org/t/p/w185//" + results[i].poster_path);
                posterBox.append(img);

                var yearBox = $("<div>");
                yearBox.addClass('col-xs-12 col-md-4');
                var y = $("<p>").html(results[i].release_date + "</p>");
                // y.text(str);
                yearBox.append(y);

                var infoBox = $('<div>');
                infoBox.addClass('col-xs-12 col-md-8');

                var information = $('<p>').html("<tr><td> " + results[i].title + " </td></tr> " + "<tr><td>" + results[i].overview + " </td></tr>");
                infoBox.append(information);

                movieBox.addClass("");
                movieBox.append(posterBox, infoBox, yearBox);

                $('#moviesHere').append(movieBox);

            }


            }).fail(function(err) {
              throw err;
            // Paging(pages);
        });
    });

});

    // function Validate() {
    //     var errorMessage = "";
    //     if ($("#genreSearch").val() === "") {
    //         errorMessage += "► Enter Search Genre";
    //     }
    //     return errorMessage;
    // }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 10,
            onPageClick: function(event, page) {
                CallAPI(page);
            }
        });
    }

