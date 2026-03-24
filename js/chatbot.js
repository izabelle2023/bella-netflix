const widget = document.getElementById("chatbot-widget")
const toggle = document.getElementById("chatbot-toggle")
const closeBtn = document.getElementById("chatbot-close")

const form = document.getElementById("chatbot-form")
const input = document.getElementById("chatbot-input")
const messages = document.getElementById("chatbot-messages")

/* abrir chat */

toggle.addEventListener("click", () => {

    widget.classList.add("aberto")

})

/* fechar chat */

closeBtn.addEventListener("click", () => {

    widget.classList.remove("aberto")

})

/* adicionar mensagem */

function addMessage(text, type) {

    const msg = document.createElement("div")

    msg.classList.add("chatbot-message")

    if (type === "user") {
        msg.classList.add("chatbot-message-user")
    } else {
        msg.classList.add("chatbot-message-bot")
    }

    msg.textContent = text

    messages.appendChild(msg)

    messages.scrollTop = messages.scrollHeight

}

/* respostas simples */

function botResponse(text) {

    let resposta = "Não entendi sua pergunta."

    if (text.includes("video") || text.includes("filme")) {
        resposta = "Você pode acessar os vídeos no menu principal."
    }

    if (text.includes("login")) {
        resposta = "Você pode fazer login na página inicial."
    }

    if (text.includes("ajuda")) {
        resposta = "Claro! Estou aqui para ajudar."
    }

    setTimeout(() => {

        addMessage(resposta, "bot")

    }, 600)

}

/* envio de mensagem */

form.addEventListener("submit", (e) => {

    e.preventDefault()

    const text = input.value.trim()

    if (text === "") return

    addMessage(text, "user")

    botResponse(text.toLowerCase())

    input.value = ""

})