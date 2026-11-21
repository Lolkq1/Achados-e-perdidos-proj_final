const {alterarStatusSolicitacao, insertSolicitacao, getSolicitacaoById, setEntregadorSolicitacao, setObjetoSolicitacao, getSolicitacoesByUserId, getSolicitacoes} = require('../models/SolicitacaoModel.js')

async function cadastrarSolicitacao(req, res) {
    let {turno, desc} = req.body
    // tem q ver a parte das etiqueta ainda nn decidi comko vai ser
    try {
        await insertSolicitacao(res.locals.uid, turno, desc)
        return res.status(201).json({msg: 'Solicitação feita.'})
    } catch(err) {
        return res.status(err.cause).json({msg:err.message})
    }
}


async function alterarSolicitacao(req, res) {
    let {coluna, valor} = req.body
    try {
        let id = parseInt(req.params.id)
        switch(coluna) {
            case 'responsavel_entrega':
                await setEntregadorSolicitacao(id, valor)
                break
            case 'status':
                await alterarStatusSolicitacao(id, valor)
                break;
            case 'objeto':
                await setObjetoSolicitacao(id, valor)
                break;
            default:
                throw new Error("alteração inválida.", {cause: 422})
        }
        return res.json({msg: 'Alteração concluida com sucesso!'})
    } catch(err) {
        return res.status(err.cause).json({msg: err.cause})
    }
} 

async function getSolicitacao(req, res) {
    try {   
    let sol = await getSolicitacaoById(req.params.id) 
    return res.json({sol: sol})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}


module.exports = {getSolicitacao, alterarSolicitacao, cadastrarSolicitacao}