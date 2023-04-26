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
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0 );
        this.restante = this.presupuesto - gastado; 
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
    
    agregarGastoListado(gastos) {
        
        this.limpiarHTML(); //Elimina el HTML previo

        //Iterar sobre los gastos
        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;

            //Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            // nuevoGasto.setAttribute('data-id', id); // Esto y lo de abajo es lo mismo, se recomienda la ultima
            nuevoGasto.dataset.id = id;

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$${cantidad}</span>`;
            
            //Botón para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = '&times'; //Se agrega con innerHTML porque es una entidad de HTML
            
            nuevoGasto.appendChild(btnBorrar);

            //Agregar el HTML
            gastoListado.appendChild(nuevoGasto);
        });
        
    }

    limpiarHTML() {
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
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

    //Agregar los gastos al HTML
    const {gastos, restante} = presupuesto;
    ui.agregarGastoListado(gastos);

    
    ui.actualizarRestante(restante);

    //Reiniciar el formulario
    formulario.reset();
}
