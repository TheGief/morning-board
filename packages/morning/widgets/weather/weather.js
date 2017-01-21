widget = {

  onData: function (el, data) {

    var skycons = new Skycons({"color": "white"});
    
    var temps = _.sortBy(data.weather.hourly.data, function(el) {return el.temperature});
    var low   = 999;
    var high  = 0;

    // Add main climacons
    $('.icon', el).each(function(i,el){
        skycons.add(el, data.weather.currently.icon)
    })

    // Populate the big summary content
    $('.temperature', el).text(data.weather.currently.temperature);
    $('.apparentTemperature', el).text('Feels like ' + data.weather.currently.apparentTemperature);
    $('.summary', el).text(data.weather.hourly.summary);
    
    // Inject temp/icons for all hours
    _.each(data.weather.hourly.data, function (hour){
        if (hour.temperature < low) low = hour.temperature;
        if (hour.temperature > high) high = hour.temperature;
    	$('table.hourly tr.temps', el).append(`<td>${Math.round(hour.temperature)}</td>`);
        $('table.hourly tr.icons', el).append(`<td><canvas class="${hour.icon}" width="36" height="36"></canvas></td>`);
        $('table.hourly tr.time', el).append(`<td>${moment.unix(hour.time).format('ha')}</td>`);
    })

    $('.high', el).text(Math.round(high) + '↑');
    $('.low', el).text(Math.round(low) + '↓');

    // Add hourly climacons
    $('table.hourly tr.icons', el).find('canvas').each(function(i,el){
    	skycons.add(el, $(el).attr('class'))
    })

    // Footer
    $('.footer', el).text(`${data.location}`);
  }
};