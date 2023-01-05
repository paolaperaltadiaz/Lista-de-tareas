import { createTask } from "./addTask.js";
import { uniqueDates, orderDates } from "../services/date.js";
import dateElement from "./dateElement.js";


//leer la informacion que tenemos en nustros localStorage
export const displayTasks = () => { // definimos la funcion readTasks
    
    const list = document.querySelector('[data-list]'); // se selecciona la lista a la cual vamos a agregar las tareas que ya tenemos almacenadas
    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; // se toma la informacion que esta almacenada en nuestro localStorage
    const dates = uniqueDates(taskList);
    orderDates(dates);

    dates.forEach( date => {
        const dateMoment = moment(date, 'DD/MM/YYYY');
        list.appendChild(dateElement(date));

        // por ultimo se recorre este arreglo 
        taskList.forEach((task) => { // se recibe como primer parametro la tarea (cada una de los elementos que existe dentro de nuestro arreglo)
            const taskDate = moment(task.dateFormat, 'DD/MM/YYYY');
            const diff = dateMoment.diff(taskDate);
            
            if (diff === 0 ) {

                list.appendChild(createTask(task)); // se le envia esa tarea que tiene un formato de objeto (que tiene tanto la llave value como dateFormak) y lo mandamos a nuestra funcion createTask, que nos va a regresar toda la estructura HTML con clases y todo ya definido y por ultimo lo que hace es irlo agregando a nuestra lista.
            }  
        })
    });
};