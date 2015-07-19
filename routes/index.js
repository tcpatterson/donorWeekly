var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var client = require('twilio')('AC8270ef2de6951482a3639117d48ac307', '6c956d6237f5400f27b47f8d7a5672d9');
var rest = require('restler');

var connection = mysql.createConnection({
	host     : '192.232.251.27',
	user     : 'thomas23_donorwe',
	password : 'thomas23',
	database : 'thomas23_donorweekly'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('test', { title: 'Express' });
});

router.post('/submit', function(req, res, next) {
	var keyword = 'keywords=' + req.body.keyword;
	var state = 'state=' + req.body.state;
	var subject = req.body.subject;
	var resource = req.body.resource;
	var grade = req.body.grade;
	var phone = req.body.phone;

	var query = keyword + '&' + state + '&' + subject + '&' + resource + '&' + grade;

	console.log(query);
	connection.connect();
	var sql = 'INSERT INTO texts VALUES (NULL, ' + phone + ', \'' + query + '\')';
	connection.query(sql, function(err, rows, fields) {
		if (err) throw err;
		var jsonData = { parsers: 'parsers.json' };
		rest.get('http://api.donorschoose.org/common/json_feed.html?' + query + '', jsonData).on('complete', function(data) {
			var projects = JSON.parse(data).proposals;
			var project1 = projects[0].fulfillmentTrailer + '  $' + projects[0].costToComplete + ' remaining';
			var project2 = projects[1].fulfillmentTrailer + '  $' + projects[1].costToComplete + ' remaining';
			var project3 = projects[2].fulfillmentTrailer + '  $' + projects[2].costToComplete + ' remaining';

			client.sendMessage({

			    to:'+1' + phone + '', // Any number Twilio can deliver to
			    from: '+16504899700', // A number you bought from Twilio and can use for outbound communication
			    body: '' + project1 + ''// body of the SMS message

			}, function(err, responseData) { //this function is executed when a response is received from Twilio

			    if (!err) { // "err" is an error received during the request, if any

			        // "responseData" is a JavaScript object containing data received from Twilio.
			        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
			        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			        console.log(responseData.from); // outputs "+14506667788"
			        console.log(responseData.body); // outputs "word to your mother."

			    }
			});

			client.sendMessage({

			    to:'+1' + phone + '', // Any number Twilio can deliver to
			    from: '+16504899700', // A number you bought from Twilio and can use for outbound communication
			    body: '' + project2 + ''// body of the SMS message

			}, function(err, responseData) { //this function is executed when a response is received from Twilio

			    if (!err) { // "err" is an error received during the request, if any

			        // "responseData" is a JavaScript object containing data received from Twilio.
			        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
			        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			        console.log(responseData.from); // outputs "+14506667788"
			        console.log(responseData.body); // outputs "word to your mother."

			    }
			});

			client.sendMessage({

			    to:'+1' + phone + '', // Any number Twilio can deliver to
			    from: '+16504899700', // A number you bought from Twilio and can use for outbound communication
			    body: '' + project3 + ''// body of the SMS message

			}, function(err, responseData) { //this function is executed when a response is received from Twilio

			    if (!err) { // "err" is an error received during the request, if any

			        // "responseData" is a JavaScript object containing data received from Twilio.
			        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
			        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

			        console.log(responseData.from); // outputs "+14506667788"
			        console.log(responseData.body); // outputs "word to your mother."

			    }
			});
			});

		
	});



  	connection.end();
  
  	res.render('test', { title: 'submitted' });
});

module.exports = router;
