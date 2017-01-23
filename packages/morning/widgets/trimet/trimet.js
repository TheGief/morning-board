widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

	var next_arrival = moment(data.myroute[0].scheduled).format('h:mma'); 
	var next_arrival_rel = moment(data.myroute[0].scheduled).fromNow();

	$('h2', el).text('Trimet Arrivals');
	$('.route', el).text(data.myroute[0].route);
	$('.next_arrival', el).text(next_arrival);
	$('.next_arrival_rel', el).text(`(${next_arrival_rel})`);
  }
};
