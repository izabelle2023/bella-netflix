
const idioma = document.getElementById("idioma")

const titulo = document.getElementById("titulo")
const subtitulo = document.getElementById("subtitulo")
const comecar = document.getElementById("comecar")
const saiba = document.getElementById("saiba")
const sobreTitulo = document.getElementById("sobreTitulo")
const sobreTexto = document.getElementById("sobreTexto")

idioma.addEventListener("change", () => {

if(idioma.value === "pt"){

titulo.textContent = "Filmes, séries e tecnologia em um só lugar"
subtitulo.textContent = "Assista conteúdos exclusivos da Bella+ quando quiser."
comecar.textContent = "Começar agora"
saiba.textContent = "Saiba mais"
sobreTitulo.textContent = "O que é a Bella+"
sobreTexto.textContent = "A Bella+ é uma plataforma de streaming focada em filmes, séries e tecnologia. Nosso objetivo é conectar entretenimento e inovação em uma experiência moderna e acessível para todos."

}

if(idioma.value === "en"){

titulo.textContent = "Movies, series and technology in one place"
subtitulo.textContent = "Watch exclusive Bella+ content whenever you want."
comecar.textContent = "Start now"
saiba.textContent = "Learn more"
sobreTitulo.textContent = "What is Bella+"
sobreTexto.textContent = "Bella+ is a streaming platform focused on movies, series and technology. Our goal is to connect entertainment and innovation in a modern and accessible experience."

}

if(idioma.value === "es"){

titulo.textContent = "Películas, series y tecnología en un solo lugar"
subtitulo.textContent = "Mira contenido exclusivo de Bella+ cuando quieras."
comecar.textContent = "Comenzar ahora"
saiba.textContent = "Saber más"
sobreTitulo.textContent = "Qué es Bella+"
sobreTexto.textContent = "Bella+ es una plataforma de streaming enfocada en películas, series y tecnología. Nuestro objetivo es conectar entretenimiento e innovación en una experiencia moderna."

}

})
