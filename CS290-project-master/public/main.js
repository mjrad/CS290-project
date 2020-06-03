var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'basic' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('', function (req, res, next) {
  res.status(200).render('partials/main);
});


app.get('*', function (req, res, next) {
  res.status(404).render('partials/404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
