const btn1 = document.querySelector("#btn")
const btn2 = document.querySelector("#btn_voltar")


btn1.addEventListener('click', async (e) => {
    e.preventDefault()
    let marca = document.querySelector("#marca")
    let material = document.querySelector("#material")
    let cor = document.querySelector("#cor")
    let a = await fetch('/api/etiqueta/', {
        method: 'POST',
        body: JSON.stringify({
            marca: marca.value,
            cor: cor.value,
            material: material.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    let b = await a.text()
    let c = await JSON.parse(b)
    alert(c.msg)
    if (a.ok) {
        document.location.href='/u/etiquetas'
    }
    // descricao bloco date turno
})

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    document.location.href='/u/etiquetas'
})

