const {Router} = require("express");  // mporta Router de express, que permite crear rutas modulares y manejarlas de manera organizada.

const { getToDo, saveToDo, updateToDo, deleteToDo } = require("../controllers/ToDoController"); //Importa los controladores,responsables de manejar la lógica para cada operación.

const router = Router();//Se crea una instancia del router que se utilizará para definir las rutas de la API.

//Estas rutas menjan las solicitudes GET y POST para: Obtener, Guardar, Actualizar, Eliminar una tarea.
router.get('/api/todos', getToDo); //Ruta GET para obtener todas las tareas.
router.post('/api/save', saveToDo); //Ruta POST para crear una nueva tarea.
router.post('/api/update', updateToDo); //Ruta POST para actualizar una tarea.
router.post('/api/delete', deleteToDo); //Ruta POST para eliminar una tarea.

module.exports = router; //Exporta el router configurado.
