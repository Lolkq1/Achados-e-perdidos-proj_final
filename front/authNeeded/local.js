const btn1 = document.querySelector("#btn")
const btn2 = document.querySelector("#btn_voltar")


btn1.addEventListener('click', async (e) => {
    e.preventDefault()
    let bloco = document.querySelector("#bloco")
    let local = document.querySelector("#local")
    let a = await fetch('/api/local/', {
        method: 'POST',
        body: JSON.stringify({
            bloco: bloco.value,
            local: local.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    let b = await a.text()
    let c = await JSON.parse(b)
    alert(c.msg)
    if (a.ok) {
        document.location.href='/u/locais'
    }
    // descricao bloco date turno
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href='/u/locais'
})

