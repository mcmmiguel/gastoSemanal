// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}


// Clases
class Presupuesto {
    constructor (presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante    = Number(presupuesto);
        this.gastos      = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
    
    }
};

class UI {

    insertarPresupuesto(cantidad){
        //Extrayendo los valores del objeto
        const {presupuesto, restante} = cantidad;

        //Agregarlos al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    imprimirAlerta(mensaje, tipo){
        //Crear el div 
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divAlerta.classList.add('alert-danger');
        } else {
            divAlerta.classList.add('alert-success');
        }

        //Mensaje de Error
        divAlerta.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector('.primario').insertBefore(divAlerta, formulario);

        //Eliminar alerta después de 3 seg
        setTimeout(() => {
            divAlerta.remove();
        }, 3000);

    }
};

const ui = new UI();
let presupuesto;



// Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }

    //Presupuesto válido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}


// Añade gastos
function agregarGasto(e){
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value); //Convierte la cantidad a num desde que se ingresa

    //Validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;

    } else if( cantidad <= 0 || isNaN( cantidad )){
        ui.imprimirAlerta('Ingrese una cantidad válida', 'error');
        return;

    }

    //Generar un objeto con el gasto
    const gasto = {
        nombre, //nombre: nombre;
        cantidad, //cantidad: cantidad;
        id: Date.now(),
    };

    //Añade nuevo gasto
    presupuesto.nuevoGasto(gasto);
    ui.imprimirAlerta('Agregado correctamente'); //Se puede omitir el arguemento del tipo de mensaje

    //Reiniciar el formulario
    formulario.reset();
}