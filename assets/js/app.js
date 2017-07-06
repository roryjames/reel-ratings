$(document).ready(function() {

    $('#addShow').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing

        var show = $('#titleSearch').val().trim(); //takes user input from search
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=50c9867e013d532a54d305162ee29e35&query=" + show;
        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            $('#moviesHere').empty();

            var results = response.results; //ajax results into variable

            for (var i = 0; i < results.length; i++) {

                var str = results[i].title; //lower case search term, replace spaces with dashes
                str = str.replace(/\s+/g, '-').toLowerCase();

                var yearFull = results[i].release_date; //takes release date from themoviedb 
                var year = yearFull.substring(0, 4); //extracts the year
                console.log(year);

                var movieBox = $('<div>'); //creates div for poster + info
                movieBox.addClass('col-xs-6 col-lg-4 movieBox');

                var posterBox = $('<div>'); //creates div for poster
                posterBox.addClass('col-xs-12');

                var img = $('<img>');
                img.addClass('img-responsive');
                img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
                img.attr('data-name', str);
                img.attr('data-id', results[i].id);
                img.attr('data-ratings', str + "&y=" + year);
                var information = $('<h5>').html(results[i].title + " ("+ year +")");
                posterBox.append(img, information);

                movieBox.append(posterBox);

                $('#moviesHere').append(movieBox);

            }
        });
    });
});
