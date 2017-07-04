    $(document).ready(function() {
    $('#year-input').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing
        var validate = Validate();
        $('#moviesHere').html(validate);
        if (validate.length === 0) {
            CallAPI(1);
        }
    });

    function CallAPI(page) {
        var year = $('#yearSearch').val().trim(); //takes user input from search
        var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=50c9867e013d532a54d305162ee29e35&primary_release_year=" + year;

        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            $('#moviesHere').empty();

            var pages = response.total_pages;
            var results = response.results;
            
            for (var i = 0; i < results.length; i++) {

                var str = results[i].release_year;

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
                yearBox.append(y);

                var infoBox = $('<div>');
                infoBox.addClass('col-xs-12 col-md-8');

                var information = $('<p>').html("<tr><td> " + results[i].title + " </td></tr> " + "<tr><td>" + results[i].overview + " </td></tr>");
                infoBox.append(information);

                // var reviewBox = $('<div>');
                // reviewBox.addClass('col-xs-12 col-md-3');

                // var reviews = $('<h5>').html("The Movie DB - " + results[i].vote_average);
                // reviewBox.append(reviews);
                movieBox.addClass("");
                movieBox.append(posterBox, infoBox, yearBox);

                $('#moviesHere').append(movieBox);

            }

            }).fail(function(err) {
              throw err;
            // Paging(pages);
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#yearSearch").val() === "") {
            errorMessage += "► Enter Search Year";
        }
        return errorMessage;
    }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 10,
            onPageClick: function(event, page) {
                CallAPI(page);
            }
        });
    }
});
