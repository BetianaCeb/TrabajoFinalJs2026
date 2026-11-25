const formInasist = document.querySelector("#formInasistencia");
const listaInasistencia = document.querySelector("#listaInasistencia");
const inputLegajo = document.querySelector("#leg");
const inputDesde = document.querySelector("#desde");
const inputHasta = document.querySelector("#hasta");
const inputMotivo = document.querySelector("#motivo");
const inputComentario = document.querySelector("#comentario");

let inasist = [];

const mensajeEstado = document.querySelector("#mensajeIngresado");

//--------------------Cargar Datos-------------

function cargarInasistencias() {
    try {
        return JSON.parse(localStorage.getItem("inasist")) || [];
    }
    catch {
        return [];
    }
}
function guardarInasist() {
    localStorage.setItem("inasist", JSON.stringify(inasist));
}
//-----------------------Imprimir Pantalla-----------
function mostrarListaInasistencias(legajoBuscado){
    listaInasistencia.innerHTML = "";

    const inasistenciasDelLegajo = inasist.filter(
        (inas) => inas.legajo === legajoBuscado
    );


    inasistenciasDelLegajo.forEach((inas) => {
        const li = document.createElement("li");
        li.dataset.id = inas.id;  
        li.classList.add("itemInasis");
        li.textContent =
        `Legajo: ${inas.legajo} - Desde: ${inas.desde} - Hasta: ${inas.hasta} -` + `Motivo: ${inas.motivo}  ${inas.comentario}`;
        listaInasistencia.append(li);

    });

}
function mostrarMensaje(texto, esError = false){
    mensajeEstado.textContent = texto;
    mensajeEstado.classList.toggle("error", esError);
}
//-------------------Eventos-----------------------------
formInasist.addEventListener('submit', (e) =>{
    e.preventDefault();
    const legajo = inputLegajo.value.trim();
    const desde = inputDesde.value.trim();
    const hasta = inputHasta.value.trim();
    const motivo = inputMotivo.value.trim();
    const comentario = inputComentario.value.trim();

    if (hasta < desde) {
    mostrarMensaje("La fecha 'Hasta' no puede ser anterior a 'Desde'.", true);
    return;}

    if (!legajo || !desde || !hasta || !motivo) {
        mostrarMensaje("Recordá completar todos los campos.", true);
        return;
    }

    const nuevaInasistencia = {
        id: Date.now(),
        legajo,
        desde,
        hasta,
        motivo,
        comentario
    }

    inasist.push(nuevaInasistencia);
    guardarInasist();

    //Mostrar sólo las inasistencias del legajo
    mostrarListaInasistencias(legajo);

    formInasist.reset();
    mostrarMensaje(`Los datos fueron guardados correctamente!`);

})

formInasist.addEventListener("reset", () => {
    mostrarMensaje("");
});

// Carga el historial en memoria al entrar, pero mantiene la lista oculta en pantalla
inasist = cargarInasistencias();


