    $(document).ready(function() {
    $('#title-input').on("click", function(e) { //event handler for submit button
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

            $('#moviesHere').empty();

            var pages = response.total_pages;
            var results = response.results;
            
            for (var i = 0; i < results.length; i++) {

                var str = results[i].title; //lower case search term, replace spaces with dashes
                str = str.replace(/\s+/g, '-').toLowerCase();

                var movieBox = $('<div>');
                movieBox.addClass('col-xs-12 col-md-6');
                movieBox.attr('data-name',str)

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

                var yearBox = $("<div>");
                yearBox.addClass('col-xs-12 col-md-4');
                var yr = $("<p>").html(results[i].release_date + "</p>");
                yearBox.append(yr);

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
        if ($("#titleSearch").val() === "") {
            errorMessage += "► Enter Search Text";
        }
        return errorMessage;
    }


    // $(function() {
    //     var obj = $('#pagination').twbsPagination({
    //         totalPages: 35,
    //         visiblePages: 10,
    //         onPageClick: function (event, page) {
    //              // CallAPI(page);
    //             console.info(page);
    //         }
    //     });
    //     console.info(obj.data());
    // });



//     function Paging(totalPage) {
//         var obj = $("#pagination").twbsPagination({
//             totalPages: totalPage,
//             visiblePages: 10,
//             onPageClick: function(event, page) {
//                 CallAPI(page);
//             }
//         });
//     }
});
