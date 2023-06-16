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
                          <button id="btnEliminar_${disp.id}">Eliminar</button>
                          </p>
                          </div>
                          <a href="#!" class="secondary-content">
                          <div class="switch">
                          <label>
                            Off
                            `;
                            if (disp.state==0) {
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
    obtenerDispositivo() {
        this.framework.ejecutarBackEnd("GET", "http://localhost:8000/displaydevices",this);
    }    
    /*actualizarDispositivo() {
        this.framework.ejecutarBackEnd("POST", "http://localhost:8000/updatedevices",this);
    }*/

    handleEvent(event) {
        var elemento =<HTMLInputElement> event.target;
        //console.log(elemento)
        if (event.target.id == "btnListar") {
            this.obtenerDispositivo();
            for (var user of this.users) {
                
                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }
        } else if (event.target.id == "btnLogin") {

            var iUser = <HTMLInputElement>document.getElementById("iUser");
            var iPass = <HTMLInputElement>document.getElementById("iPass");
            var username: string = iUser.value;
            var password: string = iPass.value;

            if (username.length > 3 && password.length>3) {
                
                //iriamos al servidor a consultar si el usuario y la cotraseña son correctas
                var parrafo = document.getElementById("parrafo");
                parrafo.innerHTML = "Espere...";
            } else {
                alert("el nombre de usuario es invalido");
            }
        } else if (event.target.id == "btnAgregar") {
            alert("El dispositivo se agrega");
        } else if (elemento.id.startsWith("ck_")) {
            //Ir al backend y aviasrle que el elemento cambio de estado
            //TODO armar un objeto json con la clave id y status y llamar al metodo ejecutarBackend
           
            alert("El elemento " + elemento.id + " cambia de estado a =" + elemento.checked);
        } else if (elemento.id.startsWith("btnEliminar_")) {
            alert("El dispositivo "+ elemento.id +" se elimina");
            var id = elemento.id.replace("btnEliminar_", "");
            this.framework.ejecutarBackEnd("POST", "http://localhost:8000/updatedevices",this,{id: id});
            //this.actualizarDispositivo();
            for (var user of this.users) {

                //TODO cambiar ESTO por mostrar estos datos separados por "-" 
                //en un parrafo "etiqueta de tipo <p>"
              
            }          
        }else {
            //TODO cambiar esto, recuperadon de un input de tipo text
            //el nombre  de usuario y el nombre de la persona
            // validando que no sean vacios
            console.log("yendo al back");
            this.framework.ejecutarBackEnd("POST", "http://localhost:8000/device", this, {});
           
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

    var btnAgregar: HTMLElement = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", main);

    var btnLogin = document.getElementById("btnLogin");
    btnLogin.addEventListener("click", main);

});
