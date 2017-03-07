const express = require('express');
//const bodyParser = require('body-parser');
const rp = require('request-promise');
const app = express();

app.set('port', process.env.PORT || 8000);
//app.use(bodyParser.json());
app.use('/', express.static('client'));

app.post('/search', (req, res) => {
	let options = {
		uri: 'http://netflixroulette.net/api/api.php?',
		qs: {
			title: 'family%guy%'
		},
		json: true
	};

	let options2 = {
		uri: 'http://www.omdbapi.com/?',
		qs: {
			t: 'family%guy'
		},
		json: true
	}

	rp(options)
		.then((repos) => {
			console.log(repos)
		})
		.then(rp(options2)
			.then((repos) => {
				res.json(repos)
			})
		)
		.catch((err) => {
			console.log(err)
		});
});

app.listen(app.get('port'), () => {
	console.log('Listening on port', app.get('port'))
});
