const btn1 = document.querySelector("#btn")
const btn2 = document.querySelector("#btn_voltar")

btn1.addEventListener('click', async (e) => {
    e.preventDefault()
    let id = document.querySelector("#local_id").value
    let local = document.querySelector("#local")
    let bloco = document.querySelector("#bloco")
    let a = await fetch('/api/local/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            local: local.value,
            bloco: bloco.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    let c = await a.json()
    alert(c.msg)
    if (a.ok) {
        document.location.href = '/u/locais'
    }
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href = '/u/locais'
})