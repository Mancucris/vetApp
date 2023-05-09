// select elements 
let editando;
const inputNombre = document.querySelector("#mascota");                 //name
const inputPropietario = document.querySelector("#propietario");        //propietario
const inputTelefono = document.querySelector("#telefono");              //telefono
const inputFecha = document.querySelector("#fecha");                    //fecha
const inputHora = document.querySelector("#hora");                     //hora
const inputSintomas = document.querySelector("#sintomas");              //sintomas


const formulario = document.querySelector('#nueva-cita');  //input complete
const contenedorCitas = document.querySelector('#citas'); //Where we can see all appoinments






//clases

class Citas{
    constructor(){
        this.citas = [];
    }


    agregarcita(cita){
        this.citas = [...this.citas,cita];
    }


    eliminarCita(id){

        //eliminar cita
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

     
        editarCita(citaactualizada){
            this.citas= this.citas.map(cita => cita.id === citaactualizada.id ? citaactualizada : cita);
        }

}
 




class UI{
  imprimirAlerta(mensaje,tipo){

    //crear div

    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert','d-block','col-12');  //col-12 toma todo el espacio

    //agregar clase al tipo de error.

    if(tipo === 'error'){
        divMensaje.classList.add('alert-danger');
    }else{
        divMensaje.classList.add('alert-success');
    }


//texto
    divMensaje.textContent= mensaje;

    //agregar al dom (agregar al html)/
    document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

 
    setTimeout(() => {
        divMensaje.remove()
    }, 5000);
  }

  imprimirCitas({citas}){

     this.limpiarHtml();


      citas.forEach(cita => {
        const  {propietario,mascota,telefono,fecha,hora,sintomas,id} = cita;

        const divCita = document.createElement('div');
        divCita.classList.add('cita','p-3');
        divCita.dataset.id=id;

        //scripting

        //mascota
        const mascotaparrofo = document.createElement('h4');
        mascotaparrofo.classList.add('card-tittle','font-weight-bolder');
        mascotaparrofo.textContent= mascota;

          


        //propietario
        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML= `
        <span class="font-weight-bolder">Owner: </span> ${propietario};
        `;

           //telefono
           const telefonoParrafo = document.createElement('p');
           telefonoParrafo.innerHTML= `
           <span class="font-weight-bolder">Phone: </span> ${telefono};
           `;

             //fecha
             const fechaParrafo = document.createElement('p');
             fechaParrafo.innerHTML= `
             <span class="font-weight-bolder">Date: </span> ${fecha};
             `;

             //hora
             const horaParrafo = document.createElement('p');
             horaParrafo.innerHTML= `
             <span class="font-weight-bolder">Hour: </span> ${hora};
             `;

                 //sintomas
                 const sintomasParrafo = document.createElement('p');
                 sintomasParrafo.innerHTML= `
                 <span class="font-weight-bolder">Symptoms: </span> ${sintomas};
                 `;


          //boton para elmiminnar citas
          const btnEliminar = document.createElement('button');
          btnEliminar.classList.add('btn','btn-danger','mr-2');
          btnEliminar.innerHTML=`<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
          btnEliminar.onclick= ()=>eliminarCita(id);


         // btn para editar
         const btnEditar = document.createElement('button');
         btnEditar.classList.add('btn', 'btn-info');
         btnEditar.innerHTML=`
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
         <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
       </svg>`;
       btnEditar.onclick= () => cargaEdicion(cita);
    





             //agregar el parrafo en el div
             divCita.appendChild(mascotaparrofo);
             divCita.appendChild(propietarioParrafo);
             divCita.appendChild(telefonoParrafo);
             divCita.appendChild(fechaParrafo);
             divCita.appendChild(horaParrafo);
             divCita.appendChild(sintomasParrafo);
             divCita.appendChild(btnEliminar);
             divCita.appendChild(btnEditar);


             contenedorCitas.appendChild(divCita); 

      }) 
    }



      limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        
      }

  }


  
}


const ui=new UI;
const administrador = new Citas();







//eventListener
myFunction();
function myFunction(){
    inputNombre.addEventListener('change',datoCita);
    inputPropietario.addEventListener('change',datoCita);
    inputTelefono.addEventListener('change',datoCita);
    inputFecha.addEventListener('change',datoCita);
    inputHora.addEventListener('change',datoCita);
    inputSintomas.addEventListener('change',datoCita); // Input : write each letter , change : write when the user change the input.

    formulario.addEventListener('submit',nuevaCita);

}

const citaObj = {  // objeto del cual cada vez que llenemos el codigo se va a ir rellenando.
      propietario:'',
      mascota:'',
      telefono: '',
      fecha:'',
      hora:'',
      sintomas:''
}




//Functions

function datoCita(e){
    citaObj[e.target.name] =e.target.value; // lo ponemos entre corchetes porque queremos acceder a las propiedades del objeto.
}

//validar y agregar unna nueva cita.

function nuevaCita(e){

     e.preventDefault();

     //extraigo la infomarcion.

     const  {propietario,mascota,telefono,fecha,hora,sintomas} = citaObj;

     //validacion 

     if(mascota === "" ||propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === ""){
        ui.imprimirAlerta('All fields are requerid', 'error')

        return; //ponemos return para que no se ejecute la siguiente linea.
       
     }

        if(editando){
            console.log('modo edicion');
            ui.imprimirAlerta('you edit this appoiment');

            administrador.editarCita({...citaObj});

            formulario.querySelector("button[type='submit']").textContent='create appoiment';

            editando=false;
        } else { 
              
        console.log('modo no edicion');
        citaObj.id = Date.now();

        administrador.agregarcita({...citaObj});

        ui.imprimirAlerta('you add appoiment correct');
        }
     

     //reinciar el objeto
     reiniciarObjeto();
 
    //reinicio de formulario
     formulario.reset(); 

     //agregar html de la citas.
     ui.imprimirCitas(administrador);

}



//reiniciar el objeto.
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora='';
    citaObj.sintomas='';
}


//eliminar cita
 
function eliminarCita(id){

    //eliminar cita
    administrador.eliminarCita(id );

    //mostrar mensaje
    ui.imprimirAlerta('you delete the appoinment');


    //ponerlo en el html
    ui.imprimirCitas(administrador);


}

function cargaEdicion(cita){
    const  {propietario,mascota,telefono,fecha,hora,sintomas,id} = cita;

    //llenar inputs
     inputNombre.value = mascota;              
     inputPropietario.value=propietario;  
     inputTelefono.value=telefono;        
     inputFecha.value=fecha;            
     inputHora.value=hora;              
     inputSintomas.value=sintomas;
     

     //llenar el objeto 
     citaObj.mascota= mascota;
     citaObj.propietario=propietario;
     citaObj.telefono=telefono;
     citaObj.fecha=fecha;
     citaObj.hora=hora;
     citaObj.sintomas=sintomas;
     citaObj.id=id;

     editando = true;
     
    //cambiar boton
    formulario.querySelector("button[type='submit']").textContent='Save changes';


}



