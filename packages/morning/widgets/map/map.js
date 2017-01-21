widget = {
  onData: function (el, data) {
    $('.content iframe', el).attr('src', data.url);
  }
};