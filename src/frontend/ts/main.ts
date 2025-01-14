var M;

class Main implements EventListenerObject,HttpResponse {
    users: Array<Usuario> = new Array();
    framework: Framework = new Framework();
   
    constructor() {
        var usr1 = new Usuario("mramos", "Matias");
        var usr2 = new Usuario("jlopez", "Juan");


        this.users.push(usr1);
        this.users.push(usr2);

        var obj = { "nombre": "Matias", "edad": 35, "masculino": true };
        //alert(JSON.stringify(obj));

    }
    manejarRespuesta(respuesta: string) {
        var lista: Array<Device> = JSON.parse(respuesta);
        
        var ulDisp = document.getElementById("listaDisp");

        //limpio la pantalla de la consulta anterior
        ulDisp.innerHTML = '';

        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar">`;
            if(disp.state!=2){
                    if(disp.type==0){
                      item+=  '<img src="static/images/lightbulb.png" alt = "" class="circle" >'
                    } else if(disp.type==2) {
                      item+=  '<img src="static/images/bocina.png" alt = "" class="circle" >'                       
                    } else {
                        item+=  '<img src="static/images/window.png" alt = "" class="circle" >'
                    }
                    
                        item+=`<span class="titulo">${disp.name}</span>
                          <p>
                          ${disp.description}
                          </p>
                          <div class="col s12 m4 l8 xl6 ">
                          <p align="right"> 
                          <button id="btnEliminar_${disp.id}">Dar de baja</button>
                          </p>
                          </div>
                          <a href="#!" class="secondary-content">
                          <div class="switch">
                          <label>
                            Off
                            `;
                            if (disp.state==1) {
                                item +=`<input type="checkbox" checked id="ck_${disp.id}">`;
                            } else {
                                item +=`<input type="checkbox" id="ck_${disp.id}" >`;
                            }
                            item += `
                            <span class="lever"></span>
                            On
                          </label>
                        </div>
                          </a>
                        </li>`;
            }
            
            ulDisp.innerHTML += item;
        }
        
        for (var disp of lista) {
            if(disp.state!=2){
            var checkPrender = document.getElementById("ck_" + disp.id);
            var checkEliminar = document.getElementById("btnEliminar_" + disp.id);
            checkPrender.addEventListener("click", this);
            checkEliminar.addEventListener("click", this);
        }
        }
        
    }
    manejarRespuesta2(respuesta: string) {
        var lista: Array<Device> = JSON.parse(respuesta);
        
        var ulDisp = document.getElementById("listaBajas");

        //limpio la pantalla de la consulta anterior
        ulDisp.innerHTML = '';

        for (var disp of lista) {
            var item: string = `<li class="collection-item avatar">`;
            if(disp.state==2){
 
                item+=`<span class="subtitulo">${disp.name}</span>
                <p>
                ${disp.description}
                </p>
                <div class="col s12 m4 l8 xl6 ">
                <p align="left"> 
                <button id="btnAgregar_${disp.id}">Dar de alta</button>
                </p>
                </div>`;

                  item += `</li>`;

          }
            
            ulDisp.innerHTML += item;
        }

        for (var disp of lista) {
            if(disp.state==2){
            var checkAgregar = document.getElementById("btnAgregar_" + disp.id);
            checkAgregar.addEventListener("click", this);
        }
        }

    }

    manejarRespuesta3(respuesta: string) {
        var lista: Array<Device> = JSON.parse(respuesta);

    }
    obtenerDispositivo() {
        this.framework.ejecutarBackEnd("GET", "http://localhost:8000/displaydevices",this);
    }    
    obtenerBajasDispositivo() {
        this.framework.ejecutarBackEnd2("GET", "http://localhost:8000/displaydowndevices",this);
    }    
    bajarDispositivo(ident) {
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/putdowndevices",this,ident);
    }
    subirDispositivo(ident) {
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/putupdevices",this,ident);
    }
    eliminarDispositivo(ident) {
        this.framework.ejecutarBackEnd3("POST", "http://localhost:8000/deletedevices",this,ident);
    }    
    insertarDispositivo(ident) {
        this.framework.ejecutarBackEnd3("POST", "http://localhost:8000/insertdevices",this,ident);
    }
    teclaDispositivo(presiona) {
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/changedevices",this,presiona);
    }

    handleEvent(event) {
        var elemento =<HTMLInputElement> event.target;
        //console.log(elemento)
        if (event.target.id == "btnListar") {
            this.obtenerBajasDispositivo();
            this.obtenerDispositivo();
            for (var user of this.users) {
                
                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }
        } else if (event.target.id == "btnBorrar") {

            var ident = <HTMLInputElement>document.getElementById("nom");
            var identif: string = ident.value;

            if (identif == "") {
                alert("El nombre del dispositivo a borrar no fue ingresado.");  
            } else {

            this.eliminarDispositivo({name: identif});
            this.obtenerBajasDispositivo();
            this.obtenerDispositivo();
            alert("El dispositivo "+ identif +" se borra de la base de datos si existe.");
            for (var user of this.users) {
                
                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }
            }
        } else if (event.target.id == "btnInsertar") {

            var nom = <HTMLInputElement>document.getElementById("nombre");
            var desc = <HTMLInputElement>document.getElementById("descri");
            var tip = <HTMLInputElement>document.getElementById("tipo");

            const randomId = Math.floor(Math.random() * 1000);
            const randomIdString = randomId.toString();
            var identif: string = randomIdString;
            var nombre: string = nom.value;
            var descrip: string = desc.value;
            var estad: string = "0";
            var tipo: string = tip.value;
            if (nombre == "") {
                alert("Falta el nombre del dispositivo a insertar.");  
            } else if (descrip == "") {
                alert("Falta la descripcion del dispositivo a insertar.");  
            } else if (tipo == "") {
                alert("Falta seleccionar el tipo de dispositivo a insertar.");  
            } else {

            this.insertarDispositivo({id: identif, name: nombre, description: descrip, state: estad, type: tipo});
            this.obtenerBajasDispositivo();
            this.obtenerDispositivo();
            alert("El dispositivo "+ nombre +" se inserta en la base de datos.");
            for (var user of this.users) {
                
                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }
            }
        } else if (event.target.id == "btnLogin") {

            var iUser = <HTMLInputElement>document.getElementById("iUser");
            var iPass = <HTMLInputElement>document.getElementById("iPass");
            var username: string = iUser.value;
            var password: string = iPass.value;
            //alert("el nombre de usuario es " + username);
            if (username.length > 3 && password.length>3) {
                
                //iriamos al servidor a consultar si el usuario y la cotraseña son correctas
                var parrafo = document.getElementById("parrafo");
                parrafo.innerHTML = "Espere...";
            } else {
                alert("el nombre de usuario es invalido");
            }
        } else if (elemento.id.startsWith("btnAgregar_")) {
            var id = elemento.id.replace("btnAgregar_", "");
            this.subirDispositivo({id: id});
            this.obtenerBajasDispositivo();
            this.obtenerDispositivo();
            alert("El dispositivo se agrega a la lista de altas.");
        } else if (elemento.id.startsWith("ck_")) {
            //Ir al backend y aviasrle que el elemento cambio de estado
            //TODO armar un objeto json con la clave id y status y llamar al metodo ejecutarBackend
            var id = elemento.id.replace("ck_", "");
            if (elemento.checked) {
                var estado = "Encendido";
                var tecla = 1;
            }else{
                var estado = "Apagado"; 
                var tecla = 0;
            } 

            this.teclaDispositivo({id: id, tecla: tecla});
            alert("El dispositivo cambia de estado a " + estado);
        } else if (elemento.id.startsWith("btnEliminar_")) {
            var id = elemento.id.replace("btnEliminar_", "");
            this.bajarDispositivo({id: id});
            this.obtenerBajasDispositivo();
            this.obtenerDispositivo();
            alert("El dispositivo se elimina de la lista de altas.");
            for (var user of this.users) {

                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }          
        /*}else {
            //TODO cambiar esto, recuperadon de un input de tipo text
            //el nombre  de usuario y el nombre de la persona
            // validando que no sean vacios
            console.log("yendo al back");
            this.framework.ejecutarBackEnd("POST", "http://localhost:8000/device", this, {});*/
           
        }
    }
}


window.addEventListener("load", () => {

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,{});
    var elemsC = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elemsC, {autoClose:true});

    var main: Main = new Main();
    var btnListar: HTMLElement = document.getElementById("btnListar");
    btnListar.addEventListener("click", main);

    var btnBorrar: HTMLElement = document.getElementById("btnBorrar");
    btnBorrar.addEventListener("click", main);

    var btnInsertar: HTMLElement = document.getElementById("btnInsertar");
    btnInsertar.addEventListener("click", main);

    var btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", main);

});
