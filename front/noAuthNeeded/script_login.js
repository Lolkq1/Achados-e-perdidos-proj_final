const btn = document.querySelector("#btn")

btn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email_inp = document.querySelector("#email")
    const senha_inp = document.querySelector("#senha")

    let a = await fetch("/api/user/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            email: email_inp.value,
            senha: senha_inp.value
        }),
        headers: {
            "content-type": "application/json"
        }
    })

    let c = await a.json()
    alert(c.msg)

    if (a.ok) {
        window.location.href = "/u/locais"
    }
})