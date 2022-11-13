//****DOM, FUNCIONES Y METODOS****

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
                        <h5>${prod.nombre}</h5>
                        <p>${prod.codigo}</p>
                        <p>${prod.componentes}</p>
                        <p>$ ${prod.precio}</p>
                        <button id= "bot${prod.codigo}" class="estilosBtn" class="porEncimaBtn">LO QUIERO</button>
                    </div> 
                </article>
            </div>      
        `;
    }


    //****EVENTOS Y LIBRERIA****

    producto.forEach((prod) => {
        let btn = document.getElementById(`bot${prod.codigo}`);

        btn.onmouseover = () => {
            btn.className = "estilosSobreBtn";
        };

        btn.onmouseout = () => {
            btn.className = "estilosBtn";
        };

        //Evento para cada button
        document.getElementById(`bot${prod.codigo}`).addEventListener("click", function () {
            agregarCarrito(prod);

            //Toast para el click de los botones de los productos    
            Toastify({
                text: "TU PRODUCTO SE AGREGO AL CARRITO",
                duration: 1000,
                gravity: "botton",
                radius: "2em",
                style: {
                    background: "rgb(251, 180, 154)",
                    color: "black"
                }
            }).showToast();
        });
    });
}
renderizarProds();

function agregarCarrito(prodSelec) {
    carroCompras.push(prodSelec);
    console.table(carroCompras);
    document.getElementById("tBody").innerHTML += `
        <tr>
            <td>${prodSelec.nombre}</td>
            <td>${prodSelec.codigo}</td>
            <td>${prodSelec.componentes}</td>
            <td>${prodSelec.precio}</td>
            <td><button onclick="borrar(event)">🗑️</button></td>
        </tr>
    `;
    totalCarroC = carroCompras.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    let invTotal = document.getElementById("totalCompra");
    invTotal.innerText = "Tu inversion total es $: " + totalCarroC;
}

//Borrar productos que se seleccionar de la tabla
//Al presionar el cesto de basura de cualquier producto, se pasa los datos del evento
function borrar(ev) {
    console.log(ev);
    //Se identifica quién disparó el evento y que su padre es la fila 
    let fila = ev.target.parentElement.parentElement
    console.log(fila);
    //Luego a esa fila se le toma su segundo hijo, obteniéndose el código
    let codigo = fila.children[1].innerText;
    console.log(codigo);
    //Con el código, se busca ese producto dentro del índice y se guarda
    let indice = carroCompras.findIndex(prod => prod.codigo == codigo);
    console.log(indice);
    //Con ese codigo se borra el producto del carro de compras
    carroCompras.splice(indice, 1);
    console.table(carroCompras);
    //Elimina la línea de la tabla
    fila.remove();
    //Recalcular la inversión total
    let preciosTabla = carroCompras.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    document.getElementById("totalCompra").innerHTML = "Tu inversion total es $: " + preciosTabla;
}



//Botón finalizar compra
const finalizar = document.getElementById("finalComp");

finalizar.onclick = () => {
    if (carroCompras.length == 0) {
        console.log("Tu carro está vacío");
    } else {
        carroCompras.splice(0, carroCompras.length);
        document.getElementById("tBody").innerHTML = "";
        document.getElementById("totalCompra").innerHTML = "Tu inversion total es $: 0";
    }
}


//****VALIDACIONES FORMULARIO****

//Tomo cada imput
let user = document.getElementById("nombre");
let pass = document.getElementById("clave");
let correo = document.getElementById("email");


//Validación campo user para que se ingrese solo letras en minúsculas
user.oninput = () => {
    const recibeNum = /\d/;
    if (recibeNum.test(user.value)) {
        user.style.color = "red";
        console.log("Se admiten solo letras en minúscula");
    } else {
        user.style.color = "black";
        console.log("Bienvenida a tu Tienda de Belleza");
    }
};

//Validación campo pass para que se coloquen sólo números y que sean al menos 6.
pass.onchange = () => {
    if ((pass.value.length < 6) || isNaN(pass.value) == true) {
        pass.style.color = "red";
        console.log("Solo se aceptan caracteres numéricos, y como mínimo que sean 6")
    }
}

//Validación campo correo para que contenga el "@ y un "."
correo.onchange = () => {
    if (/\S+@\S+\.\S+/.test(correo.value) == false) {
        correo.style.color = "red";
        console.log("Revise su dirección de correo")
    }
};
//La 1° validación del botón enviar datos se realiza con el atributo "required" en el HTML


//Tomo el formulario para vaciarlo al ser enviado
const formul = document.getElementById("form");

document.addEventListener("click", function () {
    formul.addEventListener("submit", function () {
        formul.reset();
    });
});


//****STORAGE & JSON****

//Guardo datos de loguin en el Storage y los recupero con JSON para validar/comparar la entrada Nombre
function Cliente(nombre, clave, correo) {
    this.nombre = nombre;
    this.clave = clave;
    this.correo = correo;
}


formul.addEventListener("submit", (e) => {
    e.preventDefault();
    //Asigno valor a cada input
    user = document.getElementById("nombre").value;
    pass = document.getElementById("clave").value;
    correo = document.getElementById("email").value;

    //Cargo  los valores al objeto Cliente
    const cliente1 = new Cliente("amelia", 142583, "meli_gallegos@yahoo.com.ar");

    //Guardo los datos en el Storage:
    localStorage.setItem("Cliente", JSON.stringify(cliente1));
    console.log(cliente1);

    //Recupero la info del localStorage, para hacer la validación con el nombre que se está ingresando  
    let cliente2 = JSON.parse(localStorage.getItem("Cliente"));
    console.log(cliente2);


    if (cliente2.nombre == (document.getElementById("nombre").value)) {
        console.log("Ya podés comprar");
    } else {
        console.log("Tenés que completar todos campos para hacer la compra")
    }
})