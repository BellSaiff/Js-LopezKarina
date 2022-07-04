
function obtenerArchivo(){
    const URLJSON="/alquiler/fetch.json";
    //agrego un boton 
    document.querySelector("#disponibles").innerHTML='<button id="mostrarDisponibles"class="btn btn-light">IMPRESORAS</button>';
    //evento para el boton
    document.querySelector("#mostrarDisponibles").onclick=()=>{
        fetch(URLJSON)
            .then((respuesta)=>respuesta.json())
            .then((data)=>{
                let misDisponibles=data.alquileres;
                for(const equipos of misDisponibles){
                    document.querySelector("#disponibles").innerHTML+=`
                        <h3>${equipos.modelo}</h3>
                        <p>${equipos.caracteristicas}</p>
                        <p>${equipos.tecnologia}</p>
                        <p>${equipos.velocidad}</p>
                        <p>${equipos.extras}</p>
                        <img src=${equipos.image} width="400px" ></img>
                    `
                }
            })
            .catch((error)=>{
                console.log("Error: "+error);
            });
    }
}

obtenerArchivo();