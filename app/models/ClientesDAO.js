function ClientesDAO(connection){
	//conexão do banco
	this._connection = connection;
}

ClientesDAO.prototype.procuraNoBanco = function(cpf_cnpj, callback){
	this._connection.query('select * from clientes where cpf_cnpj = ?', cpf_cnpj, callback);
}

module.exports = function(){
	//exporta o objeto
	return ClientesDAO;
}