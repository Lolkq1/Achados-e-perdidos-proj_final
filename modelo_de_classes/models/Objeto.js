class Objeto{
    #id;
    #descricao;
    #data;
    #situacao;
    constructor(id,descricao,data,situacao){
        this.#id = id;
        this.#descricao = descricao;
        this.#data = data;
        this.#situacao = situacao;
    }
     getId(){
        return this.#id;
    }
    setId(NovoID){
        this.#id = NovoID;
    }
     getDescricao(){
        return this.#descricao;
    }
    setDescricao(NovaDescricao){
        this.#descricao = NovaDescricao;
    }
      getData(){
        return this.#data;
    }
    setData(NovaData){
        this.#data = NovaData;
    }
    getSituacao(){
        return this.#situacao;
    }
    setSituacao(NovaSituacao){
        this.#situacao = NovaSituacao
    }
}

module.exports = Objeto;