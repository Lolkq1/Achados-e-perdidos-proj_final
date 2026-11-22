const res = require('express/lib/response')
const pool = require('../db')

async function insertSolicitacao(uid, turno, desc, date, loc) {
    try {
        let sol = await pool.execute('INSERT INTO solicitacao (id_usuario, turno, descricao_solicitante, data_perdido, id_local) VALUES (?,?,?,?,?)', [uid, turno, desc, date, loc])
        return sol.resultId
    } catch(err) {
        console.log(err)
        throw new Error("erro interno do servidor", {cause: 500})
    }
}

async function deleteSolicitacao(id) {
    try {
        await pool.execute('DELETE FROM solicitacao WHERE id=?', [id])
        return
    } catch(err) {
        throw new Error("erro interno do servidor", {cause: 500})
    }
}

async function getSolicitacaoById(id) {
    try {
        let [sol] = await pool.execute("SELECT * FROM solicitacao WHERE id=?", [id])
        if (sol.length === 0) {
            throw new Error("solicitação não encontrada.", {cause: 404})
        }
        return sol[0]
    } catch(err) {
        if (err.cause === 404) {
            throw err;
        } else {
            throw new Error("erro interno do servidor", {cause: 500})
        }
    }
}

async function alterarStatusSolicitacao(id, status) {
    try {
        await pool.execute('UPDATE solicitacao SET status=? WHERE id=?', [status,id])
        return
    } catch(err) {
        throw new Error("status inválido.", {cause: 422})
    }
}

async function setEntregadorSolicitacao(id, id_entregador) {
    try {
        await pool.execute('UPDATE solicitacao SET responsavel_entrega=? WHERE id=?', [id_entregador, id])
        return
    } catch(err) {
        if (err.errno === 1452) {
            throw new Error("O entregador não existe.", {cause:404})
        }
    }
}

async function setObjetoSolicitacao(id, id_objeto) {
    try {
        await pool.execute('UPDATE solicitacao SET id_objeto=? WHERE id=?', [id_objeto, id])
        return
    } catch(err) {
        if (err.errno === 1452) {
            throw new Error("O objeto não existe.", {cause: 404})
        }
    }
}

async function getSolicitacoesByUserId(uid, limit, ordem, pag) {
    if (!limit) {
        limit = 5
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    if (!pag) {
        pag = 1
    }
    try {
        let [sols] = await pool.execute(`select s.*, e.email as email_entregador from solicitacao as s LEFT JOIN usuario as e ON s.responsavel_entrega = e.id WHERE s.id_usuario=? ORDER BY s.id DESC limit ? OFFSET ?`, [uid, limit, (pag-1)*limit])
        return sols
    } catch(err) {
        console.log(err)
        throw new Error('erro interno do servidor', {cause: 500})
    }
}


async function getSolicitacoes(limit, ordem, pag) {
    if (!limit) {
        throw new Error('limite (sql display) não informado.', {cause: 422})
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    if (!pag) {
        throw new Error('pagina (sql display) não informado.', {cause: 422})
    }
    try {
        let [sols] = await pool.execute(`select s.*, u.email as email_solicitante, e.email as email_entregador from solicitacao 
            as s JOIN usuario as u ON s.id_usuario = u.id LEFT JOIN usuario as e ON s.responsável_entrega=e.id ORDER BY s.id ${ordem} limit ? 
            offset ?`, [limit, pag*limit])
        return sols
    } catch (err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}



module.exports = {deleteSolicitacao, alterarStatusSolicitacao, getSolicitacaoById, insertSolicitacao, setEntregadorSolicitacao, setObjetoSolicitacao, getSolicitacoes, getSolicitacoesByUserId}