//****CONSUMO DE DATOS DE UNA API Y USO DE TERNARIO PARA MOSTRARLOS****

//Traigo datos de una api del clima
function datosUrl() {
    const temperatura = "https://api.openweathermap.org/data/2.5/weather?lat=-31.4135&lon=-64.1811&appid=7d844701615890ec1180434e81985110&lang=es&units=metric";
    fetch(temperatura)
        .then(info => info.json())
        .then(infoRecib => {
            console.log(infoRecib);
            const datos = infoRecib.main;
            const ciudad = infoRecib.name;

            //Tomo el article "tarjetaClima" para crear una tarjeta y mostrar la info recibida
            let articleClima = document.getElementById("tarjetaClima");

            let tituloClima = document.createElement("h5");
            tituloClima.innerText = "El clima para vos";
            articleClima.appendChild(tituloClima);

            let divClima = document.createElement("div");
            divClima.className = "posicTarjC";
            articleClima.appendChild(divClima);

            let parrClima = document.createElement("p");
            parrClima.innerHTML = `${ciudad}`;
            divClima.appendChild(parrClima);

            //Creo un párrafo para mostrar la temperatura
            let parrClima2 = document.createElement("p");
            parrClima2.innerHTML = `${datos.temp}`;
            divClima.appendChild(parrClima2);

            //Creo otro párrafo cuyo texto acompañará, y estará sujeto a la temperatura recibida
            const mostrarTemp = () => {
                let imgClima = document.createElement("img");

                //Ternario para mostrar un texto o el otro, dentro del párrafo creado
                datos.temp > 20 ? imgClima.setAttribute("src", "../../public/img/diaSoleado.jpg") && imgClima.setAttribute("alt", "mujer en una dia soleado") :
                    imgClima.setAttribute("src", "../../public/img/diaFrioLluvioso") && setAttribute("alt", "mujer en un dia frio y lluvioso")

                articleClima.appendChild(imgClima);
            }
            mostrarTemp();
        })
}
datosUrl();