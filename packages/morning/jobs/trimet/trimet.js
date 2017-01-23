/**
 * Job: trimet
 *
 * Expected configuration:
 * "trimet" : {
 *   "auth" : "trimet",
 *   "locIDs" : "3654",
 *   "route" : 94
 * }
 */

module.exports = {

  onInit: function (config, dependencies) {

  },

  onRun: function (config, dependencies, jobCallback) {

    var _      = dependencies.underscore;
    var moment = dependencies.moment;
    var logger = dependencies.logger;
    var url    = 'https://developer.trimet.org/ws/v2/arrivals?json=true&appID=' + config.globalAuth[config.auth].appID +
                  '&locIDs=' + config.locIDs +
                  '&end=' + moment().add(1,'d').format('X');

    
    dependencies.easyRequest.JSON(url, function (err, json) {

      if (err) return jobCallback(err);

      // keep only the route in conig
      myroute = _.filter(json.resultSet.arrival, function(arrival) {
        return arrival.route == config.route;
      })

      jobCallback(err, {myroute: myroute});
    });
  }
};