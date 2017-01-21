/**
 * Job: weather
 *
 * Expected configuration:
 * "weather" : {
 *    "interval" : 300000,
 *    "auth" :  "darksky",
 *    "latitude" : 45.432147,
 *    "longitude" : -122.846347,
 *    "location" : "111 SW 5th Ave, Portland"
 * }
 */
module.exports = {
  onInit: function (config, dependencies) {

  },
  onRun: function (config, dependencies, jobCallback) {

    var logger = dependencies.logger;

    dependencies.easyRequest.JSON('https://api.darksky.net/forecast/' + config.globalAuth[config.auth].api_key + '/' + config.latitude + ',' + config.longitude, function (err, json) {
      if (err) return jobCallback(err);
      jobCallback(err, {location: config.location, weather: json});
    });
  }
};
