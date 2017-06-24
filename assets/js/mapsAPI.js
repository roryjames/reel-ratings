var config = {
    apiKey: "AIzaSyDXSdlt9NCjyCnqeY6P-jsewhDShDo1MKA",
    baseURL: "https://maps.googleapis.com/maps/api/js?key="
  };

var lati, longi;

<script src= config.baseUrl + config.apiKey  + "&callback=initMap" async defer>

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lati, lng: longi},
    zoom: 8
  });
}