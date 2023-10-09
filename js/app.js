let mias = document.querySelectorAll('#mias img');
let rival = document.querySelectorAll('#rival img');
let myTurn = document.getElementById('mias');
let rivalTurn = document.getElementById('rival');
const btnNuevo = document.getElementById('boton');
let index = 23;
let indices;
let indicesMezclados;
let indiceImagen;
let banco;
let turnoRival = false;
let turnoMio = false;
let imagenBanco = document.getElementById('banco');
let imagenSeleccionada = null;
const contadorBanco = document.getElementById('contador');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;  
}

function nuevoJuego(){
    rival.forEach((carta) => {
        carta.classList.remove('hover');	
    });
    mias.forEach((carta) => {
        carta.classList.remove('hover');	
    });
    
    // Crea un arreglo con los índices de las imágenes
    indices = Array.from({ length: 40 }, (_, i) => i);
    // console.log(indices)

    // Mezcla los índices aleatoriamente
    indicesMezclados = shuffleArray(indices);

    // Asigna las imágenes en el orden mezclado
    mias.forEach((carta, index) => {
        indiceImagen = indicesMezclados[index];
        // console.log(index);
        indicesMezclados.splice(index,1);
        carta.src = `../img/${indiceImagen + 1}.jpg`; // Ajusta la ruta según tu estructura de archivos
        carta.alt = `Carta ${indiceImagen + 1}`;
        imagenBanco.style.transform = 'rotateY(180deg)';
        carta.style.transform = 'rotate(0deg)';
    });
};
document.addEventListener('DOMContentLoaded', nuevoJuego())

//iniciar juego
function iniciar(){
    btnNuevo.disabled = true;
    myTurn.classList.add('turno');
    
    rival.forEach((carta) => {
        // console.log(carta);
        carta.classList.add('hover');
        carta.classList.add('girar');	
        setTimeout(function(){
            carta.classList.remove('girar');	
        },1000);
        
    });
    mias.forEach((carta) => {
        carta.classList.add('hover');	
    });
    turnoMio = true;
    rival.forEach((carta, index) => {
        indiceImagen = indicesMezclados[index];
        indicesMezclados.splice(index,1);
        carta.src = `../img/${indiceImagen + 1}.jpg`; // Ajusta la ruta según tu estructura de archivos
        carta.alt = `Carta ${indiceImagen + 1}`;
    });
    contador.innerHTML = 'x' + indicesMezclados.length;
    cambiar(); 
};

function cambiar(){ 
    let turnosMios = 0;
    let turnosRival = 0;

    //turno del rival
    if(turnoRival && !turnoMio){
        myTurn.classList.remove('turno');
        rivalTurn.classList.add('turno');
        mias.forEach((carta) => {
            carta.classList.add('bloqueado');	
        });
        rival.forEach((carta) => {
            carta.classList.remove('bloqueado');  
            carta.addEventListener('click', function(){
                turnosRival++;
                if(turnosRival>1){
                    return false;
                }
                else{
                    // console.log(imagenBanco);
                    carta.classList.add('girarCarta');	
                        setTimeout(function(){
                            // alert(carta.className);
                            carta.classList.remove('girarCarta');	
                        },1000);
                    indiceImagen = indicesMezclados[index];
                    // console.log('indice a eliminar: ' + index)
                    indicesMezclados.splice(index,1);
                    index--;
                    // console.log(indicesMezclados)
                    // console.log(indiceImagen, '', indiceImagen+1);
                    carta.src = `../img/${indiceImagen + 1}.jpg`; // Ajusta la ruta según tu estructura de archivos
                    carta.alt = `Carta ${indiceImagen + 1}`;
                    contador.innerHTML = 'x' + indicesMezclados.length;
                    cambiar();
                }
            });
        });
        turnoRival = false;
        turnoMio = true;
    }
    //turno mio
    else if(!turnoRival && turnoMio){
        myTurn.classList.add('turno');
        rivalTurn.classList.remove('turno');
        rival.forEach((carta) => {
            carta.classList.add('bloqueado');	
        });
        mias.forEach((carta) => {
            carta.classList.remove('bloqueado');
            carta.addEventListener('click', function(){
                turnosMios++;
                if(turnosMios>1){
                    return false;
                }
                else{
                    // console.log(turnoMio + ' ' + turnoRival);
                    carta.classList.add('girarCarta');	
                        setTimeout(function(){
                            // alert(carta.className);
                            carta.classList.remove('girarCarta');	
                        },1000);	
                    indiceImagen = indicesMezclados[index];
                    // console.log('indice a eliminar: ' + index)
                    indicesMezclados.splice(index,1);
                    index--;
                    console.log(indicesMezclados)
                    // console.log(indiceImagen, '', indiceImagen+1);
                    carta.src = `../img/${indiceImagen + 1}.jpg`; // Ajusta la ruta según tu estructura de archivos
                    carta.alt = `Carta ${indiceImagen + 1}`;
                    contador.innerHTML = 'x' + indicesMezclados.length;
                    cambiar();
                }
            });
        });
        turnoMio = false;
        turnoRival = true;
    }
    if(indicesMezclados.length == 0){
        setTimeout(function(){
            alert('Fin del juego');
            location.reload();
        },500);
    }
};


