function producto(nombre, imagen, precioUnitario){
    this.nombre = nombre;
    this.imagen = imagen;
    this.unidades = 1;
    this.precioUnitario = precioUnitario; 
    this.precio = precioUnitario * this.unidades; 
}

var Naranja = new producto("Naranja", "frutas/Naranja.jpg", 1.33);
var Pera = new producto("Pera", "frutas/Pera.jpg", 1.99);
var Manzana = new producto("Manzana", "frutas/Manzana.jpg", 2.69);
var Melon = new producto("Melón", "frutas/Melón.jpg", 2.49);
var Fresa = new producto("Fresa", "frutas/Fresa.jpg", 6.50);
var Melocoton = new producto("Melocotón", "frutas/Melocotón.jpg", 1.99);
var Uva = new producto("Uva", "frutas/Uva.jpg", 5.98);
var Limon = new producto("Limón", "frutas/Limón.jpg", 1.90);
var arrayFrutas = new Array(Naranja, Pera, Manzana, Melon, Fresa, Melocoton, Uva, Limon);

var Lechuga = new producto("Lechuga", "verduras/Lechuga.jpg", 3.99);
var Puerro = new producto("Puerro", "verduras/Puerro.jpg", 5.49);
var Tomate = new producto("Tomate", "verduras/Tomate.jpg", 3.55);
var AlubiaRoja = new producto("Alubia roja", "verduras/Alubia roja.jpg", 7.46);
var AlubiaNegra = new producto("Alubia negra", "verduras/Alubia negra.jpg", 11.96);
var Pimiento = new producto("Pimiento italiano", "verduras/Pimiento italiano.jpg", 3.00);
var Cebolla = new producto("Cebolla", "verduras/Cebolla.jpg", 1.75);
var Calabacin = new producto("Calabacín", "verduras/Calabacín.jpg", 1.90);   
var arrayVerduras = new Array(Lechuga, Puerro, Tomate, AlubiaRoja, AlubiaNegra, Pimiento, Cebolla, Calabacin);

const clean = () => {
    try {
        document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
        document.querySelector('main.portada').innerHTML = ''
        document.querySelector('main.portada').innerHTML = `
        <div class="inicio">
            <div class="titulo-portada">Bienvenido a tu frutero online</div>  
            <div class="subtitulo-portada">Utiliza el menú superior de la pantalla para empezar</div>
        </div>
        `
    } catch (error) {  
    } 
}

const frutas = () => {
    try {
        document.querySelector('main.portada').innerHTML = ''
        document.querySelector('main.portada').innerHTML = `
        <div class="frutas">
            <div class="arrastra">Arrastra la imagen del producto para añadirlo al carrito</div>
            <div class="grilla"></div>
        </div>
        ` 
        renderProductos(arrayFrutas);
    } catch (error) {   
    }
} 

const verduras = () => {
    try {
        document.querySelector('main.portada').innerHTML = ''
        document.querySelector('main.portada').innerHTML = `
        <div class="verduras">
            <div class="arrastra">Arrastra la imagen del producto para añadirlo al carrito</div>
            <div class="grilla"> 
        </div>
        ` 
        renderProductos(arrayVerduras);
    } catch (error) {}
}

const imprimirProducto = producto => {
    return `
        <div class="producto" ondragstart="drag(event)">
            <img src="./styles/img/${producto.imagen}" draggable="true" class="img-producto"></img>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio">${producto.precio} €/Kilo<p>
        </div>
            `
}

const renderProductos = Array => {
    for (const producto of Array) {
        document.querySelector('.grilla').innerHTML+= imprimirProducto(producto);
    }   
}

var ArrayCarrito = new Array(); 
var compra = new constructorCarrito(ArrayCarrito, 10);

function constructorCarrito(ArrayCarrito){
    this.ArrayCarrito = ArrayCarrito;
    this.precioTotal = precioTotal(ArrayCarrito);
}

const imprimirProductoCarrito = producto => {
    var indice = ArrayCarrito.indexOf(producto);
    return `
        <div class="producto-carrito producto${indice}">
            <img src="./styles/img/${producto.imagen}" class="img-producto-carrito"></img>
            <p class="nombre-producto-carrito">${producto.nombre}</p>
            <button class="boton-producto" onclick="restar(${indice})">-</button>
            <button class="boton-producto" onclick="sumar(${indice})">+</button>
            <button class="boton-producto" onclick="borrarProducto(${indice})">X</button>
            <p>Kilos: ${producto.unidades}</p>
            <p class="precio-carrito">Precio: ${producto.precio.toFixed(2)} €</p>
        </div>
            `
}

const renderCarrito = props => {
    
    try {
        var carritoVisible = document.querySelector('.carrito');
        carritoVisible = document.body.contains(carritoVisible)
        if(!carritoVisible){
            document.querySelector('main.portada').innerHTML += `    
            <div class="carrito"></div>` 
        }
          
        if(ArrayCarrito.length == 0){
            document.querySelector('.carrito').innerHTML = `
                <button class="cerrarCarrito" onclick="carrito()">X</button>
                <div class="tituloCarrito">Tu carrito</div>    
                <div class="carrito-vacio">Tu carrito está vacío</div>
            `
        }
        else {
            document.querySelector('.carrito').innerHTML = `
                <button class="cerrarCarrito" onclick="carrito()">X</button>
                <div class="tituloCarrito">Tu carrito</div>
                `  
            for (const producto of ArrayCarrito) {
                document.querySelector('.carrito').innerHTML+= imprimirProductoCarrito(producto);
            }
            document.querySelector('.carrito').innerHTML += `
                <div class="menu-carrito">
                    <div class="total-compra">Precio total:    ${compra.precioTotal} €</div>
                    <div class="botones-menu">
                        <button class="boton" onclick="borrarCompra()">Borrar</button>
                        <button class="boton" onclick="pagar()">Pagar</button>
                    </div>
                </div>
             `  
            
        } 
    } catch (error) {}
}

function carrito(){
    var carritoVisible = document.querySelector('.carrito');
    if(document.body.contains(carritoVisible)){
        document.querySelector('main.portada').removeChild(carritoVisible);
    }
    else{
        renderCarrito();
    } 
}

function precioTotal(ArrayCarrito){
    var precio = 0;
    for (const producto of ArrayCarrito) {
        precio = precio + producto.precio;
    }
    return precio.toFixed(2);
}

function sumar(indice){
    var nombreClase = ".producto" + indice;
    ArrayCarrito[indice].unidades++;
    ArrayCarrito[indice].precio = ArrayCarrito[indice].unidades * ArrayCarrito[indice].precioUnitario;
    compra.precioTotal = precioTotal(ArrayCarrito);
    renderCarrito();
}

function restar(indice){
    var nombreClase = ".producto" + indice;
    ArrayCarrito[indice].unidades--;
    ArrayCarrito[indice].precio = ArrayCarrito[indice].unidades * ArrayCarrito[indice].precioUnitario;
    compra.precioTotal = precioTotal(ArrayCarrito);

    if(ArrayCarrito[indice].precio == 0){
        ArrayCarrito.splice(indice, 1);
        document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
    }
    renderCarrito();
}

function borrarProducto(indice){
    actualizarUnidades(ArrayCarrito[indice]);
    ArrayCarrito.splice(indice, 1);
    document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
    renderCarrito();
}

function pagar() {
    for(const producto of ArrayCarrito){
        actualizarUnidades(producto);   
    }
    ArrayCarrito.splice(0, ArrayCarrito.length);
    document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
    document.querySelector('.carrito').innerHTML = `
        <button class="cerrarCarrito" onclick="carrito()">X</button>
        <div class="tituloCarrito">Tu carrito</div>
        <div class="carrito-vacio">Gracias por su compra!!</div>
        `  
}

function borrarCompra(){
    for(const producto of ArrayCarrito){
        actualizarUnidades(producto);   
    }
    ArrayCarrito.splice(0, ArrayCarrito.length);
    document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
    document.querySelector('.carrito').innerHTML = `
        <button class="cerrarCarrito" onclick="carrito()">X</button>
        <div class="tituloCarrito">Tu carrito</div>
        <div class="carrito-vacio">Su carrito está vacío!!</div>
        `  
}

function drag(ev){
    ev.dataTransfer.setData("src", ev.target);
}

function allowDrop(ev){
    ev.preventDefault();
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var esUnaFruta = "frutas";
    var esUnaVerdura = "verduras";
    
    if(data.indexOf(esUnaFruta) > 0){
        for(const producto of arrayFrutas){
            var nombre = reemplazarLetras(producto.nombre);
            var resultado = data.indexOf(nombre);
            if(resultado > 0){
                nombre = reemplazarLetras2(nombre);
                agregarProducto(nombre, esUnaFruta);
            }
        }
    }else{
        for(const producto of arrayVerduras){
            var nombre = reemplazarLetras(producto.nombre);
            var resultado = data.indexOf(nombre);
            if(resultado > 0){
                nombre = reemplazarLetras2(nombre);
                agregarProducto(nombre, esUnaVerdura);
            }
        }
    }
}

function reemplazarLetras(nombre){
    if(nombre.indexOf("ó") > 0){
        var palabra = nombre.replace(/ó/gi, "%C3%B3");
        return palabra;
    }
    if(nombre.indexOf(" ") > 0){
        var palabra = nombre.replace(/ /gi, "%20");
        return palabra;
    }
    if(nombre.indexOf("í") > 0){
        var palabra = nombre.replace(/í/gi, "%C3%AD");
        return palabra;
    }
    return nombre;
}

function reemplazarLetras2(nombre){
    if(nombre.indexOf("%C3%B3") > 0){
        var palabra = nombre.replace(/%C3%B3/gi, "ó");
        return palabra;
    }
    if(nombre.indexOf("%20") > 0){
        var palabra = nombre.replace(/%20/gi, " ");
        return palabra;
    }
    if(nombre.indexOf("%C3%AD") > 0){
        var palabra = nombre.replace(/%C3%AD/gi, "í");
        return palabra;
    }
    return nombre;
}

function agregarProducto(articulo, tipo){
    var encontrado = false;
    var indice = 0;
    for(var i = 0; i < ArrayCarrito.length; i++){
        if(ArrayCarrito[i].nombre == articulo){
            encontrado = true;
            indice = i;
        }
    }
    if(encontrado == true){
        sumar(indice);
    }
    else{
        encontrado = false;
        indice = 0;
        if(tipo == "frutas"){
            do{
                if(arrayFrutas[indice].nombre == articulo){
                    encontrado = true;
                    ArrayCarrito.push(arrayFrutas[indice]);
                    document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
                    ArrayCarrito[ArrayCarrito.length - 1].precio = ArrayCarrito[ArrayCarrito.length - 1].unidades * ArrayCarrito[ArrayCarrito.length - 1].precioUnitario;
                    compra.precioTotal = precioTotal(ArrayCarrito);
                    renderCarrito();
                }
                indice++;
            }while(encontrado == false && indice < arrayFrutas.length);
        }
        else{
            encontrado = false;
            indice = 0;
            do{
                if(arrayVerduras[indice].nombre == articulo){
                    encontrado = true;
                    ArrayCarrito.push(arrayVerduras[indice]);
                    document.querySelector('.menu-carrito').innerHTML = `<div class="nav-list-item menu-carrito" ondrop="drop(event)" ondragover="allowDrop(event)">Carrito (${ArrayCarrito.length})</div>`
                    ArrayCarrito[ArrayCarrito.length - 1].precio = ArrayCarrito[ArrayCarrito.length - 1].unidades * ArrayCarrito[ArrayCarrito.length - 1].precioUnitario;
                    compra.precioTotal = precioTotal(ArrayCarrito);
                    renderCarrito();
                }
                indice++;
            }while(encontrado == false || indice < arrayVerduras.length);
        }
    }
}

function actualizarUnidades(producto){
    producto.unidades = 1;
}