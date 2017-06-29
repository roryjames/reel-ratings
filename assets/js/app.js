    $(document).ready(function() {
    $('#addShow').on("click", function(e) { //event handler for submit button
        event.preventDefault(); //prevents refreshing
        var validate = Validate();
        $('#moviesHere').html(validate);
        if (validate.length === 0) {
            CallAPI(1);
        }
    });

    function CallAPI(page) {
        var show = $('#titleSearch').val().trim(); //takes user input from search
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=50c9867e013d532a54d305162ee29e35&query=" + show;
        $.ajax({ //AJAX call for specific show being clicked
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.results);

            var str = show; //lower case search term, replace spaces with dashes
            str = str.replace(/\s+/g, '-').toLowerCase();
            console.log(str);

            $('#moviesHere').empty();

            var pages = response.total_pages;
            var results = response.results;
            
            for (var i = 0; i < results.length; i++) {
                var movieBox = $('<div>');
                movieBox.addClass('col-xs-12 col-md-6 movieBox');
                movieBox.attr('data-name', results[i].title)

                var posterBox = $('<div>');
                posterBox.addClass('col-xs-12 col-md-4');

                var img = $('<img>');
                img.addClass('img-responsive');
                img.attr("src", "http://image.tmdb.org/t/p/w185//" + results[i].poster_path);
                posterBox.append(img);

                var infoBox = $('<div>');
                infoBox.addClass('col-xs-12 col-md-8');

                var information = $('<h5>').html("<tr> <td>" + results[i].title + " </td></tr> " + "<tr><td>" + results[i].overview + " </td></tr> ");
                infoBox.append(information);

                // var reviewBox = $('<div>');
                // reviewBox.addClass('col-xs-12 col-md-3');

                // var reviews = $('<h5>').html("The Movie DB - " + results[i].vote_average);
                // reviewBox.append(reviews);

                movieBox.append(posterBox, infoBox);

                $('#moviesHere').append(movieBox);

            }
                Paging(pages);
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#titleSearch").val() === "") {
            errorMessage += "► Enter Search Text";
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
