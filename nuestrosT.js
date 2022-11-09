//Array con las imagenes del Slider
const imagenSlider = [{
    src: "../img/corteMujer.png",
    alt: "Corte de cabello a mujer",
},
{
    src: "../img/corteHombre.png",
    alt: "Corte de cabello hombre",
},
{
    src: "../img/corteNiño.png",
    alt: "Corte de cabello a niño",
},
{
    src: "../img/haciendoColor.png",
    alt: "Aplicación de tintura ",
},
{
    src: "../img/barberiaYpeinados.png",
    alt: "Barbería y peinados",
},
{
    src: "../img/lavadoRelax.png",
    alt: "Lavado de cabeza relajante",
}
]
//Array vacío para generar la vista
let imagenes = []

//Promesa para simular el llamado a las imágenes
const llamarImg = (res) => {
return new Promise((resolve, reject) => {
    const renderizarImg = (imagenes) => {
        // Función que genera la vista de las imágenes, dentro de una tarjeta
        let tarjeta = document.createElement("img");
        
        for (let imagen of imagenes) {
            tarjeta.setAttribute("src", "");
            src.innerHTML = imagen.src;
            tarjeta.appendChild(src);
    
            tarjeta.setAttribute("alt", "");
            alt.innerHTML = imagen.alt;
            tarjeta.appendChild(alt);
        }
        document.getElementById("mostrarSlider").appendChild(tarjeta);
    }
    setTimeout(() => {
        resolve(imagenSlider)
    }, 1000)
    renderizarImg(imagenes)
})
}



//Con una asincronía se solicitan las imágenes, para cargar la tarjeta
llamarImg()
.then((res) => {
imagenes = res
})









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
                let parrClima3 = document.createElement("p");

                //Ternario para mostrar un texto o el otro, dentro del párrafo creado
                datos.temp > 20 ? parrClima3.innerHTML = "Un día hermoso" : parrClima3.innerHTML = "Salí con un abrigo"

                divClima.appendChild(parrClima3);
            }
            mostrarTemp();
        })
}
datosUrl();