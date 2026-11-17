const Categoria = require('./Categoria.js')
const Etiqueta = require('./Etiqueta.js');
const Usuario = require('./Usuario.js');
const Objeto = require('./Objeto.js');
const Local = require('./Local.js');
const Solicitacao_devolucao = require('./solicitacao_devolucao.js')

const us2 = new Objeto(1121,"baixo","14-06-2001","perdido")
const us3 = new Solicitacao_devolucao(413131,"12-03-1998","kratos","quero funcionando")

console.log(us2.getId())
console.log(us2.getData())
console.log(us3.getId())
console.log(us3.getResponsavel_Entrega())
