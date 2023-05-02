var input = document.querySelector("#texto");
var container = document.querySelector("#container");

var list = [];
var i = 0;

function AgregarTodo(){
    let txt = input.value;
    let obj =
    {
        id: i,
        texto: txt,
        checkbox: false,
        fechaCreación:  Date.now(),
        fecharealización: null
    }
    list.push(obj)
    MostrarTareas()
    i++;
    //list.reload();
}

var filter = list.filter(item => item.checkbox);

console.log(list);


function MostrarTareas(){

    container.innerHTML = "";
    list.map((item) => {
        const {texto, checkbox, id} = item;
        if(checkbox == true)
        container.innerHTML+= `
            <div class="list-group-item d-flex align-items-center border-0 mb-2 rounded li" style="background-color: #f4f6f7;">
                <input type="checkbox" checked class=" form-check-input " onchange="ComprobarCheckbox(${id})">
                <label id="${id}" class="tachado textoTarea">${texto}</label>
                <button id="boton" onclick="Eliminar(${id})" class="btn btn-danger marginado">Eliminar</button>
            </div>
            `;
           
        else
        {
            container.innerHTML+= `
            <div class="list-group-item d-flex align-items-center border-0 mb-2 rounded li" style="background-color: #f4f6f7;">
                <input type="checkbox" class="tachado form-check-input" onchange="ComprobarCheckbox(${id})">
                <label id="${id}" class="textoTarea">${texto}</label>
                <button id="boton" onclick="Eliminar(${id})" class="btn btn-danger marginado">Eliminar</button>
            </div>
            `;
        }
    });
    
}

function ComprobarCheckbox(id)
{
    let tachado = document.getElementById(id)
    console.log(tachado)
    if (list[id].checkbox == true)
    {
        tachado.classList.toggle("tachado");
        list[id].fecharealización = null;
        list[id].checkbox = false;
    } 
    else
    {
        tachado.classList.toggle("tachado");
        list[id].fecharealización = Date.now();
        list[id].checkbox = true;
    }
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("boton").click();
    }
});

function Eliminar(id){
    let nuevaLista = list.filter(todo => todo.id != id);
    list = nuevaLista;
    MostrarTareas();
}

function TiempoMenor(){
    let tiempoMenor = 999999999;
    let indiceAux;
    let tareaMenos;
    let resta;
    let container = document.querySelector("#todorapido")
    for (let i = 0; i < list.length; i++) {
        resta = list[i].fecharealización - list[i].fechaCreación
        if(resta < tiempoMenor & list[i].fecharealización !=null)
        {
            indiceAux=i
            tiempoMenor = resta;
            tareaMenos = list[indiceAux].texto
        }
        container.innerHTML = `La tarea que menos tardaste en realizar fue: ${tareaMenos}`
    }
}