var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'eduardo',
		database : 'radius_transmeet'
	});
}

module.exports = function () {
	return connMySQL;
}