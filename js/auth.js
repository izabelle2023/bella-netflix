import { auth, db } from "./firebase-config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* ELEMENTOS */

const ids = {
  formCadastro: document.getElementById("form-cadastro"),
  formLogin: document.getElementById("form-login"),
  btnGoogle: document.getElementById("btnGoogle"),
  btnAbrirRecuperar: document.getElementById("abrirRecuperar"),
  recuperarBox: document.getElementById("recuperarBox"),
  btnRecuperarEmail: document.getElementById("btnRecuperarEmail")
};


/* UTIL */

function valor(id){
  return document.getElementById(id)?.value?.trim() || "";
}

function alertar(msg){
  window.alert(msg);
}


/* ABAS LOGIN / CADASTRO */

function alternarAbas(){

  const botoes = document.querySelectorAll(".aba-btn");
  const conteudos = document.querySelectorAll(".aba-conteudo");

  botoes.forEach(btn=>{

    btn.addEventListener("click", ()=>{

      botoes.forEach(b=>b.classList.remove("ativo"));
      conteudos.forEach(c=>c.classList.remove("ativo"));

      btn.classList.add("ativo");

      const aba = btn.dataset.aba;

      document
      .getElementById(`aba-${aba}`)
      ?.classList
      .add("ativo");

    });

  });

}


/* CADASTRO */

async function cadastrarComEmail(e){

  e.preventDefault();

  const nome = valor("nome-completo");
  const email = valor("cadastro-email");
  const senha = valor("senha-cadastro");
  const confirmar = valor("confirmar-senha");

  if(!nome || !email || !senha)
  return alertar("Preencha todos os campos.");

  if(senha !== confirmar)
  return alertar("As senhas não coincidem.");

  try{

    const cred = await createUserWithEmailAndPassword(auth,email,senha);

    const usuario = cred.user;

    await setDoc(doc(db,"usuarios",usuario.uid),{

      uid: usuario.uid,
      nome: nome,
      email: email,
      criadoEm: serverTimestamp()

    });

    alertar("Conta criada com sucesso!");

    window.location.href="index.html";

  }

  catch(err){

    console.error(err);
    alertar("Erro no cadastro: "+err.message);

  }

}


/* LOGIN */

async function loginComEmail(e){

  e.preventDefault();

  const email = valor("login-email");
  const senha = valor("login-senha");

  if(!email || !senha)
  return alertar("Preencha email e senha");

  try{

    await signInWithEmailAndPassword(auth,email,senha);

    window.location.href="index.html";

  }

  catch(err){

    console.error(err);
    alertar("Erro no login: "+err.message);

  }

}


/* LOGIN GOOGLE */

async function loginGoogle(){

  try{

    const provider = new GoogleAuthProvider();

    const cred = await signInWithPopup(auth,provider);

    const usuario = cred.user;

    const ref = doc(db,"usuarios",usuario.uid);

    const snap = await getDoc(ref);

    if(!snap.exists()){

      await setDoc(ref,{

        uid:usuario.uid,
        nome:usuario.displayName,
        email:usuario.email,
        criadoEm:serverTimestamp()

      });

    }

    window.location.href="index.html";

  }

  catch(err){

    console.error(err);
    alertar("Erro Google login: "+err.message);

  }

}


/* RECUPERAR SENHA */

async function recuperarSenha(){

  const email = valor("rec-email");

  if(!email)
  return alertar("Digite seu email");

  try{

    await sendPasswordResetEmail(auth,email);

    alertar("Email de recuperação enviado!");

  }

  catch(err){

    console.error(err);
    alertar(err.message);

  }

}


/* EVENTOS */

function bindEventos(){

  alternarAbas();

  ids.formCadastro?.addEventListener("submit",cadastrarComEmail);

  ids.formLogin?.addEventListener("submit",loginComEmail);

  ids.btnGoogle?.addEventListener("click",loginGoogle);

  ids.btnAbrirRecuperar?.addEventListener("click",()=>{

    ids.recuperarBox
    ?.classList
    .toggle("ativo");

  });

  ids.btnRecuperarEmail
  ?.addEventListener("click",recuperarSenha);

}


/* AUTH STATE */

onAuthStateChanged(auth,(user)=>{

  if(user){

    console.log("Usuário logado:",user.email);

  }

});


document.addEventListener("DOMContentLoaded",bindEventos);
