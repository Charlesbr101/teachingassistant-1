export class Aluno {
  nome!: string;
  cpf!: string;
  git!: string;
  email!: string;
  metas!: {[index:string]:string};

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.cpf = "";
    this.git = "";
    this.email = "";
    this.metas = {};
  }

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.git = from.git;
    this.email = from.email;
    this.copyMetasFrom(from.metas);
  }

  copyMetasFrom(from: {[index:string]:string}): void {
    this.metas = {};
    for (let key in from) {
      this.metas[key] = from[key];
    }
  }
}