/*
** Express Router
** SWAPI Sample Application
** @author: Triadi Prabowo
*/

var express = require('express')().Router,
	Bing = require('node-bing-api')({ accKey: 'ZHZLrDlpIkzfN+zZAl/vE6nGQFo7b37jOje8Wkziy20'}),
	request = require('request'),
	swapiURL = 'http://swapi.co/api/'

module.exports = ({
	index: function(req, res, next) {
		// Start Render
		res.render('index', {
			title: 'SWAPI Sample Application',
			app: {
				controllerName: 'indexController',
				controllerScript: ['index']
			},
			route: {
				path: req.route.path,
				params: req.params
			}
		});
	},
	character: function(req, res, next) {
		var url = swapiURL+'people/'+req.params.id+'/';
		
		// Request API
		request.get(url, function(err, response, body) {
			if(response.statusCode == 200) {
				var data = JSON.parse(body);

				// Start Rendering
				res.render('character_detail', {
					title: 'Character :: '+data.name,
					app: {
						controllerName: 'characterController',
						controllerScript: ['character']
					},
					route: {
						path: req.route.path,
						params: req.params
					},
					data: body
				});
			}
		});
	},
	bingImgSearch: function(req, res, next) {
		// Start Render
		Bing.images(req.params.key, {
			imageFilters: {
				size: 'Medium' // I just need to use for sizing only in image filtering
			}
		}, function(error, response, body) {
			res.send(body);
		});
	},
	movies: function(req, res, next) {
		var url = swapiURL+'films/'+req.params.id+'/';

		// Request API
		request.get(url, function(err, response, body) {
			var data = JSON.parse(body)

			if(response.statusCode == 200) {
				// Start rendering
				res.render('movie_detail', {
					title: 'Movies :: ' +data.title,
					app: {
						controllerName: 'moviesController',
						controllerScript: ['movies']
					},
					route: {
						path: req.route.path,
						params: req.params
					},
					data: body
				});	
			}
			
		});
	}
});