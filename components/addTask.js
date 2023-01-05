import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask = (evento) => { //Funcion addTask que recibe un evento le cual genera el formulario
    evento.preventDefault(); //
    
    const list = document.querySelector('[data-list]'); // nos trae el elemento en el cual vamos a ir agregando las tareas (lista)
    const input = document.querySelector('[data-form-input]'); // donde el usurio llena con el titulo de la tarea que quiere hacer
    const calendar = document.querySelector("[data-form-date]");// calendario donde se selecciona la fecha
    
    const value = input.value; // aqui se tiene el texto que puso el usuario 
    const date = calendar.value; // se tiene la fecha en un formato 
    const dateFormat = moment(date).format('DD/MM/YYYY'); // se le pone el formato a la fecha 
    
    if (value === '' || date === '') {
        return;
    }

    input.value = ''; // se limpia el input
    calendar.value = ''; // se limpia el calendario

    const complete = false;

    const taskObj = { // se crea una constante que es un objeto, donde se almacena value, dateFormat, complete, id
        value,
        dateFormat,
        complete,
        id: uuid.v4(),
    };

    list.innerHTML = '';  

    const taskList = JSON.parse(localStorage.getItem('tasks')) || []; // constante taskList que es igual a lo que tenga almacenado en localStorage con la llave task
    //lee la informacion que esta almacenada, lo regresa en un formato JSON, para poderlo utilizar se debe pasar por la funcion JSON.parce
    //se le agrega un arreglo vacio poniendo (|| []) para que no de null
    taskList.push(taskObj); // a nuestro taskLisnt le vamos a agregar nuestro taskObj = a la ultima tarea que estamos registrando
    
    localStorage.setItem('tasks', JSON.stringify(taskList)); // volver a almacenar nuestro arreglo de tareas actialuzado / luego con JSON.stringify se convierte a un formato JSON todo String
    
    displayTasks ();
  };
  
  export const createTask = ({ value, dateFormat, complete, id }) => { // funcion createTask que recibe un objeto que a su vez dentro tiene la llave value y dateFormat 
    const task = document.createElement('li'); // se genera un elemento de tipo li
        task.classList.add('card'); // se le grega una class llamada card
    
    const taskContent = document.createElement('div'); // se genera un elemento de tipo div

    const check = checkComplete(id);

    if (complete) {
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    }

    const titleTask = document.createElement('span'); // se genera un elemento de tipo span
    titleTask.classList.add('task'); // a nuestro elemento span le estamos agregando nustra tarea task
    titleTask.innerText = value; // a titleTask se le agrega el valor (texto que escribio el usuario)
    taskContent.appendChild(check); // se le agregan los hijos (el chek box)
    taskContent.appendChild(titleTask); // se le agregan los hijos (el titulo de la tarea)
    
    const dateElement = document.createElement('span'); // se genera un elemento de tipo span
    dateElement.innerHTML = dateFormat; // a ese espan se le agrega el innerHTML con la fecha que estamos recicbiendo como parametro
        
    task.appendChild(taskContent); // agrenagdo hijos 
    task.appendChild(dateElement); // agrenagdo hijos 
    task.appendChild(deleteIcon(id)); // agrenagdo hijos 
    return task; // se retorna la tarea
  };