var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
const data = require('./data');

var app = express();
var port = process.env.PORT || 3000;

//Renders default layout as main.handlebars template 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//sets static domain as public
app.use(express.static('public'));

//Called whenever website is referenced without any arguments
app.get('', function (req, res, next) {
  res.status(200).render('partials/postContainer', {
    totalPost : data 
  });
});

//Called when a specific post is indexed.
app.get('/posts/:posted', function (req, res, next) {
    var posted = req.params.posted.toLowerCase();
    console.log("posted data ==" , posted[0]);
    console.log(data[posted]);
    if (data[posted]) {
      res.status(200).render('partials/postContainer', data[posted]);
    } else {
      res.status(404).render('partials/404');
    }
});

//called when user ask for site not in index
app.get('*', function (req, res, next) {
  res.status(404).render('partials/404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
