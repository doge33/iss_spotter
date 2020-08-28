/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {

    if (error) { // => this kind of error: offline/invalid domain...
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {  //this kind of errors: non-200, could be invalid ip, server error...
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
      
    }
    //=>otherwise...we good!
    const geoCoords = {
      "latitude": JSON.parse(body).data.latitude,
      "longitude": JSON.parse(body).data.longitude,
    };
    callback(null, geoCoords);
    
  });
};


const fetchFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passTimes = JSON.parse(body).response;
    
    callback(null, passTimes);

  });
};
    
//this is the primary function that index.js can call. Each functions can be chained inside.

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);  //why return?
    }

    fetchCoordsByIP(ip, (error, coords) => {

      if (error) {
        return callback(error, null);
      }

      fetchFlyOverTimes(coords, (error, passTimes) => {

        if (error) {

          return callback(error, null);
        }

        callback(null, passTimes);


      });
    });
  
  });


};


const printPassTimes = (passTimes) => {
  passTimes.forEach((timestamp) => {
    let timeAndDate = new Date(timestamp.risetime * 1000);
    console.log(`Next ISS pass on ${timeAndDate} for ${timestamp.duration} seconds!`);
  });
};





module.exports = { nextISSTimesForMyLocation, printPassTimes};