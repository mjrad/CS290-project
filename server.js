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

//Parse for json response
app.use(express.json());

//Called whenever website is referenced without any arguments
app.get('', function (req, res, next) {
  res.status(200).render('partials/postContainer', {
    totalPost : data 
  });
});


//Called when a specific post is indexed.
app.get('/posts/:posted', function (req, res, next) {
    var posted = req.params.posted;
    console.log(data[posted]);
    if (data[posted]) {
      res.status(200).render('partials/postContainer', data[posted]);
    } else {
      res.status(404).render('partials/404');
    }
});

app.post('/addPost/:posted',function(req,res,next){
  var posted = req.params.posted;
  if(data[posted]){
    if(req.body && req.body.url && req.body.author && req.body.caption && req.body.comments){
        data[posted].push({ 
        author: req.body.author,
        url : req.body.url,
        caption: req.body.caption,
        comments : req.body.comments
      });
  res.status(200).send("Post added successfully");
}else{
  res.status(400).send("Post need author, url, caption, and comments array");
}
}else{
  next();
}
});

//called when user ask for site not in index
app.get('*', function (req, res, next) {
  res.status(404).render('partials/404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
