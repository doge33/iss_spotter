const {nextISSTimesForMyLocation, printPassTimes} = require('./iss');



nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log("It didn't work!~~~~~", error);
  }

  printPassTimes(passTimes);
});






/* Test codes for each function
fetchMyIP((error, ip) => {

  if (error) {
    console.log("It didn't work!~~~~~", error);
    return;
  }
  console.log("It worked! Returned IP", ip);
});


fetchCoordsByIP('72.140.14.120', (error, coords) => {

  if (error) {
    console.log("It didn't work!~~~~~", error);
  }

  console.log("It worked! Returned Coords", coords);
});

fetchFlyOverTimes({latitude: 49.43, longitude: -79.49}, (error, passTimes) => {

  if (error) {
    console.log("It didn't work!~~~~~", error);

  }
  console.log("It worked! Returned flyover times", passTimes);
});
*/
