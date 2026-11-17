class Usuario{
    #id;
    #nome;
    #senha;
    #tipo;
    constructor(id,nome,senha,tipo){
        this.#id = id;
        this.#nome = nome;
        this.#senha = senha;
        this.#tipo = tipo
    }
    getId(){
        return this.#id;
    }
    setId(NovoID){
        this.#id = NovoID;
    }
     getNome(){
        return this.#nome;
    }
    setNome(NovoNome){
        this.#nome = NovoNome;
    }
     getSenha(){
        return this.#senha;
    }
    setSenha(NovaSenha){
        this.#senha = NovaSenha;
    }
     getTipo(){
        return this.#tipo;
    }
    setTipo(NovoTipo){
        this.#tipo = NovoTipo;
    }
}

module.exports = Usuario;