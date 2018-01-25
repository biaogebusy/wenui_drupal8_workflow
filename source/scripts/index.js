var $       = jQuery = require('jquery'),
		_       = require('underscore'),
		wenui   = require('../../assets/scripts/modules/wenui');

var App = require('./app.js');


function initDB(app, config){
	app.localDB = new PouchDB('drupal');
	app.localDB.load(app.config).then(function (doc) {
	  console.log(doc);
	}).catch(function (err) {
	  // HTTP error or something like that
	});
	//app.db = new PouchDB(window.location.hostname + '/wenui/source/config/drupal.config');
	//require('../source/config/drupal.config')

	console.log(app.localDB);
	console.log(app.mdb);
}
