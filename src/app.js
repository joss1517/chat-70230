// CHAT COMUNITARIO.

import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
const app = express();
const PUERTO = 8080;



// Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Configuramos express-Handlebars:
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas:
app.get('/', (req, res) => {
  // res.send(`Hola Mundo!`)
  res.render('index');
})


// Listen:
const httpServer =app.listen(PUERTO, () => {
  console.log(`Estamos ecuchando desde el puerto: ${PUERTO}`);
})


// Generamos la instancia de socket.io del lado del backend
const io = new Server(httpServer);

// Creamos un array para almacenar a todos los usuarios con los mensajes.
let messages = [];

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');
  
  socket.on('message', data => {
    messages.push(data);

    // Acá envío el array actualizado
    io.emit('messagesLogs', messages)
  })
})