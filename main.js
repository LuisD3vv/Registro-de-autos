"use strict"; // para vernos mas mamones

let autoActual;
let busqueda;

// funcion para formatear el precio con comillas
function agregarComas(valor) {
  return valor.toLocaleString();
}
// es una funcion que se utiliza como contructor
function Auto(marca, modelo, color, anno, precio, titular) {
  // propiedades que identifican a cada instancia del cnstructor auto
  this.marca = marca;
  this.modelo = modelo;
  this.color = color;
  this.anno = anno;
  this.precio = precio;
  this.titular = titular;
}

// Darle un propietario al coche
Auto.prototype.Vender = function (nuevo_titular) {
  this.titular = nuevo_titular;
  alert(`El coche ${this.modelo} tiene un nuevo titular '${nuevo_titular}'`);
};

// mostrar los atributos del auto
Auto.prototype.VerAuto = function () {
  console.log("Marca: ", this.marca);
  console.log("Modelo: ", this.modelo);
  console.log("Color: ", this.color);
  console.log("Año: ", this.anno);
  console.log("titular: ", this.titular);
};

// encender el motor
Auto.prototype.Encender = function () {
  alert(`El ${this.modelo} Esta en marcha`);
};

// instancias de la clase o constructor Auto

// forma larga y anticuada
//let suburban = Object.create(buggati.prototype("Chevrolet","Suburban","Plateado",2025));

// cada elemento dentro de instancias s un objeto
let instancias = [];

function actualizarDatos(nombreAuto) {
  // find regresa la primer parametro que es true y undefined en cualquier otro caso
  busqueda = instancias.find((Auto) => Auto.modelo === nombreAuto);
  document.querySelector(".automarca").textContent = busqueda.marca;
  document.querySelector(".automodelo").textContent = busqueda.modelo;
  document.querySelector(".autocolor").textContent = busqueda.color;
  document.querySelector(".autoanno").textContent = busqueda.anno;
  document.querySelector(".autoprop").textContent = busqueda.titular;
  document.querySelector(".autoprecio").textContent =
    "$" + agregarComas(busqueda.precio);
  autoActual = busqueda;
    document.querySelector('.eleccion_auto_actual').textContent = busqueda.modelo;
  console.log(busqueda);
}

let titular_nuevo = document.querySelector("#nuevo_titular");
titular_nuevo.addEventListener("click", () => {
  let contenido = document.querySelector("#propietario").value;
  if (!contenido) {
    alert("Ingresa el nuevo titular.");
    return;
  }
  autoActual.Vender(contenido);
});

let activarEncender = document.querySelector("#encender");
activarEncender.addEventListener("click", () => {
  if (!autoActual) {
    alert("no se ha seleccionado ningun auto.");
    return;
  }
  autoActual.Encender();
});

function cargarAutos() {
  // Se agregarar los elementos disponibles al cargare el documento
  let elementodetails = document.querySelector(".centrar");
  for (let i = 0; i < instancias.length; i++) {
    let boton = document.createElement("BUTTON");
    boton.setAttribute("class", "caracteristicaAuto");
    boton.textContent = instancias[i].modelo;
    elementodetails.appendChild(boton);
  }
  // modificar todos los atributos segun el coche
  document.querySelectorAll(".caracteristicaAuto").forEach((e) => {
    e.addEventListener("click", () => {
      actualizarDatos(e.textContent);
    });
  });
}

function verificarCreacion() {
    let elementodetails = document.querySelector(".centrar");
    for (let i = 0; i < instancias.length; i++) {
        const modeloActual = instancias[i].modelo
        const existentes = document.querySelectorAll(".caracteristicaAuto")

        // primero se busca si existe con un una bandera logica
        let existe = false;
        existentes.forEach((e)=>{
            if(e.textContent == modeloActual) {
                existe = true;
            }
        })

        // luego si no existe se crea, asi separamos las logicas.
        if (!existe) {
            let btn = document.createElement("BUTTON");
            btn.setAttribute("class", "caracteristicaAuto");
            btn.textContent = instancias[i].modelo;
            elementodetails.appendChild(btn);
            }
        else {
            console.log("Este auto ya esta cargado");
        }
    }
    document.querySelectorAll(".caracteristicaAuto").forEach((e) => {
    e.addEventListener("click", () => {
      actualizarDatos(e.textContent);
    });
  });
}

const dialog = document.querySelector("#miDialog");
const abrirDialog = document.querySelector("#verAuto");
const cerrarDIalog = document.querySelector("#CerrarDlg");
const MostrarAutos = document.querySelector(".mostrarLosAutos");
function verTodos() {
for (let i = 0; i < instancias.length; i++) {
    let elementoli = document.createElement("p");
    elementoli.setAttribute("class", "mostrarLosAutos_campo");
    elementoli.textContent =
    instancias[i].marca +
    " " +
    instancias[i].modelo +
    " " +
    instancias[i].color +
    " " +
    instancias[i].anno +
    " " +
    instancias[i].titular;
    MostrarAutos.appendChild(elementoli);
}
}
let llamada = false;
abrirDialog.addEventListener("click", () => {
    dialog.style.display = "flex";
    if (!llamada) {
    verTodos();
    llamada = true;
    }
});
cerrarDIalog.addEventListener("click", () => {
  dialog.style.display = "none";
});

function extraerDato(entrada) {
  return entrada.value;
}

function agregarAuto() {
  // funcion para agregar nuevos autos al putisimo arreglo
  let nombreAuto = document.querySelector("#cname");
  let modelo = document.querySelector("#cmodel");
  let color = document.querySelector("#cColor");
  let fechaLanzamiento = document.querySelector("#cdate");
  let precio = document.querySelector("#cprice");
  let tieneDuenno = document.querySelector("#cprop");

  if (
    !extraerDato(nombreAuto) ||
    !extraerDato(modelo) ||
    !extraerDato(color) ||
    !extraerDato(fechaLanzamiento) ||
    !extraerDato(precio) ||
    !extraerDato(tieneDuenno)
  ) {
    alert("Los campos no deben estar vacios.");
    let elemento_campos = document.querySelectorAll('.campo_newcar'); 
    elemento_campos.forEach((valor)=>{
    let alerta = document.createElement("P");
    alerta.setAttribute("class","campo_newcar_alerta");
    alerta.textContent = "Campo Necesario";  
    valor.after(alerta);
    setTimeout(() => {
    alerta.remove();
    }, 4500);
    });
    
    return;
  } else {
    let precioComas = extraerDato(precio); 
    let nuevo = new Auto(
      extraerDato(nombreAuto),
      extraerDato(modelo),
      extraerDato(color),
      extraerDato(fechaLanzamiento),
      agregarComas(precioComas),
      extraerDato(tieneDuenno)
    );
    if (nuevo instanceof Auto) {
      console.log("Se creo correctamente.");
      instancias.push(nuevo);
      alert(`Nuevo coche agregado ${extraerDato(nombreAuto)}`);
      verificarCreacion();
    }
  }
}

document.querySelector(".autos").addEventListener("click", () => {
  cargarAutos();
},{once:true});

let enviar_mensaje = 0;
let actualizarListacoches = document.querySelector(".autos");
actualizarListacoches.addEventListener("click", () => {
    if (instancias.length == 0 && enviar_mensaje == 0){   
      alert("No hay ningun coche disponible, considera agregar algunos o actualiza la pagina.");
     }
     enviar_mensaje +=1;
});

let autodialog = document.querySelector("#carroNuevo");
let dialogAbrirDialogAuto = document.querySelector("#abrirdialogauto").addEventListener("click", () => {
  autodialog.style.display = "flex";
    document.querySelectorAll("input").forEach((e) => {
      if (e) {
        e.value = "";
      }
    });
  });
document.querySelector("#cerrardialognuevo").addEventListener("click", () => {
  autodialog.style.display = "none";
});
