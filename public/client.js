// Variavel do Socket
const socket = io();
// Container de configuração
var config = document.getElementById("config");
// Formulario de criação de usuario
var formUser = document.getElementById("configuration");
// Input do nome de usuario
var nameUser = document.getElementById("NameUser");
// Input da cor do nome de usuario
var nameColor = document.getElementById("Color");
// elementos de alerta
var alertContent = document.getElementById("alert");
var alertSucess = document.getElementById("alertSucess");

// Contain de usuarios que entraram no chat
var userJoin = document.getElementById("usersJoin");
// Contain de usuarios que estçao ativos
var userActive = document.getElementById("usersActive");

// Formulário de edição de nome
var alterName = document.getElementById("alterName")
// Novo nome a ser alterado
var newNome = document.getElementById("newName")
// Evento de submição de alteração de nome
alterName.onsubmit = (e) => {
  e.preventDefault();
  if (newNome.value != "") {
    var sucess = document.getElementById("Sucess");
    if (newNome.value == window.localStorage.nome) {
      alert("Esse já é seu nome atual, insira outro");
    } else {
      window.localStorage.nome = newNome.value;
      sucess.innerHTML = "Novo nome salvo!";
      sucess.style.display = "block";
      setTimeout(() => {
        sucess.style.display = "none";
      }, 5000)
      newNome.value = "";
      var user = document.getElementById("user");
      user.innerHTML = window.localStorage.nome;
    }

  } else {
    alert("Insira um nome para renomear");
  }
}

// Evento de submição
formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameUser.value != "") {
    if (nameColor == "") {
      nameColor.value = "black";
    } else {
      window.localStorage.color = nameColor.value;
    }
    window.localStorage.nome = nameUser.value;
    alertSucess.innerHTML = "Olá <span style='font-weight: 700;'>" + nameUser.value + "</span>, seu nome foi salvo no navgador para facilitar o acesso ao chat!";
    alertSucess.style.display = "block";

    var user = document.getElementById("user");
    user.innerHTML = window.localStorage.nome;

    setTimeout(() => {
      alertSucess.style.display = "none";
      config.style.display = "none";
    }, 10000);
    nameUser.value = "";

    // Emição de eventos
    //   -Evento de conexão
    socket.on("connect", () => {
      socket.emit("active", window.localStorage.nome);
      socket.emit("Notify", {
        name: window.localStorage.nome,
        body: `${window.localStorage.nome} Está ativo no chat`
      });
    })
    //   -Evento de usuario entrando
    socket.emit("user join", window.localStorage.nome);


    userJoin.innerHTML += `
        <span class="userSpan">👥 <span style="font-weight: 600;">Você</span> Entrou no chat</span>
        `;

  } else {
    alertContent.innerHTML = "Nome de usuario não foi definido";
    alertContent.style.display = "block";
    setTimeout(() => {
      alertContent.style.display = "none";
    }, 5000);
  }
})


// Evende carregamento
window.addEventListener("load", () => {
  if (Notification.permission == "denied" || Notification.permission == "default") {
    Notification.requestPermission();
  }
  // Verifica se tem algum nome salvo
  if (window.localStorage.nome) {
    config.style.display = "none";
    var user = document.getElementById("user");
    user.innerHTML = window.localStorage.nome;

    // Evento de conexão ao socket
    socket.on("connect", () => {
      socket.emit("active", window.localStorage.nome);
      socket.emit("Notify", {
        name: window.localStorage.nome,
        body: `${window.localStorage.nome} Está ativo no chat`
      });
    })


    userActive.innerHTML += `
        <span class="active"><span style="font-weight: 800;">Você</span> se conectou</span>
        `;

  } else {
    config.style.display = "flex";
  }
})
var users;
// Evento de usuario entrou no chat
socket.on("join_active", (user) => {
  userJoin.innerHTML += `
    <span class="userSpan">👥 <span style="font-weight: 600;">${user}</span> Entrou no chat</span>
    `;
})
// Evento de usuario ativo
socket.on("active-user", name => {
  userActive.innerHTML += `
    <span class="active"><span style="font-weight: 800;">${name}</span> se conectou</span>
    `;
})
// Evento de notificação
socket.on("notification", data => {
  return new Notification(data.name, {
    body: data.body
  });
})
var chat = document.getElementById("chat");
var formChat = document.getElementById("form-chat");
var message = document.getElementById("message");
// Enviado mensagem para o chat
var textMessage;
formChat.onsubmit = (e) => {
  e.preventDefault();
  switch (message.value) {
    case "++help":
      setTimeout(() => {
        chat.innerHTML += `
                <div class="bot">
                    <img src="https://th.bing.com/th/id/OIP.afrHdtQd_HZKaJJGGo-toQHaHa?pid=ImgDet&rs=1">
                    <div class="bot-content">
                        <span>Kall <img src="https://th.bing.com/th/id/OIP.ZZ9himYQZ031NcljyvkCogAAAA?pid=ImgDet&rs=1" title="verificado"></span>
                        <div class="content">
                            <h1>Sistema de ajuda!</h1>
                            <p>
                            Olá bem vindo ao sistema de ajuda do Chat RealTime, o chat realtime é um pequeno projeto desenvolvido pelo programador <strong>lairton Goncalves</strong> inclusive eu :), que tem como objetivo a interação em tempo real.
                            </p>

                            <br>
                            <strong>Ajuda</strong>
                            <br><br>
                            <strong>Links no chat realtime</strong> Você pode adicionar Link das seguintes formas: <br><br>
                                <li>Links podem ser adicionados no final da mensagem.</li><br>
                                <li>Link pode ser adicionado de forma nua, ou seja você pode enviar uma mensagem apenas com o link</li>
                            <br><br>
                            <strong>Anexos no chat realtime</strong> Para enviar anexo é bem simples click no botão de anexo caso tenha. <br><br>
                            <strong>Para comandos de interação digite ++commands</strong><br>
                            <strong>Apenas você vê isso!</strong>
                        </div>
                    </div>
                 </div>
                `;
        chat.scrollTop = chat.scrollHeight;
      }, Math.floor(Math.random() * 10000));
      break;
    case "++commands":
      setTimeout(() => {
        chat.innerHTML += `
                <div class="bot">
                    <img src="https://th.bing.com/th/id/OIP.afrHdtQd_HZKaJJGGo-toQHaHa?pid=ImgDet&rs=1">
                    <div class="bot-content">
                        <span>Kall <img src="https://th.bing.com/th/id/OIP.ZZ9himYQZ031NcljyvkCogAAAA?pid=ImgDet&rs=1" title="verificado"></span>
                        <div class="content">
                            <h1>Sistema de comandos do RealTime!</h1>
                            <p>
                                Olá esse é o sistema de comandos do chat realtime, são comandos simples de insteração! e diversão, mas com uma observação, apenas você vê as mensagens do bot!
                            </p>
                            <br><br>

                            <strong>Para ajuda digite ++help</strong><br><br>
                            Apenas você vê isso!
                        </div>
                    </div>
                 </div>
                `;
        chat.scrollTop = chat.scrollHeight;
      }, Math.floor(Math.random() * 10000));
      break;
    default:
      break;
  }
  if (message.value != "") {
    var link = [];
    var newMessage;
    textMessage = message.value.split(" ");
    for (var text of textMessage) {
      if (text.startsWith("https")) {
        link.push(text);
        newMessage = message.value.replace(`${link}`, `<a href='${link}' target='_blank'>${link}</a>`);
      } else {
        newMessage = message.value;
      }
    }
    // Evento de menssagem
    socket.emit("message", {
      user: window.localStorage.nome,
      message: newMessage,
      color: window.localStorage.color
    });

    chat.innerHTML += `
        <div class="message">
            <span class="autor" style="color: ${window.localStorage.color}"> ${window.localStorage.nome}</span>
            <p class="content">${String(newMessage)}</p>
         </div>
        `;
    message.value = "";
    chat.scrollTop = chat.scrollHeight;
  } else {
    alert("Inisira uma mensagem para enviar");
  }
}
// Ouvindo o evento de mensagem e imprimindo na tela para todos os sockets
socket.on("chat", data => {
  chat.scrollTop = chat.scrollHeight;
  chat.innerHTML += `
    <div class="message">
        <span class="autor" style="color: ${data.color}">${data.user}</span>
        <p class="content">${String(data.message)}</p>
     </div>
    `;
})

// Evento de input
var dig = document.getElementById("digitation");
// Ouvindo o input

var menu = document.getElementById("menu");
menu.onclick = () => {
  var menuSide = document.getElementById("menu-aside");
  menuSide.style.left = "0";
}
var close = document.getElementById("closeMenu");
close.onclick = () => {
  var menuSide = document.getElementById("menu-aside");
  menuSide.style.left = "-600px";
}
