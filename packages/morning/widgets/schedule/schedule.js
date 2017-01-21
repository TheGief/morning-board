widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    var $content = $('.content', el);
    $content.empty();

    if (!data.events || !data.events.length) {
      $content.append($("<div>").html("No events found."));
    } else {

      logger.info(data.events.length + ' calendar events found!');

      data.events.forEach(function (event) {
        var eventDiv = $("<div/>").addClass('leave-event');
        $(eventDiv).append($("<div/>").addClass('leave-dates').append(event.startDate + " - " + event.endDate));
        $(eventDiv).append($("<div/>").addClass('leave-summary').append(event.summary));

        $content.append(eventDiv);
      });
    }
  }
};