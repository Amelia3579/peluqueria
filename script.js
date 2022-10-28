
//DOM, funciones y metodos
const carroCompras = [];
let totalCarroC;


let conten = document.getElementById("misProd");

function renderizarProds() {
    for (const prod of producto) {
        conten.innerHTML += ` 
            <div class="contenedorPosicion">
                <article class="posicionTarj">  
                    <picture class="posicionTarjImg">
                        <img src=${prod.imagen} alt=${prod.nombre}>
                    </picture>
        
                    <div class="posicionTarjCont">
                        <h2>${prod.nombre}</h2>
                        <p>${prod.codigo}</p>
                        <p>${prod.componentes}</p>
                        <p>$ ${prod.precio}</p>
                        <button id= "bot${prod.codigo}" class="estilosBtn" class="porEncimaBtn">LO QUIERO</button>
                    </div> 
                </article>
            </div>      
        `;
    }


    //Eventos

    producto.forEach((prod) => {
        let btn = document.getElementById(`bot${prod.codigo}`);

        btn.onmouseover = () => {
            btn.className = "estilosSobreBtn";
        };

        btn.onmouseout = () => {
            btn.className = "estilosBtn";
        };

        //evento para cada button
        document.getElementById(`bot${prod.codigo}`).addEventListener("click", function () {
            agregarCarrito(prod);
        });
    });
}
renderizarProds();

function agregarCarrito(prodSelec) {
    carroCompras.push(prodSelec);
    console.table(carroCompras);
    alert("Producto: " + prodSelec.nombre + " fue agregado a tu carro");
    document.getElementById("tBody").innerHTML += `
        <tr>
            <td>${prodSelec.nombre}</td>
            <td>${prodSelec.codigo}</td>
            <td>${prodSelec.componentes}</td>
            <td>${prodSelec.precio}</td>
        </tr>
    `;
    totalCarroC = carroCompras.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    let invTotal = document.getElementById("totalCompra");
    invTotal.innerText = "Tu inversion total es $: " + totalCarroC;
}




//Storage & JSON
//Inputs HTML
/* <input id="username" type="text">
   <input id="password" type="password">
   <input id="email" type="temail"> */

function Cliente (nombre, clave, correo) {
    this.nombre = nombre;
    this.clave = clave;
    this.correo = correo;
}
let clienteTienda;
 
//Tomando el formulario
const formulario = document.getElementById("form");

//Tomando cada imput
const user = document.getElementById("username");
const pass = document.getElementById("password");
const correo = document.getElementById("email");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    //Asignando valor a cada input
    document.getElementById("username").value;
    document.getElementById("password").value;
    document.getElementById("email").value;

    //Cargamos  los valores al objeto Cliente
  const cliente1 = new Cliente("amelia", 1425, "meli_gallegos@yahoo.com.ar");
  //Agregamos los datos en el Array:
  console.log(cliente1)

    //Guardamos los datos en el Storage:
    localStorage.setItem("Cliente", JSON.stringify(cliente1));

    //Recuperando el nombre del localStorage, para validarlo con el formulario de loguin
    const cliente2 = JSON.parse(localStorage.getItem("Cliente"));
    
    
    if (cliente2) {
    clienteTienda = cliente2
    console.log(cliente2.nombre + " ya podés comprar");
    } else {
    console.log("Tenés que ingresar tus datos en el formulario")
    }
})    
  







