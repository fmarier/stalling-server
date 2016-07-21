// Stalling server
// https://bugzilla.mozilla.org/show_bug.cgi?id=1165816
//
// To use:
//
// 1. start the server using `node ./index.js`
// 2. set `browser.safebrowsing.downloads.remote.url` to `http://localhost:8000`
// 3. go to <http://testsafebrowsing.appspot.com/> and download the second binary under "Download Warnings"

const http = require('http');

var server = http.createServer(
  function (request, response) {
    var data = '';

    request.on('data', function (chunk) {
      data += chunk;
    });
    request.on('end', function () {
      console.log(request.method + ' ' + request.url);
      console.log(request.headers);
      console.log(data);
      // just stall, don't return
    });
  }
);

const PORT = 8000;
server.listen(PORT);
console.log('Listening at http://localhost:' + PORT);
