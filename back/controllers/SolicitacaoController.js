const {deleteSolicitacao, alterarStatusSolicitacao, insertSolicitacao, getSolicitacaoById, setEntregadorSolicitacao, setObjetoSolicitacao, getSolicitacoesByUserId, getSolicitacoes} = require('../models/SolicitacaoModel.js')

async function cadastrarSolicitacao(req, res) {
    let {turno, descricao, local, date} = req.body
            console.log(res.locals.user.id, turno, descricao, local, date)
    // tem q ver a parte das etiqueta ainda nn decidi comko vai ser
    try {
        await insertSolicitacao(res.locals.user.id, turno, descricao, date, local)
        return res.status(201).json({msg: 'Solicitação feita.'})
    } catch(err) {
        return res.status(err.cause).json({msg:err.message})
    }
}

async function getSolicitacoesENTREGADOR() {
    //dps eu faço vou almoçar mas so pra eu lembrar da logica:
    //so preciso retornar todas as solicitacoes que estejam com status "Aprovada" e verificar se o usuário q ta pedindo é entregador
}

async function alterarSolicitacao(req, res) {
    let {coluna, valor} = req.body
    try {
        let id = parseInt(req.params.id)
        if (res.locals.user.tipo !== 'admin') {
            return res.status(403).json({msg: 'não autorizado.'})
        }
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
    if (res.locals.user.id !== sol.id_usuario && res.locals.user.tipo !== "admin") {
        return res.status(403).json({msg: 'Não autorizado.'})
    }
    return res.json({sol: sol})
    } catch(err) {
        return res.status(err.cause).json({msg: err.message})
    }
}

async function getSolicitacoesByUser(req, res) {
    let e;
    try {
        let uid = parseInt(req.params.uid)
        e=true 
        if (res.locals.user.id !== uid && res.locals.user.tipo !== "admin") {
            return res.status(403).json({msg: 'Não autorizado.'})
        }
        let sols = await getSolicitacoesByUserId(uid)
        return res.json({sols: sols})
    } catch(err) {
        if (!e) {
            throw new Error('formataçao ruim', {cause:422})
        } else {
            throw new Error('erro interno do servidor', {cause:500})
        }
    }
}

async function removerSolicitacao(req, res) {
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'id nao informado'})
        } 
            let id = parseInt(req.params.id)
            let sol = await getSolicitacaoById(id)
            if (sol.id_usuario !== res.locals.user.id) {
                return res.status(403).json({msg: 'Não autorizado.'})
            }
            await deleteSolicitacao(req.params.id)
            return res.json({msg: 'solicitação removida.'})
        
    } catch(err) {  
        return res.status(err.cause).json({msg:err.message})
    }
}

async function dynamicSolicitacoes(req, res) {
    try {
        console.log('iai')
        if (!req.params.uid) {
            return res.redirect(`/u/solicitacoes/${res.locals.user.id}?pag=1`)
        }
        if (res.locals.user.id !== parseInt(req.params.uid)) {
            return res.redirect(`/u/solicitacoes/${res.locals.user.id}?pag=1`)
        }
        let uid = parseInt(req.params.uid)
        let pag = parseInt(req.query.pag)
        console.log(pag)
        let sols = await getSolicitacoesByUserId(uid, 7, 'DESC', pag)
        if (sols.length === 0 && pag !== 1 || pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/solicitacoes')
        }
        return res.render('authNeeded/minhas_solicitacoes_devolucao.ejs', {
            sols: sols,
            pag: pag
        })
    } catch(err) {
            console.log(err)
            return res.redirect(`/u/inicial`)
    }
}

module.exports = {getSolicitacao, alterarSolicitacao, cadastrarSolicitacao, getSolicitacoesByUser, getSolicitacoes, dynamicSolicitacoes, removerSolicitacao}