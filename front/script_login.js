const btn = document.querySelector("#btn")
btn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email_inp = document.querySelector("#email")
    const senha_inp = document.querySelector("#senha")
    let a = await fetch("/api/user/login", {
        method:"POST",
        body: JSON.stringify({
          senha: senha_inp.value,
          email: email_inp.value
        }),
        headers: {
            'content-type':'application/json'
        }
    })
    if (a.ok) {
        document.location.href = '/inicial.html'
    } else {
    let b = await a.text()
    let c = await JSON.parse(b)
    alert(c.msg)
    }
})