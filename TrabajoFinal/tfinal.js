const formAlta = document.querySelector("#formAlta");
const listaEmpleados = document.querySelector("#listaEmpleados");

const mensajeEstado = document.querySelector("#mensajeEstado");
const inputLegajo = document.querySelector("#leg");
const inputNombre = document.querySelector("#nombre");
const inputDomicilio = document.querySelector("#domicilio");
const inputCelular = document.querySelector("#celular");
const inputContacto = document.querySelector("#contacto");
const inputCelContacto = document.querySelector("#celcontacto");

let empleados = [];

//---------------------Cargar Datos------------------------------
function cargarEmpleados() {
try {
  return JSON.parse(localStorage.getItem("empleados")) || [];
} catch {
  return [];
}
}
function guardarEmpleados() {
  localStorage.setItem("empleados", JSON.stringify(empleados));
}

//---------------------Pantalla---------------------------

function mostrarListaEmpleados() {
  listaEmpleados.innerHTML = "";

  empleados.forEach((empleado) => {
    const li = document.createElement("li");
    li.dataset.id = empleado.id;
    li.classList.add("item-empleado");

    //li.textContent =
    
    li.textContent =
      `Legajo ${empleado.leg} - ${empleado.nombre} | ` +
      `Cel: ${empleado.celular} | ` +
      `Emergencia: ${empleado.contacto} (${empleado.celcontacto})` +
      (empleado.domicilio ? ` | Domicilio: ${empleado.domicilio}` : "");

    listaEmpleados.append(li);
  })

}

function mostrarMensaje(texto, esError = false) {
  mensajeEstado.textContent = texto;
  mensajeEstado.classList.toggle("error", esError);
}

//---------------------Eventos----------------------------
formAlta.addEventListener('submit', (e) => {
  e.preventDefault();
  const legajo = inputLegajo.value.trim();
  const nombre = inputNombre.value.trim();
  const domicilio = inputDomicilio.value.trim();
  const celular = inputCelular.value.trim();
  const contacto = inputContacto.value.trim();
  const celContacto = inputCelContacto.value.trim();


  if (!legajo || !nombre || !celular || !contacto) {
    mostrarMensaje("Completá todos los campos obligatorios.", true);
    return;
  } 

  const nuevoEmpleado = {
    id: Date.now(),
    legajo,
    nombre,
    domicilio,
    celular,
    nameContacto: contacto,
    celContacto
  };
  
  empleados.push(nuevoEmpleado);
  guardarEmpleados();
  mostrarListaEmpleados();
  formAlta.reset()

  mostrarMensaje(`¡Los datos de ${nombre} (Legajo ${legajo}) fueron ingresados correctamente!.`);

})

formAlta.addEventListener("reset", () => {
  mostrarMensaje("");
});

empleados = cargarEmpleados();

