widget = {
  onData: function (el, data) {

    $('h2', el).text('Commute');

    // _.each(data.departures, function(o,i){
    // 	var depart = (i == 0) ? 'now' : i;
    // 	$('.content', el).append(`<div>${depart}, ${o.in_traffic}, ${o.percent_traffic}</div>`);
    // })

    var duration = [];
    var traffic  = [];

    console.log(data.departures,data.departures_array);

    // Rickshaw data needs to be populated with x values being in order
    // so traffic.config departures should be in order asc
    _.each(data.departures_array, function(departure, i){
    	
    	duration.push({ x: i, y: data.departures[departure].duration_sec });

    	// sometimes duration_in_traffic is < duration (without traffic)
    	var t = data.departures[departure].duration_in_traffic_sec - data.departures[departure].duration_sec;
    	var y = (t < 1) ? 0 : t;
    	traffic.push({ x: i, y: t });
    })

    // don't create multiple graphs
    if ($(".chart", el).hasClass('rickshaw_graph')) $(".chart", el).empty();
    
    var graph;
	var graph = new Rickshaw.Graph( {
		element: $('.chart', el)[0],
		// width: 235,
		// height: 85,
		renderer: 'bar',
		series: [ 
			{
				data: duration,
				color: '#4682b4'
			}, {
				data: traffic,
				color: '#9cc1e0'
		}]
	})
	var x_ticks = new Rickshaw.Graph.Axis.X({
		graph: graph,
		orientation: 'bottom',
		element: $('.x_axis', el)[0]
	})
	graph.render();
  }
};