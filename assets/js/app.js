$(document).ready(function () {

    //-------------------START PAGE-----------------------
    const apiKey = '50c9867e013d532a54d305162ee29e35';
    const startUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    $.ajax({ //AJAX call for specific movie/show being clicked
        url: startUrl,
        method: "GET"
    }).done(function (startResponse) {

        $('#moviesHere').empty();

        let results = startResponse.results; //ajax results into variable
        for (let i = 0; i < results.length; i++) {

            if (results[i].name === undefined) { //api returns 'name' for TV shows, 'title' for movie

                let str = results[i].title;
                str = str.replace(/\s+/g, '-').toLowerCase();

                let yearFull = results[i].release_date; //takes release date from themoviedb 
                let year = yearFull.substring(0, 4); //extracts the year

                let mediaType = results[i].media_type;

                let movieBox = $('<div>'); //creates div for poster + info
                movieBox.addClass('col-xs-6 col-sm-3 movieBox');

                let posterBox = $('<div>'); //creates div for poster
                posterBox.addClass('thumbnail');

                let imgWrapper = $('<div>'); //creates div for poster
                imgWrapper.addClass('img-wrapper');

                let img = $('<img>');
                img.addClass('img-responsive');
                if (results[i].poster_path == null) {
                    img.attr('src', 'assets/media/image_not_found.png');
                } else {
                    img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
                }
                img.attr('data-media', mediaType);
                img.attr('data-name', str);
                img.attr('data-id', results[i].id);
                img.attr('data-ratings', str + "&y=" + year);

                img.attr('title', results[i].title + " (" + year + ")");

                imgWrapper.append(img);
                posterBox.append(imgWrapper);

                movieBox.append(posterBox);

                $('#moviesHere').append(movieBox);

            } else {
                let str = results[i].name;
                str = str.replace(/\s+/g, '-').toLowerCase();

                let mediaType = results[i].media_type;

                if (results[i].first_air_date === "") {
                    let year = "N/A";
                } else {
                    let yearFull = results[i].first_air_date; //takes release date from themoviedb 
                    let year = yearFull.substring(0, 4); //extracts the year
                }
                let movieBox = $('<div>'); //creates div for poster + info
                movieBox.addClass('col-xs-6 col-sm-3 movieBox');

                let posterBox = $('<div>'); //creates div for poster
                posterBox.addClass('thumbnail');

                let imgWrapper = $('<div>'); //creates div for poster
                imgWrapper.addClass('img-wrapper');


                let img = $('<img>');
                img.addClass('img-responsive');

                if (results[i].poster_path == null) {
                    img.attr('src', 'assets/media/image_not_found.png');
                } else {
                    img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
                }

                img.attr('data-name', str);
                img.attr('data-id', results[i].id);
                img.attr('data-media', mediaType);
                img.attr('data-ratings', str + "&y=" + year);
                img.attr('title', results[i].name + " (" + year + ")");

                imgWrapper.append(img);
                posterBox.append(imgWrapper);
                movieBox.append(posterBox);

                $('#moviesHere').append(movieBox);
            }
        }
    });

    //---------------------------------end startpage

    $('#addShow').on("click", function (e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing
        let show = $('#titleSearch').val().trim(); //takes user input from search

        if (show == "") {
            $('span.errorMessage').show();
        } else {
            $('span.errorMessage').hide();

            let queryURL = "https://api.themoviedb.org/3/search/multi?api_key=50c9867e013d532a54d305162ee29e35&page=1&query=" + show;
            $.ajax({ //AJAX call for specific show being clicked
                url: queryURL,
                method: "GET"
            }).done(function (response) {
                console.log(response.results);

                $('#moviesHere').empty();

                let results = response.results; //ajax results into variable
                console.log(results);

                for (let i = 0; i < results.length; i++) {

                    if (results[i].name === undefined) { //api returns 'name' for TV shows, not 'title'

                        let str = results[i].title;
                        str = str.replace(/\s+/g, '-').toLowerCase();

                        let yearFull = results[i].release_date; //takes release date from themoviedb 
                        let year = yearFull.substring(0, 4); //extracts the year

                        let mediaType = results[i].media_type;

                        let movieBox = $('<div>'); //creates div for poster + info
                        movieBox.addClass('col-xs-6 col-sm-3 movieBox');

                        let posterBox = $('<div>'); //creates div for poster
                        posterBox.addClass('thumbnail');

                        let imgWrapper = $('<div>'); //creates div for poster
                        imgWrapper.addClass('img-wrapper');

                        let img = $('<img>');
                        img.addClass('img-responsive');
                        if (results[i].poster_path == null) {
                            img.attr('src', 'assets/media/image_not_found.png');
                        } else {
                            img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
                        }
                        img.attr('data-media', mediaType);
                        img.attr('data-name', str);
                        img.attr('data-id', results[i].id);
                        img.attr('data-ratings', str + "&y=" + year);

                        img.attr('title', results[i].title + " (" + year + ")");

                        imgWrapper.append(img);
                        posterBox.append(imgWrapper);

                        movieBox.append(posterBox);

                        $('#moviesHere').append(movieBox);

                    } else {
                        let str = results[i].name;
                        str = str.replace(/\s+/g, '-').toLowerCase();

                        let mediaType = results[i].media_type;

                        if (results[i].first_air_date === "") {
                            let year = "N/A";
                        } else {
                            let yearFull = results[i].first_air_date; //takes release date from themoviedb 
                            let year = yearFull.substring(0, 4); //extracts the year
                        }
                        let movieBox = $('<div>'); //creates div for poster + info
                        movieBox.addClass('col-xs-6 col-sm-3 movieBox');

                        let posterBox = $('<div>'); //creates div for poster
                        posterBox.addClass('thumbnail');

                        let imgWrapper = $('<div>'); //creates div for poster
                        imgWrapper.addClass('img-wrapper');


                        let img = $('<img>');
                        img.addClass('img-responsive');

                        if (results[i].poster_path == null) {
                            img.attr('src', 'assets/media/image_not_found.png');
                        } else {
                            img.attr("src", "https://image.tmdb.org/t/p/w342//" + results[i].poster_path);
                        }

                        img.attr('data-name', str);
                        img.attr('data-id', results[i].id);
                        img.attr('data-media', mediaType);
                        img.attr('data-ratings', str + "&y=" + year);
                        img.attr('title', results[i].name + " (" + year + ")");

                        imgWrapper.append(img);
                        posterBox.append(imgWrapper);
                        movieBox.append(posterBox);

                        $('#moviesHere').append(movieBox);
                    }
                }
            });
        };
    }); //#addShow on.click

}); //document.ready