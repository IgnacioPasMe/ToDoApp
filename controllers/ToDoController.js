const ToDoModel = require('../models/ToDoModel'); //Importa el modelo de datos para las tareas.

module.exports.getToDo = async (req, res) => { // efine el controlador para obtener todas las tareas.
    try { //Inicia el bloque para manejar errores.
        const toDo = await ToDoModel.find().sort({ date: 1 }); //Busca todas las tareas en la base de datos y ordena las tareas por fecha de forma ascendente.
        res.status(200).json(toDo); //Envía las tareas encontradas con código de éxito 200.
    } catch (error) { //Captura cualquier error que ocurra.
        res.status(500).json({ message: "Error al obtener las tareas", error: error.message }); //Envía respuesta de error con código 500 e incluye el mensaje de error específico.
    }
};

module.exports.saveToDo = async (req, res) => { //Define el controlador para guardar una nueva tarea.
    try { //Inicia el bloque para manejar errores.
        const { text, date } = req.body; //Extrae el texto y la fecha del cuerpo de la petición.
        
        if (!text) { //Verifica si el texto de la tarea está vacío.
            return res.status(400).json({ message: "El texto de la tarea es requerido" }); //Envía error 400 si no hay texto e incluye el mensaje de error especifico.
        }
        
        const newToDo = await ToDoModel.create({ text, date }); //Crea una nueva tarea en la base de datos y le asigna el texto y la fecha.
        res.status(201).json(newToDo); //Envía la tarea creada con código 201 (creado).
    } catch (error) { //Captura cualquier error que ocurra.
        res.status(500).json({ message: "Error al guardar la tarea", error: error.message });  //Envía respuesta de error con código 500 e incluye el mensaje de error específico.
    }
};

module.exports.updateToDo = async (req, res) => { //Define el controlador para actualizar una tarea.
    try { //Inicia el bloque para manejar errores.
        const { _id, text, date } = req.body; //Extrae el ID, texto y fecha del cuerpo de la petición.
        
        if (!_id || !text) { //Verifica si falta el ID o el texto.
            return res.status(400).json({ message: "ID y texto son requeridos" }); //Envía error 400 si faltan datos requeridos e incluye el mensaje de error específico.
        }

        const updatedToDo = await ToDoModel.findByIdAndUpdate( //Busca y actualiza la tarea por ID.
            _id, //ID de la tarea a actualiza.
            { text, date }, //Nuevos datos de texto y fecha para actualizar.
            { new: true, runValidators: true } //Opciones: devolver documento actualizado y validar datos.
        );

        if (!updatedToDo) { //Verifica si la tarea existe
            return res.status(404).json({ message: "Tarea no encontrada" }); //Si no existe, envía error 404 si no se encuentra la tarea e incluye el mensaje de error específico.
        }

        res.status(200).json(updatedToDo); //Si existe, envía la tarea actualizada con código 200.
    } catch (error) {  //Captura cualquier error que ocurra.
        res.status(500).json({ message: "Error al actualizar la tarea", error: error.message }); //Envía respuesta de error con código 500 e incluye el mensaje de error específico.
    }
};

module.exports.deleteToDo = async (req, res) => { //Define el controlador para eliminar una tarea.
    try { //Inicia el bloque para manejar errores.
        const { _id } = req.body; //Extrae el ID del cuerpo de la petición.
        
        if (!_id) { //Verifica si falta el ID.
            return res.status(400).json({ message: "ID es requerido" }); //Si no existe, envía error 400 e incluye el mensaje de error específico.
        }

        const deletedToDo = await ToDoModel.findByIdAndDelete(_id); //Busca y elimina la tarea por ID.
        
        if (!deletedToDo) { //Verifica si la tarea existía.
            return res.status(404).json({ message: "Tarea no encontrada" }); //Envía error 404 si no se encuentra la tarea e incluye el mensaje de error específico.
        }

        res.status(200).json({ message: "Tarea eliminada correctamente" }); //Envía confirmación de eliminación con código 200 e incluye el mensaje de error específico.
    } catch (error) { //Captura cualquier error que ocurra
        res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });  //Envía respuesta de error con código 500 e incluye el mensaje de error específico.
    }
};