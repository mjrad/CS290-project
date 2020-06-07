var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var data = require('./data');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('', function (req, res, next) {
  res.status(200).render('partials/postContainer', data);
  //res.status(200).sendFile(__dirname + '/public/main.html');
});

var postedPosts = [
  '0',
  '1'
];

app.get('/posts/:posted', function (req, res, next) {
    var posted = req.params.posted.toLowerCase();
    if (postedPosts.indexOf(posted) >= 0) {
      res.status(200).render('partials/post', data[posted]);
      //res.status(200).sendFile(__dirname + '/public/main.html');
    } else {
      res.status(404).render('partials/404');
      //res.status(200).sendFile(__dirname + '/public/404.html');
    }
});

app.get('*', function (req, res, next) {
  res.status(404).render('partials/404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
