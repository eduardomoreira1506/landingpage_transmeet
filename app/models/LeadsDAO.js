function LeadsDAO(connection){
	//conexão do banco
	this._connection = connection;
}

LeadsDAO.prototype.inserirLead = function(lead, marcacaoCliente,callback){
	this._connection.query('insert into leads (cpf_cnpj, telefone, whatsapp, marcacaoCliente) values ('+ lead.cpf_cnpj + ',' + lead.telefone + ',' + lead.whatsapp + ',' + marcacaoCliente + ')', callback);
}

LeadsDAO.prototype.procuraNoBanco = function(cpf_cnpj, callback){
	this._connection.query('select * from leads where cpf_cnpj = ' + cpf_cnpj, callback);
}

module.exports = function(){
	//exporta o objeto
	return LeadsDAO;
}