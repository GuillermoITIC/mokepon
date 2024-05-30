let vidasJugador = 3;
let vidasEnemigo = 3;

document.addEventListener('DOMContentLoaded', function() {
    iniciarJuego();
});

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('Seleccionar-ataque');
    let sectionReiniciar = document.getElementById('reiniciar');
    let sectionMensajes = document.getElementById('mensajes');
    let sectionVidas = document.getElementById('vidas');
    let sectionMascotaJugador = document.getElementById('mascota-jugador-info');
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    sectionMensajes.style.display = 'none';
    sectionVidas.style.display = 'none';
    sectionMascotaJugador.style.display = 'none';

    const botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    const botonFuego = document.getElementById('boton-fuego');
    const botonAgua = document.getElementById('boton-agua');
    const botonTierra = document.getElementById('boton-tierra');
    
    botonFuego.addEventListener('click', () => seleccionarAtaqueJugador('Fuego'));
    botonAgua.addEventListener('click', () => seleccionarAtaqueJugador('Agua'));
    botonTierra.addEventListener('click', () => seleccionarAtaqueJugador('Tierra'));
    
    const botonReiniciar = document.getElementById('Reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    let sectionSeleccionarAtaque = document.getElementById('Seleccionar-ataque');
    let sectionMensajes = document.getElementById('mensajes');
    let sectionVidas = document.getElementById('vidas');
    let sectionMascotaJugador = document.getElementById('mascota-jugador-info');
    
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'block';
    sectionMensajes.style.display = 'block';
    sectionVidas.style.display = 'block';
    sectionMascotaJugador.style.display = 'block';
    
    const inputhipodoge = document.getElementById('hipodoge');
    const inputcapipepo = document.getElementById('capipepo');
    const inputratigueya = document.getElementById('ratigueya');
    const spanMascotaJugador = document.getElementById('mascota-jugador');
    
    if (inputhipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge';
    } else if (inputcapipepo.checked) {
        spanMascotaJugador.innerHTML = 'Capipepo';
    } else if (inputratigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona a una mascota');
        sectionSeleccionarMascota.style.display = 'block';
        sectionSeleccionarAtaque.style.display = 'none';
        sectionMensajes.style.display = 'none';
        sectionVidas.style.display = 'none';
        sectionMascotaJugador.style.display = 'none';
        return;
    }
    
    const botonFuego = document.getElementById('boton-fuego');
    const botonAgua = document.getElementById('boton-agua');
    const botonTierra = document.getElementById('boton-tierra');
    
    botonFuego.disabled = false;
    botonAgua.disabled = false;
    botonTierra.disabled = false;
}

function seleccionarAtaqueJugador(ataqueJugador) {
    const ataqueEnemigo = ataqueAleatorioEnemigo();
    mostrarResultado(ataqueJugador, ataqueEnemigo);
    combate(ataqueJugador, ataqueEnemigo);
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    let ataqueEnemigo;
    
    if (ataqueAleatorio === 1) {
        ataqueEnemigo = 'Fuego';
    } else if (ataqueAleatorio === 2) {
        ataqueEnemigo = 'Agua';
    } else if (ataqueAleatorio === 3) {
        ataqueEnemigo = 'Tierra';
    }
    
    return ataqueEnemigo;
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mostrarResultado(ataqueJugador, ataqueEnemigo) {
    const resultado = document.getElementById('mensajes').firstElementChild;
    resultado.innerHTML = `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo}`;
}

function combate(ataqueJugador, ataqueEnemigo) {
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');
   
    if (ataqueEnemigo == ataqueJugador) {
        crearmensaje("EMPATE");
    } else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearmensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearmensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearmensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearmensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarvidas();
}

function crearmensaje(mensaje) {
    const resultado = document.getElementById('mensajes').firstElementChild;
    resultado.textContent = mensaje;
}

function revisarvidas() {
    if (vidasEnemigo == 0) {
        crearmensajefinal('¡Felicitaciones, GANASTE!');
        deshabilitarBotones();
        alert('¡Felicitaciones, GANASTE!'); // Añadir alerta
    } else if (vidasJugador == 0) {
        crearmensajefinal('¡Lo siento, PERDISTE!');
        deshabilitarBotones();
        alert('¡Lo siento, PERDISTE!'); // Añadir alerta
    }
}

function deshabilitarBotones() {
    const botonesAtaque = document.querySelectorAll('#Seleccionar-ataque button');
    botonesAtaque.forEach(boton => {
        boton.disabled = true;
    });
    const botonReiniciar = document.getElementById('Reiniciar');
    botonReiniciar.style.display = 'block';
    botonReiniciar.disabled = false;
}

function reiniciarJuego() {
    location.reload();
}

function crearmensajefinal(resultadofinal) {
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadofinal;
    sectionMensajes.appendChild(parrafo);
    const botonFuego = document.getElementById('boton-fuego');
    const botonAgua = document.getElementById('boton-agua');
    const botonTierra = document.getElementById('boton-tierra');
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}
