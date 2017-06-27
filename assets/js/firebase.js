//Project 1 - G.C. Lou
  //initialize Firebase - this db is real
  var config = {
    apiKey: "AIzaSyDT9VT0DSCR0F2pwAAiCzFsafznTKzjYWk",
    authDomain: "projectone-da84b.firebaseapp.com",
    databaseURL: "https://projectone-da84b.firebaseio.com",
    projectId: "projectone-da84b",
    storageBucket: "projectone-da84b.appspot.com",
    messagingSenderId: "707920343339"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
// var database = ...
var database = firebase.database();
console.log();

//click event
$("#input").on("click", function(event) {
      //prevents page from refreshing when a user hits "enter"
      event.preventDefault();
      //get input - have not doen validation
      var name = $("#name").val().trim();
      var city = $("#city").val().trim();
      //can use dropped down list to capture State to avoid typo, then no need validation
      var state = $("#state").val().trim(); 
      var comments = $("#comments").val().trim();
      var rating = $("input[name=rating]:checked").val();
     
    //add to firebase database WHEN READY TO TEST DISPLAY
    // database.ref().push({
    // NAME:name, CITY:city, STATE:state, COMMENTS:comments, RATING:rating
// })

	//values are captured
    console.log(name + " " + city + " " + state + " " + comments
      + " " + rating);
    // window.location.reload();
})

//list values under each property after push to firebase
database.ref().on("child_added", function(childSnapshot) {
    //log snapshot values
    console.log(childSnapshot.val().NAME);
    console.log(childSnapshot.val().CITY);
    console.log(childSnapshot.val().STATE);
    console.log(childSnapshot.val().COMMENTS);
    console.log(childSnapshot.val().RATING);

    //display in HTML
    $("#name-display").append("<p>" + childSnapshot.val().TRAIN + "</p>");
    $("#city-display").append("<p>" + childSnapshot.val().CITY + "</p>");
    $("#state-display").append("<p>" + childSnapshot.val().STATE + "</p>");
    $("#comments-display").append("<p>" + childSnapshot.val().COMMENTS + "</p>");
    $("#rating").append("<p>" + childSnapshot.val().RATING + "</p>");

    //handle errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

//these lines show modals - need to create 2 more if keeping ABOUT US and CONTACT US
//get the modal
var modal = document.getElementById('feedback');

//get the <span> element to close modal
var span = document.getElementsByClassName("close")[0];

//click on <span> (x) to close modal (not working!) - pls test
span.onclick = function() {
    modal.style.display = "none";
}
//click anywhere outside modal to close modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//these can be used to hide and show multiple modals
//show element with css
function show(id){
      document.getElementById(id).style.display = 'block';
  }
//hide element with css
function hide(id){
      document.getElementById(id).style.display = 'none';
  }