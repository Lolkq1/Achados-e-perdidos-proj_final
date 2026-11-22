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
    let optdefault = document.createElement('option')
        optdefault.value="nulo"
        optdefault.textContent="Não tenho certeza..."
        local.appendChild(optdefault)
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
    let date = document.querySelector("#date")
    let turno = document.querySelector("#turno")
    
    let a = await fetch('/api/solicitacao', {
        method: 'POST',
        body: JSON.stringify({
            descricao: descricao.value,
            local: parseInt(local.value),
            date: date.value,
            turno: turno.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    let b = await a.text()
    let c = await JSON.parse(b)
    alert(c.msg)
    if (a.ok) {
        document.location.href='/u/solicitacoes'
    }
    // descricao bloco date turno
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href='/u/solicitacoes'
})
