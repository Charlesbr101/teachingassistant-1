import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  var retaluno = cadastro.cadastrar(aluno);
  if (retaluno == true) {
    res.send({"cpfd": "O aluno n�o pode ser cadastrado, cpf já existe"});
  } else if(retaluno == false) {
    res.send({"gitd": "O aluno n�o pode ser cadastrado, login git já existe"});
  } else{
      res.send({"success": "O aluno foi cadastrado com sucesso"});
    }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno n�o pode ser atualizado"});
  }
})

taserver.delete('/aluno/:cpf', function (req: express.Request, res: express.Response) {
  var cpf: String = <String> req.params.cpf;
  var aluno = cadastro.remover(cpf);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno n�o pode ser atualizado"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})