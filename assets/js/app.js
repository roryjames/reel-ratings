$(document).ready(function() {

    $('#addShow').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing

        var show = $('#titleSearch').val().trim(); //takes user input from search
        var queryURL = "https://api.themoviedb.org/3/search/multi?api_key=50c9867e013d532a54d305162ee29e35&page=1&query=" + show;
        //    var queryURL =  "https://api.themoviedb.org/3/search/multi?api_key=50c9867e013d532a54d305162ee29e35&query=" + show;
        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            $('#moviesHere').empty();

            var results = response.results; //ajax results into variable
            console.log(results);

            for (var i = 0; i < response.results.length; i++) {
                console.log(response.results[i].media_type);
            if (response.results[i].media_type === 'person'){
                for (var i = 0; i < results.length; i++) {
                    
                }
            }
            else{
            for (var j = 0; j < results.length; j++) {
                if (results[j].name === undefined){ //api returns 'name' for TV shows, not 'title'

                    var str = results[j].title;
                    str = str.replace(/\s+/g, '-').toLowerCase();

                    var yearFull = results[j].release_date; //takes release date from themoviedb 
                    var year = yearFull.substring(0, 4); //extracts the year

                    var movieBox = $('<div>'); //creates div for poster + info
                    movieBox.addClass('col-xs-6 col-lg-4 movieBox');

                    var posterBox = $('<div>'); //creates div for poster
                    posterBox.addClass('col-xs-12 posterBox'); 


                    var img = $('<img>');
                    img.addClass('img-responsive');
                    if (results[j].poster_path == null){
                        img.attr('src', 'assets/media/image_not_found.png');
                    }
                    else{
                        img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[j].poster_path);
                    }
                    img.attr('data-name', str);
                    img.attr('data-id', results[j].id);
                    img.attr('data-ratings', str + "&y=" + year);
                    var information = $('<h4>').html(results[j].title + " ("+ year +")");
                    posterBox.append(img, information);

                    movieBox.append(posterBox);

                    $('#moviesHere').append(movieBox);

                }
                else {
                    var str = results[j].name;
                    str = str.replace(/\s+/g, '-').toLowerCase();

                    if (results[j].first_air_date === ""){
                        var year = "N/A";
                    }
                    else{
                        var yearFull = results[j].first_air_date; //takes release date from themoviedb 
                        var year = yearFull.substring(0, 4); //extracts the year
                    }
                    var movieBox = $('<div>'); //creates div for poster + info
                    movieBox.addClass('col-xs-6 col-lg-4 movieBox');

                    var posterBox = $('<div>'); //creates div for poster
                    posterBox.addClass('col-xs-12 posterBox');

                    var img = $('<img>');
                    img.addClass('img-responsive');

                    if (results[j].poster_path == null){
                        img.attr('src', 'assets/media/image_not_found.png');
                    }
                    else{
                        img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[j].poster_path);
                    }

                    img.attr('data-name', str);
                    img.attr('data-id', results[j].id);
                    img.attr('data-ratings', str + "&y=" + year);
                    var information = $('<h4>').html(results[j].name + " ("+ year +")");
                    posterBox.append(img, information);

                    movieBox.append(posterBox);

                    $('#moviesHere').append(movieBox);
                }
            };
        }
    };
        });
    });
});
