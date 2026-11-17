class Local{
    #id;
    #nome
     constructor(id,nome){
        this.#id = id;
        this.#nome = nome;
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
}

module.exports = Local;
