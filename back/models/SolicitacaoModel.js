const db = require('../db')

async function insertSolicitacao(uid, turno, desc) {
    try {
        let [sol] = await pool.execute('INSERT INTO solicitacao (id_usuario, turno, descricao_solicitante) VALUES (?,?,?)', [uid, turno, desc])
        return sol.resultId
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

async function getSolicitacoesByUserId(id, limit, ordem) {
    if (!limit) {
        limit = 0
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    try {
        let [sols] = await pool.execute(`SELECT * FROM solicitacao WHERE id_usuario=? LIMIT ? ORDER BY ${ordem}`,[id, limit])
        return sols[0]
    } catch(err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}

async function getSolicitacoes(limit, ordem) {
    if (!limit) {
        throw new Error('limite (sql display) não informado.', {cause: 422})
    }
    if (!ordem) {
        ordem = 'DESC'
    }
    try {
        let [sols] = await pool.execute(`select * from solicitacao limit ? ORDER BY ${ordem}`, [limit])
        return sols[0]
    } catch (err) {
        throw new Error('erro interno do servidor', {cause: 500})
    }
}



module.exports = {alterarStatusSolicitacao, getSolicitacaoById, insertSolicitacao, setEntregadorSolicitacao, setObjetoSolicitacao, getSolicitacoes, getSolicitacoesByUserId}