const { getAllBlocos, getLocaisByBloco } = require('../models/LocalModel.js')
const {deleteSolicitacao, modSolicitacao, alterarStatusSolicitacao, insertSolicitacao, getSolicitacaoById, setEntregadorSolicitacao, getEntregadorSolicitacoes, setObjetoSolicitacao, getSolicitacoesByUserId, getSolicitacoes, getDetailedSolicitacao, get} = require('../models/SolicitacaoModel.js')
const { getUserByEmail } = require('../models/UserModel.js')

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
    try {
        if (!req.params.id) {
            return res.status(422).json({msg: 'id não informado.'})
        }
        let {descricao_solicitante, data_perdido, status, id_local, turno, data_entrega, responsavel_entrega} = req.body
        let id = parseInt(req.params.id)
        
        if (res.locals.user.tipo !== 'administrador') {
            return res.status(403).json({msg: 'não autorizado.'})
        }
        if (responsavel_entrega) {
            let resp = await getUserByEmail(responsavel_entrega)
            if (resp.tipo !== 'entregador') {
                return res.status(422).json({msg: 'O e-mail inserido não pertence a uma conta de um entregador.'})
            }
            responsavel_entrega = resp.id
        } else {
            responsavel_entrega = null
        }
        if (!data_entrega) {
            data_entrega = null
        }
        await modSolicitacao(id, descricao_solicitante, data_perdido, status, id_local, turno, data_entrega, responsavel_entrega)
        return res.json({msg: 'Alteração concluida com sucesso!'})
    } catch(err) {
        return res.status(err.cause || 500).json({msg: err.message})
    }
}

async function getSolicitacao(req, res) {
    try {   
    let sol = await getSolicitacaoById(req.params.id) 
    if (res.locals.user.id !== sol.id_usuario && res.locals.user.tipo !== "administrador") {
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
        if (res.locals.user.id !== uid && res.locals.user.tipo !== "administrador") {
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
            if (sol.id_usuario !== res.locals.user.id && res.locals.user.tipo !== 'administrador') {
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
        if (pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/solicitacoes')
        }
        if (res.locals.user.tipo === 'administrador') {
            let sols = await getSolicitacoes(7, 'DESC', pag)
            if (sols.length === 0 && pag !== 1 ) {
                return res.redirect('/u/solicitacoes')
            }
            return res.render('authNeeded/solicitacoes_devolucao_adm.ejs', {
                sols: sols,
                pag: pag,
                usuario: {email: res.locals.user.email, uid: res.locals.user.id}
            })
        }
        let sols = await getSolicitacoesByUserId(uid, 7, 'DESC', pag)
        if (sols.length === 0 && pag !== 1) {
            return res.redirect('/u/solicitacoes')
        }
        return res.render('authNeeded/minhas_solicitacoes_devolucao.ejs', {
            sols: sols,
            pag: pag,
            usuario: res.locals.user.email
        })
    } catch(err) {
            return res.redirect(`/u/inicial`)
    }
}

async function dynamicSolicitacaoEntregas(req, res) {
    try {
        if (!req.params.pag) {
            return res.redirect('/u/entregas?pag=1')
        }
        let pag = parseInt(req.params.pag)
        if (pag < 0 || pag === 0 || isNaN(pag)) {
            return res.redirect('/u/entregas')
        }
        let sols = await getEntregadorSolicitacoes(res.locals.user.id, pag, 'DESC', 7)
        return res.render('authNeeded/entregas.ejs', {
            sols: sols,
            pag: pag
        })
    } catch(err) {
        console.log(err)
        return res.redirect('/u/painel_entregador')
    }
}

async function dynamicSolicitacaoEditar(req, res) {
    try {
        if (!req.params.id || isNaN(parseInt(req.params.id))) {
            return res.status(422).json({msg:'kd o id but'})
        }
        let id = parseInt(req.params.id)
        console.log(id)
        let sol = await getDetailedSolicitacao(id)
        let blocos = await getAllBlocos()
        console.log(sol)
        let [dia, mes, ano] = sol.sol_data_perdido.toLocaleString('PT-BR').split(',')[0].split('/')
        if (sol.sol_data_entrega) {
            let [dia, mes, ano] = sol.sol_data_entrega.toLocaleString('PT-BR').split(',')[0].split('/')
            let datnovo = `${ano}-${mes}-${dia}`
            sol.sol_data_entrega = datnovo
        }
        let datnovo = `${ano}-${mes}-${dia}`
        sol.sol_data_perdido = datnovo 
        let locaisInit = await getLocaisByBloco(sol.sol_bloco)
        return res.render('authNeeded/solicitacao_edit.ejs', {
            sol: sol,
            blocos: blocos,
            locaisInit: locaisInit,
            usuario: res.locals.user.email
        })
    } catch(err) {
        console.log(err)
        return res.status(err.cause).json({msg: err.message})
    }
}

module.exports = {getSolicitacao, alterarSolicitacao, cadastrarSolicitacao, dynamicSolicitacaoEntregas, getSolicitacoesByUser, getSolicitacoes, dynamicSolicitacoes, removerSolicitacao, dynamicSolicitacaoEditar}