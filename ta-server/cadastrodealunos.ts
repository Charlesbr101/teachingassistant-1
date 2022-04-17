import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

    cadastrar(aluno: Aluno): Aluno | boolean {
     var result = null;
     if (!this.cpfNaoCadastrado(aluno.cpf)) {
      result = true;
     }
     else if(!this.gitNaoCadastrado(aluno.git)){
      result = false;
     }
     else{
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
     }

     return result;
   }

    cpfNaoCadastrado(cpf: string): boolean {
      return !this.alunos.find(a => a.cpf == cpf);
   }
    gitNaoCadastrado(git: string): boolean {
      return !this.alunos.find(a => a.git == git);
   }

    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    remover(cpf: String): Aluno {
      var result: Aluno = this.alunos.find(a => a.cpf == cpf);
      if (result){
        result.copyFrom(result);
        this.alunos = this.alunos.filter(a => a.cpf != cpf);
      }
      return result;
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }
}