module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.landingpage.iniciar(application, req, res);
	});

	application.post('/cadastrar', function(req, res){
		application.app.controllers.landingpage.cadastrar(application, req, res);
	})
}