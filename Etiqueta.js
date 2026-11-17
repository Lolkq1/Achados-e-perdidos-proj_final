class Etiqueta{
    #id;
    #marca;
    #cor;
    #material;
    constructor(id,marca,cor,material){
        this.#id = id;
        this.#marca = marca;
        this.#cor = cor;
        this.#material = material;
    }
     getId(){
        return this.#id;
    }
    setId(NovoID){
        this.#id = NovoID;
    }
     getMarca(){
        return this.#marca;
    }
    setMarca(NovaMarca){
        this.#marca = NovaMarca;
    }
     getCor(){
        return this.#cor;
    }
    setCor(NovaCor){
        this.#cor = NovaCor;
    }
     getMaterial(){
        return this.#material;
    }
    setMaterial(NovoMaterial){
        this.#material = NovoMaterial;
    }
}

module.exports = Etiqueta;