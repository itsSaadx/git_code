console.log("location file loaded");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      success,
      error
    );
  } else {
    console.log("Geolocation is not supported");
  }
}

function success(position) {
  console.log("Location:", position);
  console.log("Latitude:", position.coords.latitude);
  console.log("Longitude:", position.coords.longitude);
}

function error(err) {
  console.log("Location error:", err.message);
}

getLocation();