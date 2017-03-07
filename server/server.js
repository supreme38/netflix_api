const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const app = express();

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('client'));

app.post('/search', (req, res) => {

	var title = req.body.title;
	console.log('******************', title)

	let options = {
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

	var obj = {};

	rp(options)
		.then((repos) => {
			console.log("*****", repos)
			obj['movie1'] = repos;
		})
		.then(rp(options2)
			.then((repos) => {
				obj['movie2'] = repos
				res.send(obj)
			})
		)
		.catch((err) => {
			throw(err)
		});
});


app.listen(app.get('port'), () => {
	console.log('Listening on port', app.get('port'))
});
