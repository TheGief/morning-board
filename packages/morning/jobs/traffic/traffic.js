/**
 * Job: traffic
 *
 * Expected configuration:
 *  "traffic" : {
 *    "interval" : 300000,
 *    "auth" :  "google",
 *    "travelMode" : "DRIVING",
 *    "origin" : "29400 SW Town Center Loop West, Wilsonville, OR 97070",
 *    "destination" : "111 SW 5th Ave, Portland, OR 97204",
 *    "departures" : [0,10,20,30,40,50,60,70,80,90]
 *  }
 */
var async   = require('async');
var dotProp = require('dot-prop');

module.exports = {
  onInit: function (config, dependencies) {

  },

  onRun: function (config, dependencies, jobCallback) {
    var _          = dependencies.underscore;
    var moment     = dependencies.moment;
    var logger     = dependencies.logger;
    var departures = {};

    // Calls maps API, then puts useful info in departures {}
    function getDuration(departure, callback) {

      var departure_time = moment().add(departure,'m');
      var url            = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + config.origin + 
                           '&destination=' + config.destination + 
                           '&departure_time=' + departure_time.unix() + 
                           '&mode=' + config.travelMode +
                           '&key=' + config.globalAuth[config.auth].api_key;
      logger.debug(url);
      // Get duration in traffic for each departure time
      dependencies.easyRequest.JSON(url, function (err, json) {


        if (err) return jobCallback(err);
        if (json.status != "OK") return jobCallback('Maps api call error ${json.status}, try modifying your params');

        // Dynamically create objects for each departure time and set the useful values for display
        dotProp.set(departures, `${departure}.duration_sec`,             json.routes[0].legs[0].duration.value);
        dotProp.set(departures, `${departure}.duration_in_traffic_sec`,  json.routes[0].legs[0].duration_in_traffic.value);
        dotProp.set(departures, `${departure}.duration_in_traffic_text`, json.routes[0].legs[0].duration_in_traffic.text);
        dotProp.set(departures, `${departure}.percent_traffic`,          Math.abs(Math.round(json.routes[0].legs[0].duration.value / json.routes[0].legs[0].duration_in_traffic.value * 100) - 100));
        callback();
      })
    }

    // The goods, took forever to debg the fact that Node does the JSON requests above async
    // Async loop through all the departures to build up departures {}
    async.each(config.departures, getDuration, function(err) {

      if (err) return jobCallback(err);

      // All maps calls are dont at this point
      jobCallback(null, {'departures': departures, 'departures_array': config.departures});
    });
  }
};
