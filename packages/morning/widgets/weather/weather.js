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
    $('.temperature', el).text(Math.round(data.weather.currently.temperature) + '°');
    $('.apparentTemperature', el).text('Feels like ' + Math.round(data.weather.currently.apparentTemperature));
    $('.summary', el).text(data.weather.hourly.summary);
    
    // Inject temp/icons for each day
    _.each(_.first(data.weather.daily.data, 7), function (day, i){
        // Don't show today but grab the high and low. Also empty the rows first 
        // so we don't append to infinity and eventually crash the browser
        if (i == 0) {
            low = day.temperatureMin;
            high = day.temperatureMax;
            $('table.daily tr.temps').empty();
            $('table.daily tr.icons').empty();
            $('table.daily tr.time').empty();
        } else {
            $('table.daily tr.temps', el).append(`<td><span class="max">${Math.round(day.temperatureMax)}</span><span class="min">${Math.round(day.temperatureMin)}</span></td>`);
            $('table.daily tr.icons', el).append(`<td><canvas class="${day.icon}" width="62" height="62"></canvas></td>`);
            $('table.daily tr.time', el).append(`<td>${moment.unix(day.time).format('ddd')}</td>`);
        }
    })

    $('.high', el).text(Math.round(high) + '↑');
    $('.low', el).text(Math.round(low) + '↓');

    // Add daily climacons
    $('table.daily tr.icons', el).find('canvas').each(function(i,el){
    	skycons.add(el, $(el).attr('class'))
    })

    // Footer
    $('.footer', el).text(`${data.location}`);

    // Animate that shiz
    skycons.play();
  }
};