var ical = require('ical');
var moment = require('moment');

module.exports = {
  onInit: function (config, dependencies) {

  },
  onRun: function (config, dependencies, jobCallback) {

    var logger     = dependencies.logger;
    var _          = dependencies.underscore;
    var maxEntries = config.maxEntries || 10;

    return jobCallback(null, {title: 'Stopped'});

    ical.fromURL(config.calendarUrl, {}, function (err, data) {

      if (err) return jobCallback(err);

      var events = _.sortBy(data, function (event) {
        return event.start;
      });
      console.warn('sorted events:',events.length);
      events = _.filter(events, function (event) {
        // logger.warn(event.start, event.end, event.summary);
        // logger.warn(event.start, ' - > -', new Date(), event.end, ' - < - ', moment().add(3, 'd'));
        return event.start > new Date() && event.end < moment().add(3, 'd');
      });
      console.warn('filtered events:',events.length);
      _.each(events,function (event) {
        logger.warn(event.start, event.end, event.summary);
      })

      var result = [];
      _.first(events, maxEntries).forEach(function (event) {
          logger.warn(event.summary, event.start, event.end);
          result.push({startDate: moment(event.start).format('HH:mma'), endDate: moment(event.end).format('HH:mma'), summary: event.summary});
      });

      jobCallback(err, {events: result});
    });
  }
};
