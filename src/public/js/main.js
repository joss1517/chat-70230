// Creamos una instancia de socket.io del lado del cliente:

const socket = io();

// Creamos una variable para guardar el usuario.
let user;
const chatBox = document.getElementById('chatBox')

// Utilizamos sweet alert para el mensaje de bienvenida.
// Swal es un objeto global que nos permite usar los métodos de la librería
// Fire es el método que nos permite configurar la alerta.
Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa un usuario para identificarte en el chat',
  inputValidator: (value) => {
    return !value && 'Necesitas escribir un nombre para continuar'
  },
  allowOutsideClick: false
}).then(result => {
  user = result.value;
})

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    // Solo cuando se presiona enter, envio el mensaje
    if (chatBox.value.trim().length > 0) {
      // Si el mensaje, después de que quite los espacios, tiene más de 0 caracteres lo enviamos al servidor.
      socket.emit('message', { user: user, message: chatBox.value });
      chatBox.value = "";
   }
  }
})

// Listener de messages

socket.on('messagesLogs', data => {
  const log = document.getElementById('messagesLogs');
  let messages = "";
  data.forEach(message => {
    messages = messages + `${message.user} dice: ${message.message} <br> `;
  })

  log.innerHTML = messages;
})