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
        fechaCreación:  Date.now()
    }
    list.push(obj)
    MostrarTareas()
    i++;
    //list.reload();
}

var filter = list.filter(item => item.checkbox);

console.log(list);


function MostrarTareas(){

    container. innerHTML = "";
    list.map((item) => {
        const {texto, checkbox, id} = item;
        console.log(item)
        container.innerHTML+= `
        <div>
            <input type="checkbox" class="form-check.input ma-2" onchange="ComprobarCheckbox(${id})">
            <label id="tachar" class="">${texto}</label>
        </div>
        `;
        console.log(checkbox)
    });
    
}

function ComprobarCheckbox(id)
{
    let tachado = document.querySelector("#tachar")
    if (list[id].checkbox == false)
    {
        list[id].checkbox = true
        tachado.style.textDecoration = "line-through";
    } 
    else
    {
        list[id].checkbox = false
        tachado.style.textDecoration = "none";
    }


}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("boton").click();
    }
});


