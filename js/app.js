// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// Clases



// Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    console.log(presupuestoUsuario);
}

