var scrape = require('scrape');
var markdown = require('html-md');
var personify = require('extend');
var message = { mrkdwn: true };
var persona = {
  as_user: false,
  username: 'Dictionary',
  icon_emoji: ':book:'
};
personify(message, persona);

var api = 'http://services.aonaware.com/DictService/Default.aspx?action=define&dict=wn&query=';

module.exports = function(ferd) {

  ferd.listen(/ferd define (\w+)/i, function (response) {

    var query = response.match[1],
        url = api + query;

    scrape.request(url, function(err, $) {
      if (err) return console.error(err);
      $('pre').each(function(el) {
        message.text = markdown(el.innerHTML);
        message.text = message.text.replace(/, */i, ', ');
        response.postMessage(message);
      });
    });
    
  });

};
