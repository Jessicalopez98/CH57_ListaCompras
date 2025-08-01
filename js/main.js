const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones=document.getElementById("alertValidaciones");
const alertValidacionesTexto=document.getElementById("alertValidacionesTexto");
const tablaListaCompras=document.getElementById("tablaListaCompras");
const cuerpoTabla=document.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal1 = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


let cont = 0;
let costoTotal = 0;
let totalProductos = 0;

let datos = new Array();//constructor del objeto para mostrar memoria local



function validarCantidad(){
    if(txtNumber.value==0){
        return false;
    }//validar que tenga info/ sea un num>0

    if(isNaN(txtNumber.value)){
        return false;
    }//tiene que ser un num

    if(Number(txtNumber.value)<=0){
        return false;
    }//Mayor que 0

    return true;

}//validarCantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100;

}//getPrecio


btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true;
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    //name - validar que tenga info min 3 letras
    // num - que sea mayor que 0
    if(txtName.value.length<3){
        txtName.style.border= "medium red solid"
        //mensaje error
        alertValidacionesTexto.innerHTML=
            "<strong> El nombre del producto no es correcto </strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//<3

    if(! validarCantidad()){
        txtNumber.style.border= "medium red solid"
        alertValidacionesTexto.innerHTML +=
        "<strong>La Cantidad no es correcta</strong>"
        alertValidaciones.style.display="block" ;
        isValid = false;
    }//! validarCantidad

    if(isValid){
    cont++;
    let precio = getPrecio();
    let row= `<tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
            </tr>
    `;

    let elemento = {
        "cont" : cont,
        "nombre" : txtName.value,
        "precio" : precio,
    }; //elemento para hacer arreglo

    datos.push(elemento);//sube datos al final del arreglo //metodo rápido conejo igual que pop
    localStorage.setItem("datos", JSON.stringify(datos));//se pasa un objeto a string para ser usado en localStorage

    cuerpoTabla.insertAdjacentHTML("beforeend",row);
    contadorProductos.innerText=cont;
    totalProductos += Number(txtNumber.value);
    productosTotal1.innerText = totalProductos;
    costoTotal += precio * Number(txtNumber.value);
    //costoTotal.toFixeed(2).  forma facil
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                  { style: "currency", currency: "MXN" }).format(costoTotal);

    let resumen = {
        "cont" : cont,
        "totalProductos" : totalProductos,
        "costoTotal" : costoTotal,
    };
    localStorage.setItem("resumen", JSON.stringify(resumen));


    txtName.value = "";
    txtNumber.value = "";//elimina valor insertado despues de ser agregado item
    txtName.focus();
    //Agregar los elementos a la tabla
    }//isValid

});//<3 btn agregar click



