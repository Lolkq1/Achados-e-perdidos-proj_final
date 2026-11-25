const btn1 = document.querySelector("#btn")
const btn2 = document.querySelector("#btn_voltar")
const bloco = document.querySelector("#bloco")
bloco.addEventListener('change', async (e) => {
    let local = document.querySelector("#local")
    console.log(bloco.value)
    if (bloco.value === 'placeholder' || bloco.value==="nulo") {
        local.innerHTML = ''
        local.disabled = true
        return;
    }
    let a = await fetch(`/api/local/${bloco.value}`)
    let b = await a.text()
    let c = await JSON.parse(b)
    local.innerHTML = ''
        local.disabled = false
    for (let x of c.locais) {
        let opt = document.createElement('option')
        console.log('a ser inserido, id:'+x.id, ', nome:'+x.nome)
        opt.value=`${x.id}`
        opt.textContent=x.nome
        local.appendChild(opt)
    }
})

btn1.addEventListener('click', async (e) => {
    e.preventDefault()
    let descricao = document.querySelector("#descricao")
    let local = document.querySelector("#local")
    let data_entrega = document.querySelector("#data_entrega")
    let data_perdido = document.querySelector("#data_perdido")
    let turno = document.querySelector("#turno")
    let status = document.querySelector("#status")
    let entregador = document.querySelector("#entregador")

    let a = await fetch('/api/solicitacao/' + document.location.toString().split('/')[5], {
        method: 'PUT',
        body: JSON.stringify({
            descricao_solicitante: descricao.value,
            id_local: parseInt(local.value),
            turno: turno.value,
            data_entrega: data_entrega.value,
            data_perdido: data_perdido.value,
            status: status.value,
            responsavel_entrega: entregador.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    let b = await a.text()
    let c = await JSON.parse(b)
    alert(c.msg)
    if (a.ok) {
        document.location.href = '/u/solicitacoes'
    }
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href='/u/solicitacoes'
})
