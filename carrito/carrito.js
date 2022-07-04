const items = document.getElementById("items")
const item = document.getElementById("item")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content

const fragment = document.createDocumentFragment()
let carrito={}

document.addEventListener('DOMContentLoaded', () => {
    fetchData(); //captura de datos
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        listaCarrito()
    }
})
// evento para asociar el botón el el id del producto
items.addEventListener("click", e =>{
    agregarCarrito(e)
})

item.addEventListener("click", e => {
    btnAction(e)
})

finalCompra.addEventListener("click" , e =>{
    btnFinalizar(e)
})


// toma de datos de la api para armar el carrito en el Dom
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data =await res.json()
        pintarCards(data)
    }catch(error){
    }
}
//  agregado de Cards al Dom 
const pintarCards = data => {
     data.forEach(producto =>{
        templateCard.querySelector("h6").textContent = producto.id
       templateCard.querySelector("h5").textContent = producto.nombre
       templateCard.querySelector("p").textContent =producto.precio
       templateCard.querySelector("img").setAttribute ("src", producto.foto) 
       templateCard.querySelector(".btn-dark").dataset.id = producto.id

       const clone = templateCard.cloneNode(true)
       fragment.appendChild(clone)
    
     })
     items.appendChild(fragment)
}

const agregarCarrito = e => {
    if(e.target.classList.contains("btn-dark")){
      e.target.parentElement
      setCarrito(e.target.parentElement)
    }
    e.stopPropagation() // evita que se generen mas eventos del contenedor padre
}
const setCarrito = objeto =>{
    const producto={
        id: objeto.querySelector(".btn-dark"). dataset.id,
        nombre: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1   

    }
     if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad= carrito[producto.id].cantidad+1
     }

    carrito[producto.id]={...producto}// copia de producto
    listaCarrito()
}
// resumen de compra en tabla con valores totales
const listaCarrito = () =>{
    item.innerHTML=""
    Object.values(carrito).forEach(producto => {
          templateCarrito.querySelector("th").textContent = producto.id
          templateCarrito.querySelectorAll("td")[0].textContent = producto.nombre
          templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
          templateCarrito.querySelector(".btn-light").dataset.id = producto.id
          templateCarrito.querySelector(".btn-warning").dataset.id = producto.id
          templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio
          const clone = templateCarrito. cloneNode(true)
          fragment.appendChild(clone)
    })

    item.appendChild(fragment)

    infoFooter()

    localStorage.setItem("carrito",JSON.stringify(carrito))
}

const infoFooter = () => {
    footer.innerHTML = ""
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML= `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc + cantidad * precio,0)
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.querySelector("span").textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    
    const btnVaciar = document.getElementById("vaciar-carrito")
    btnVaciar.addEventListener("click",()=>{
        carrito={}
        listaCarrito()

    })
}
const btnAction = e =>{
    //boton que aumenta cantidades
    if(e.target.classList.contains("btn-light")){
      carrito[e.target.dataset.id]
      const producto = carrito[e.target.dataset.id]
      producto.cantidad ++
      carrito[e.target.dataset.id]={...producto}
      listaCarrito()
    }

    if(e.target.classList.contains("btn-warning")) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad --
        if(producto.cantidad===0){
            delete carrito[e.target.dataset.id]
        }
        listaCarrito()
      }

    e.stopPropagation()
}
 const btnFinalizar = e =>{
    Swal.fire({
        icon: 'success',
        title: 'Pedido Terminado',
        text: 'Un vendedor se pondra en contacto con usted para acordar metodos de pago y entrega', 
      })
      carrito={}
      listaCarrito()
    e.stopPropagation() 
}
