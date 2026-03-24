const botoesAbas = document.querySelectorAll(".aba-btn");
const conteudosAbas = document.querySelectorAll(".aba-conteudo");
const recuperarBox = document.getElementById("recuperacaoBox");

botoesAbas.forEach((botao) => {
  botao.addEventListener("click", () => {
    const abaAlvoId = botao.dataset.aba;

    botoesAbas.forEach((b) => b.classList.remove("ativo"));
    conteudosAbas.forEach((c) => c.classList.remove("ativo"));

    botao.classList.add("ativo");

    const conteudoAlvo = document.getElementById(`aba-${abaAlvoId}`);
    if (conteudoAlvo) conteudoAlvo.classList.add("ativo");

    if (recuperarBox) recuperarBox.classList.remove("ativo");
  });
});

const abrirRecuperar = document.getElementById("abrirRecurepar");

if (abrirRecuperar && recuperarBox) {
  abrirRecuperar.addEventListener("click", () => {
    recuperarBox.classList.toggle("ativo");
  });
}

const campoFotoPerfil = document.querySelector('input[type="file"]');
const areaPreviewFoto = document.querySelector(".foto-preview");

if (campoFotoPerfil && areaPreviewFoto) {
  campoFotoPerfil.addEventListener("change", (evento) => {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {
      areaPreviewFoto.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    };

    leitor.readAsDataURL(arquivo);
  });
}

const campoCep = document.querySelector('input[placeholder="CEP"]');

if (campoCep) {
  campoCep.addEventListener("blur", async () => {
    const cep = campoCep.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();
      if (dados.erro) return;

      document.querySelector('input[placeholder="Endereço"]').value = dados.logradouro || "";
      document.querySelector('input[placeholder="Cidade"]').value = dados.localidade || "";
      document.querySelector('input[placeholder="Estado"]').value = dados.uf || "";
    } catch (erro) {
      console.error(erro);
    }
  });
}

const abrirFace = document.getElementById("irParaFace");

if (abrirFace) {
  abrirFace.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      console.log(stream);
    } catch (error) {
      console.error(error);
    }
  });
}

flatpickr("#dt-nascimento", {
  locale: "pt",
  dateFormat: "d/m/Y",
  maxDate: "today",
  disableMobile: true,
});