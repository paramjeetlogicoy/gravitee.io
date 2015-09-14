var express = require('express');
var nodemailer = require("nodemailer");

var app = express();

/*
 Here we are configuring our SMTP Server details.
 STMP is mail server which is responsible for sending and recieving email.
 */
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "nfourre.atecna@gmail.com",
        pass: "Atecna649!"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/', function(req, res) {
    res.sendfile('mailer/index.html');
    console.log("test ok");
});

app.get('/send',function(req,res){

    console.log(req);

    var mailOptions={
        from : req.query.from,
        name : req.query.name,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});


app.listen(process.env.PORT || 3000 ,function(){
    console.log("Express Started on Port 3000");
});