widget = {

  onData: function (el, data) {

    var skycons = new Skycons({"color": "white"});
    var temps = [];
    var low;
    var high;

    // Add main climacons
    $('.icon', el).each(function(i,el){
        skycons.add(el, data.weather.currently.icon)
    })

    // Populate the big summary content
    $('.temperature', el).text(Math.round(data.weather.currently.temperature) + '°');
    $('.apparentTemperature', el).text('Feels like ' + Math.round(data.weather.currently.apparentTemperature));
    $('.summary', el).text(data.weather.hourly.summary);
    
    // Ricksahw
    _.each(data.weather.hourly.data, function (hour, i) {
        temps.push({x:hour.time, y:hour.temperature})
    })
    if ($(".chart", el).hasClass('rickshaw_graph')){
        $(".chart", el).empty();
    }
    var graph = new Rickshaw.Graph({
        renderer: 'area',
        element: $('.chart', el)[0],
        height: 50,
        stroke: true,
        series: [{
            color: '#9bc0e1',
            stroke: '#4381b6',
            data: temps
        }]
    });
    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        tickFormat: function(t){
            return moment.unix(t).format('h:mma');
        }
    })
    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
        formatter: function(series, x, y) {
            return moment.unix(x).format('h:mma') + ' - ' + y + '°F';
        }
    })
    graph.render();
    xAxis.render();

    // Inject temp/icons for each day
    _.each(_.first(data.weather.daily.data, 7), function (day, i){
        // Don't show today but grab the high and low. Also empty the rows first 
        // so we don't append to infinity and eventually crash the browser
        if (i == 0) {
            $('.high', el).text(Math.round(day.temperatureMax) + '↑');
            $('.low', el).text(Math.round(day.temperatureMin) + '↓');
            $('table.daily tr.temps', el).empty();
            $('table.daily tr.icons', el).empty();
            $('table.daily tr.time', el).empty();
        } else {
            $('table.daily tr.temps', el).append(`<td><span class="max">${Math.round(day.temperatureMax)}</span><span class="min">${Math.round(day.temperatureMin)}</span></td>`);
            $('table.daily tr.icons', el).append(`<td><canvas class="${day.icon}" width="62" height="62"></canvas></td>`);
            $('table.daily tr.time', el).append(`<td>${moment.unix(day.time).format('ddd')}</td>`);
        }
    })

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