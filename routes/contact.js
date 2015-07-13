var express = require('express');
var nodemailer = require('nodemailer');

var router = express.Router();


/* GET contact.jade through its own root directory the page. */
router.get('/', function (req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// sends the message from the contact/ path
router.post('/send', function (req, res, next) {
  // creating a new nodemailer transporter variable
  var transporter = nodemailer.createTransport({
    // I will use the Google's Gmail service
    service: 'Gmail',
    // setting up a bad authentication with Google
    // This is a horrible idea I'm going to learn about Oauth 2.0 right after I push this up
    auth: {
      user: 'marcus@gmail.com',
      pass: '*****'
    }
  });

  // setting op the email outline messege for the reader
  var mailOptions = {
      from: 'Bruce Wayne <darknight@gotham.com>',
      to: 'marcus@gmail.com',
      subject: 'New Website Message',
      // here is the text version
      text: 'You have recieved a new message from your website... Name: '+req.body.name +'Email: '+req.body.email +'Message: '+req.body.message,
      // here is the html version
      html: '<p>You have recieved a new message from your website...</p><ul><li>Name: <b>'+req.body.name+'</b></li><li>Email: <b>'+req.body.email+'</b></li><li>Message: <b>'+req.body.message+'</b></li></ul>'
  };

  // goes through the process of checking for any errors then sends the message
  transporter.sendMail(mailOptions, function(error, info){
      // on error you will recieve a console error log be redirected back to the root page /index
      if(error){
          console.log(error);
          res.redirect('/');
      }else{
        // else it will console log the confirmation message and redirect you back to the root index page
          console.log('Message sent: ' + info.response);
          res.redirect('/');
      }
  });
});

module.exports = router;
