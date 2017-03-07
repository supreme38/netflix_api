const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const app = express();

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('client'));

app.post('/', (req, res) => {

	var title = req.body.title;
	var title = title.split(' ').join('%') + ('%');

	let options1 = {
		uri: 'http://netflixroulette.net/api/api.php?',
		qs: {
			title: title
		},
		json: true
	};

	let options2 = {
		uri: 'http://www.omdbapi.com/?',
		qs: {
			t: title,
			r: 'json'
		},
		json: true
	}

	var info = {};

	rp(options1)
		.then((results) => {
			info['query1'] = results;
		})
		.then(() => {
			rp(options2)
			.then((results) => {
				info['query2'] = results;
			})
			.then(() => {
				res.send(info)
			})
		})
		.catch((err) => {
			res.send(err)
		});
});

app.listen(app.get('port'), () => {
	console.log('Listening on port', app.get('port'))
});
