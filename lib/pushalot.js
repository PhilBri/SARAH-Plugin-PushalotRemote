var querystring = require('querystring');
var https = require('https');

function send(options, callback) {
  var params = querystring.stringify(options);

  var post_options = {
    host: 'pushalot.com',
    port: 443,
    path: '/api/sendmessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': params.length
    }
  }; 

  var post_req = https.request(post_options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      chunk = JSON.parse(chunk);
      if(res.status == 200) {
        if (callback && typeof callback === "function") callback(chunk);
      } else {
        if (callback && typeof callback === "function") callback(null, chunk);
      }
    });

    res.on('close', function (err) {
      callback(err);
    });
  });

  post_req.write(params);
  post_req.end();
}

exports.send = send;