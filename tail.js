// start with importing an http server
var http = require('http');
// import the spawn function
var spawn = require('child_process').spawn;
// create the server bound to port at bottom
http.createServer(function(request, response) {
// write the header with 200 okay with content-type
response.writeHead(200, {
'Content-Type': 'text/plain'
});
// everytime there is a new request, spawn an child process
var tail_child = spawn('tail', ['-f', '/Users/pandurang90/projects/project_travel/log/development.log']);
// kill tail_child everytime the connection ends to keep from many processes being created
request.connection.on('end', function() {
tail_child.kill();
})
// observe the output by binding to the data event

tail_child.stdout.on('data', function(data) {

// send it to the browser because the browser will be waiting for the next chunk of data
response.write(data);
});
}).listen(4000);