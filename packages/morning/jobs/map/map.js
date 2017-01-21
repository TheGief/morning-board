/**
 * Job: iframe
 *
 * Expected configuration:
 *  "map" : {
 *    "interval" : 300000,
 *    "auth" : "google",
 *    "origin" : "29400 SW Town Center Loop West, Wilsonville, OR 97070",
 *    "destination" : "111 SW 5th Ave, Portland, OR 97204"
 *  }
 */

module.exports = {
  onRun: function (config, dependencies, jobCallback) {

  	var logger = dependencies.logger;
    var mapUrl = "https://www.google.com/maps/embed/v1/directions?key=" + config.globalAuth[config.auth].api_key + 
                 "&origin=" + config.origin + 
                 "&destination=" + config.destination;

    jobCallback(null, {url: mapUrl});
  }
};
