var notaM = document.getElementById('notaMate');
var notaL = document.getElementById('notaLengua');
var notaE = document.getElementById('notaEFSI');
var notas = [notaM, notaL, notaE];
var materias = ['Matematica','Lengua', 'EFSI']


function MostrarNotaMayor() {
    var notaMay = 0;
    var indexNotaMay = [];
    var i = 0;
    const TOPE = notas.length;
    var container = document.getElementById("valki");
    //console.log(nota);
    if(Requerido() == false)
    {
        notas.forEach(n => {
            
            if(notaMay <= parseFloat(n.value))
            {
                notaMay = parseFloat(n.value);
                
            }
        });
        
        for(var i = 0; i < TOPE; i++) 
        {
            //console.log(notaMay)
            if(notaMay == parseFloat(notas[i].value))
            {
                //console.log(notaMay);
                indexNotaMay[i] = i;
            }
        }

        container.innerHTML = `
        <p>La materia en la que mayor nota obtuvo fue:}`
            for(var i = 0; i < indexNotaMay.length; i++) 
            {

            if(indexNotaMay[i] != null)
            {
                console.log(materias[i]);
                container.innerHTML +=
                materias[i] + `, `;
            }
            
            }
        }
        container.innerHTML += `</p>`;
    }

function PromedioNota() {
    var suma = 0;
    var promedio;
    const container = document.getElementById('promedio');
    const TOPE = notas.length;

    if(Requerido() == false)
    {
        console.log(TOPE)
        for (var i = 0; i < TOPE; i++) {
            suma = parseInt(notas[i].value) + suma;
        }
        console.log("suma: " + suma);
        promedio = suma/TOPE;
        console.log("promedio: " + promedio);
        
        if(promedio >= 6)
        {
        container.innerHTML = ` 
        <p>El promedio de tus notas es: <span style="color: green; font-weight: bold;" >${promedio}</span></p>
        `;
            img.src = "aprobo.gif";
        }
        else
        {
            container.innerHTML = ` 
            <p>El promedio de tus notas es:<span style="color: red; font-weight: bold;">${promedio}</span></p>
            `; 
            img.src = "desaprobo.gif";
        }
    }
}


document.addEventListener("keyup", function ValidarNota() {
    notas.forEach(n => {
        if (parseFloat(n.value) < 1 || parseFloat(n.value) > 10) {

            n.style.backgroundColor = "red";
        }
        else if (n.value != ""){
            //console.log(n.value)
            n.style.backgroundColor = "green";
        }

    });
})

function Requerido()
{
    
    if(notaM.value == "" || notaL.value  == "" || notaE.value  == "" )
    {
        console.log("error");
        alert("Tienes que llenar todos los campos");
        return true;
        
    }
    return false;
}