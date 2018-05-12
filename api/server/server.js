'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');


var app = module.exports = loopback();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(loopback.token({ 
  model: app.models.accessToken,
  currentUserLiteral: 'me'
 }));

app.use(cookieParser('food is amazing'));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.use(function(req, res, next) {
  app.currentUser = null;
  if (!req.accessToken) return next();
  req.accessToken.user(function(err, user) {
    if (err) return next(err);
    req.currentUser = user;
    next();
  });
});




// Email endpoint 
app.post('/email', function (req, res) {
    var mailOpts, smtpConfig;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dragonboatlifecanada@gmail.com',
            pass: 'dSw@rER@23'
        }
    });
    var mailOptions = {
        from: 'dragonboatlifecanada@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: '',
        html: req.body.html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json('success');
        }
    });
});



// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
