const request = require("request-promise-native");

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = (ipString) => {
  const ip = JSON.parse(ipString).ip;
  return request(`https://ipvigilante.com/json/${ip}`);

};

const fetchISSFlyOverTimes = (geoString) => {
  const {latitude, longitude}= JSON.parse(geoString).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    
    .then((data) => {
      console.log(typeof data);
      const passTimes = JSON.parse(data).response;
      return passTimes;
    }
    );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};