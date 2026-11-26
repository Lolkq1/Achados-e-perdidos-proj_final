const btn = document.querySelector("#btn")
btn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email_inp = document.querySelector("#email")
    const nome_inp = document.querySelector("#nome")
    const senha_inp = document.querySelector("#senha")
    const tipo_inp = document.querySelector("#tipo")

    let a = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({
            nome: nome_inp.value,
            senha: senha_inp.value,
            email: email_inp.value,
            tipo: tipo_inp && tipo_inp.value ? tipo_inp.value : "comum"
        }),
        headers: {
            'content-type': 'application/json'
        }
    })

    let b = await a.text()
    let c = JSON.parse(b)
    alert(c.msg)

    if (a.ok) {
        switch (c.tipo) {
            case 'comum':
                document.location.href = '/u/inicial'
                break;
            case 'administrador':
                document.location.href = '/u/painel_admin'
                break;
            case 'entregador':
                document.location.href = '/u/painel_entregador'
                break;
            default:
                document.location.href = '/u/inicial'
                break;
        }
    }
})