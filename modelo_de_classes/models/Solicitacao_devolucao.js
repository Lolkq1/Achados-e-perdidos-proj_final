class Solicitacao_devolucao{
    #id;
    #status;
    #data_entrega;
    #responsavel_entrega;
    #descricao_solicitante;
    constructor(id,status,data_entrega,responsavel_entrega,descricao_solicitante){
        this.#id = id;
        this.#status = status;
        this.#data_entrega = data_entrega;
        this.#responsavel_entrega = responsavel_entrega;
        this.#descricao_solicitante = descricao_solicitante;
    }
    getId(){
        return this.#id;
    }
    setId(NovoID){
        this.#id = NovoID;
    }
    getStatus(){
        return this.#status;
    }
    setStatus(NovoStatus){
        this.#status = NovoStatus;
    }
     getData_Entrega(){
        return this.#data_entrega;
    }
    setid(NovaData_Entrega){
        this.#data_entrega = NovaData_Entrega;
    }
    getResponsavel_Entrega(){
        return this.#responsavel_entrega;
    }
    setResponsavel_Entrega(NovoResponsavel_entrega){
        this.#responsavel_entrega = NovoResponsavel_entrega;
    }
    getDescricao_Solicitante(){
        return this.#descricao_solicitante;
    }
    setDescricao_Solicitante(NovoDescricao_Solicitante){
        this.#descricao_solicitante = NovoDescricao_Solicitante
    }
}

module.exports = Solicitacao_devolucao