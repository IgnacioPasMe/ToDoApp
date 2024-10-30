
const mongoose = require('mongoose');// Importa la biblioteca mongoose, que es una herramienta para modelar datos en MongoDB.

const todoSchema = new mongoose.Schema({ // Define el esquema para las tareas.
    text: { // Campo para el texto de la tarea.
        type: String, // Define el tipo como String
        required: true // Hace el campo obligatorio
    },
    date: { // Campo para la fecha de la tarea.
        type: Date, // Define el tipo como Date.
        required: false // Hace el campo opcional.
    }
});

module.exports = mongoose.model('Todo', todoSchema); // Exporta el modelo para su uso en la aplicación.