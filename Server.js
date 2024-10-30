const express = require ('express'); //Se importa el framework Express, que facilita la creación de aplicaciones web y APIs en Node.js.
const mongoose = require ('mongoose');//Se importa Mongoose, una biblioteca que permite interactuar con MongoDB utilizando un modelo basado en esquemas.
const cors = require('cors'); //Importa cors para manejo de CORS, un mecanismo que permite que se puedan solicitar recursos desde diferentes dominios.
const routes = require('./routes/ToDoRoute');//Importa las rutas definidas.

require('dotenv').config(); //Carga variables de entorno.

const app = express();//Se crea una instancia de la aplicación Express.
const PORT = process.env.port || 4000; //Define el puerto del servidor, si no está definido, utilizará el puerto 4000.
app.use(cors());//Habilita CORS para todas las rutas.
//Este middleware permite que la aplicación analice las solicitudes entrantes con formato JSON. Esto es esencial para manejar datos en formato JSON en las solicitudes POST.
app.use(express.json());//Habilita el parsing de JSON en el body.


mongoose //Configura la conexión a MongoDB.
.connect(process.env.MONGODB_URL)//Conecta a la URL de MongoDB definida en .env.
.then(()=> console.log(`Conectado a MongoDB...`)) //Mensaje de éxito en la conexión.
.catch((err) => console.log(err)); //Manejo de error en la conexión.

app.use(routes) //Aplica las rutas definidas.

app.listen(PORT, () => console.log(`escuchando en: ${PORT}`)); //Inicia el servidor.