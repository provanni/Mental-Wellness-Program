var map;
var rArray = new Array();
var newResource;



function initMap() {

  $.getJSON("dataFiles/data.json", function (data) {
    start = data.Resource;

    //fetching resources from JSON file
    for (let x = 0; x < start.length; x++) {
      newResource = new Resource(
        start[x].name, //data.Resource[x].name
        start[x].address, //data.Resource[x].address
        start[x].phone, //data.Resource[x].phone
        start[x].website, //data.Resource[x].website
        start[x].cost, //data.Resource[x].cost
        start[x].lat, //data.Resource[x].lat
        start[x].lng, //data.Resource[x].lng
        start[x].filter, //data.Resource[x].filter
        start[x].details //data.Resource[x].details
      );

      //push resource to resource array
      rArray.push(newResource);

    }

    // map options
    var options = {
      center: { lat: 43.648640, lng: -79.397209 },
      zoom: 16,
      disableDefaultUI: true,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },
        // {
        //   featureType: 'poi.park',
        //   elementType: 'geometry',
        //   stylers: [{color: '#263c3f'}]
        // },
        // {
        //   featureType: 'poi.park',
        //   elementType: 'labels.text.fill',
        //   stylers: [{color: '#6b9a76'}]
        // },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    }




    // new map
    map = new google.maps.Map(document.getElementById('map'), options);

    $(document).ready(function () {
      // console.log("in doc ready");


      for (let i = 0; i < rArray.length; i++) {
        

        //creating variables for the latitude and longitude
        var lat = rArray[i].lat;
        var lng = rArray[i].lng;
        var name = rArray[i].name
        var address = rArray[i].address
        var phone = rArray[i].phone
        var website = rArray[i].website
        var cost = rArray[i].cost
        var details = rArray[i].details


        addMarker(lat, lng, name, address, phone, website, cost, details)


        console.log(i);
        console.log(rArray.length);
      };

    }); // end of .getJSON




  })
};

function addMarker(lat, lng, name, address, phone, website, cost, details) {

  //create marker
  var marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map
  })

  //create markerInfo
  var markerInfo = new google.maps.InfoWindow({
    content:

      `  
      Name: ${name} <br>
      Address: ${address} <br>
      Phone: ${phone} <br>
      Website: ${website} <br>
      Cost: ${cost} <br>
      Details: ${details}<br>
    `
  })

  marker.addListener('click', function () {

    markerInfo.open(map, marker);

  })

}




// // Try HTML5 geolocation.
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };

//     infoWindow.setPosition(pos);
//     infoWindow.setContent('Location found.');
//     infoWindow.open(map);
//     map.setCenter(pos);
//   }, function() {
//     handleLocationError(true, infoWindow, map.getCenter());
//   });
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, infoWindow, map.getCenter());
// }
