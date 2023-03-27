var container = document.querySelector("#container");
var input = document.getElementById("texto");

var list = [];

list.push({
    id:1,
    texto:"No hay nada",
    checkbox: false,
    fechaCompletado: new Date,
});

list.push({
    id:2,
    texto:"No hay nada1",
    checkbox: false,
    fechaCompletado: new Date,
});

list.push({
    id:3,
    texto:"No hay nada2",
    checkbox: true,
    fechaCompletado: new Date,
});

function AgregarTodo()
{
    list.push
    {
        
    }
}

/*var filter = list.filter(item => item.checkbox);

console.log(list);

list.map((item) => {
    const {texto, checkbox} = item;
    console.log(item)
    container.innerHTML += `
          <form action="" method="post">
            <fieldset>
                <input type="checkbox" value="${checkbox}">
                <h1>${texto}</h1>
            </fieldset>
        </form>

          </div>
      `;
    console.log(checkbox)
});*/

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("boton").click();
    }
  });