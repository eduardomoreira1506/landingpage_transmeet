module.exports.iniciar = function(application, req, res){
	res.render('landingpage', { validacao: {}, dadosForm: {} });
}

module.exports.cadastrar = function(application, req, res){
	var dadosForm = req.body;

    req.assert('cpf_cnpj', 'Digite seu CPF/CNPJ').notEmpty();
    req.assert('telefone', 'Digite seu Telefone').notEmpty();
    req.assert('whatsapp', 'Digite seu whatsapp').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('landingpage', {validacao: erros, dadosForm: dadosForm });
        return;
    }

    var connection = application.config.dbConnection();
    var clientesModel = new application.app.models.ClientesDAO(connection);
    var leadsModel = new application.app.models.LeadsDAO(connection);

    var cpf_cnpj = dadosForm.cpf_cnpj;
    clientesModel.procuraNoBanco(cpf_cnpj, function(error, result){
        if(result == undefined){
            var marcacaoCliente = 0;
            validaDuplicidade(dadosForm, marcacaoCliente);
        }else{
            if(result.length == 0){
                var marcacaoCliente = 0;
                validaDuplicidade(dadosForm, marcacaoCliente);
            }else{
                var marcacaoCliente = 1;
                validaDuplicidade(dadosForm, marcacaoCliente);
            }
        }
    })

    var validaDuplicidade = function(dadosForm, marcacaoCliente){
        leadsModel.procuraNoBanco(cpf_cnpj, function(error, result){
            if(result == undefined){
                insereNoBanco(dadosForm, marcacaoCliente);
            }else{
                if(result.length == 0){
                    insereNoBanco(dadosForm, marcacaoCliente);
                }else{
                    res.send('CPF/CNPJ já cadastrado');
                }
            }
        })
    }

    var insereNoBanco = function(dadosForm, marcacaoCliente){
        var lead = {cpf_cnpj: dadosForm.cpf_cnpj, telefone: dadosForm.telefone, whatsapp: dadosForm.whatsapp, marcacaoCliente: marcacaoCliente};
        leadsModel.inserirLead(lead, function(erros, result){
            res.send('cadastrou novo lead');
        })
    }
}