widget = {
  onData: function (el, data) {

    $('h2', el).text('Commute Traffic');
    $('table.traffic', el).empty();

    _.each(data.departures, function(o,i){

        var depart = (i == 0) ? 'Now' : i;
        
        $('table.traffic', el).append(`<tr class="depart_${depart}">
                                           <td class="depart">${depart}</td>
                                           <td class="duration">${o.duration_in_traffic_text}</td>
                                       </tr>
        `);
    })

  }
};