const {nextISSTimesForMyLocation} = require('./iss_promised');
const { printPassTimes } = require('./iss');
/*
fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes) 
  .then((body) => console.log(body));
  */

  nextISSTimesForMyLocation()
    .then((data) => {
      printPassTimes(data);
    })
    .catch((error) => {
      console.log("It didn't work~~~~~", error.message);
    })
    

