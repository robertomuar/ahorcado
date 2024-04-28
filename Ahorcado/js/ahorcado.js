// Palabras a un array.   array SIMPLE.
// Descomponer las palabras en letras. 
// Generar _ como letras haya.
// en un campo input definir evento pulsacion y capturar lo que ha escrito. ( cuidad con la segunda pulsación rápida.)
// Limitar las entradas a solo letras.
// Comparar lo pulsado con la palabra aleatoria.
//    Si se encuentra sustituya los _ por la letra.
//    Si NO se encuentra quitar el .hide que corresponda. ( array de los id que hay que quitando. )
// Si adivina (simplemente contando _) la palabra overlay de que has ganado, quieres jugar otra. 
// La comprobación de que el ultimo id de .hide no lo tenga.

/* 
words = [ "tasa", "mesa" ];

palabra = "casa";
for ( i = 0; i < palabra.length; i++ ) {
    console.log( palabra[ i ] );
}

for ( i = 0; i < words[ 0 ].length; i++ ) {
    console.log( words[ 0 ][ i ] );
}

wordAhorcado = words[ 1 ].split( "" ) ;
wordAhorcado.forEach(element => {
    console.log( element );
});

frase = "En un lugar. de La Manche. de cuto nombre. no quiero acordarme";
palabras = frase.split( "." ) ;
console.log( palabras ); */

/* words = [ [ "mesa", "facil" ], [ "arbol", "facil" ], [ "cereza", "medio" ],[ "movil", "faicl" ] ];

words = {
    faciles : [
        "mesa",
        "arvol"
    ],
    dificiles : [
        "desoxiribonucleico"
    ]
} */

/* nombre = "Ana Maria";
console.log( nombre[ 4 ] );
nombre[ 4 ] = "T";
console.log( nombre );
console.log( nombre[ 4 ] );

nombreTMP = "";
for ( i = 0; i < nombre.length; i++ ) {
    if ( i === 4 ) {
        nombreTMP+= "T";    
    } else {
        nombreTMP+= nombre[ i ];
    }
}
nombre = nombreTMP;
console.log( nombre ); */

// HTML y CSS
// Mayúsculas/Minúsculas y/o tildes
// Listado de letras incorrectas.
// Partidas ganadas / perdidas
// overlay Has ganado / Has perdido ( Si /No ) y eliminar eventos

document.addEventListener("DOMContentLoaded", readyHangMan);


function validarLetras( cadena ) {
    var regex = /^[a-zA-Zá-úÁ-ÚñÑüÜ]+$/;
    return regex.test( cadena );
}


function readyHangMan() {
    const newWordSelected = setNewWordToGuess() 
    setEventInputLetter( newWordSelected );
}

function setNewWordToGuess() {
    const wordSelected = setWordToGuess();
    writeUnderscoreDOM( wordSelected.length );

    return wordSelected;
}

function setEventInputLetter( newWordSelected ) {
    const nodeLetter = document.querySelector( ".letteruser" );
    nodeLetter.addEventListener( "input", function (event) {
        onInputLetterUser( newWordSelected,  event);
    });
}

function removeEventInputLetter() {
    /* const nodeLetter = document.querySelector( ".letteruser" );
    nodeLetter.removeEventListener( "input", function (event) {
        onInputLetterUser( newWordSelected,  event);
    }); */
    const nodeLetter = document.querySelector( ".letteruser" );
    nodeLetter.replaceWith( nodeLetter.cloneNode( true ) );
}

function initializeHangMan() {
    const nodeOverlay = document.querySelector( ".overlay" );
    const newWordSelected = setNewWordToGuess();
    nodeOverlay.remove();
    removeEventInputLetter();
    initialiceHangman();
    setEventInputLetter( newWordSelected );

}

function onInputLetterUser(wordSelected, event) {
    console.log(event.target.value);
    console.log( `wordSelected: ${wordSelected}` );

    const bRightLetter = validarLetras(event.target.value);

    if (bRightLetter) {
        console.log("Letra valida");
        //console.log(words[iWord]);
        let bRightLetterInWord = false;
        for (let i = 0; i < wordSelected.length; i++) {
            if (event.target.value === wordSelected[i]) {
                console.log(`La letra ${event.target.value} se encuentra en la posición: ${i}`);
                const nodesLetterToGuess = document.querySelectorAll(".lettertoguess");
                console.log(nodesLetterToGuess);
                nodesLetterToGuess[i].innerText = event.target.value;
                bRightLetterInWord = true;
                if (isWinner()) {
                    console.log("Has ganado");
                    showPlayAgain( true );
                }
            } else {
                // La letra correspondiente no es correcta.
            }
        }
        if (!bRightLetterInWord) {
            //drawHangman();
            objDrawHangman();
        }
    } else {
        console.log("Letra no valida");
        event.target.value = "";

    }
    emptyInputUser(event.target);
}



function isWinner() {
    const nodesLetterToGuess = document.querySelectorAll(".lettertoguess");

    i = 0;
    array = [];
    nodesLetterToGuess.forEach(element => {
        array[i] = element.innerText;
        i++;
    });

    return !array.includes('_');
}

/* 
Function obsoleta de mostrar las partes del cuerpo.
function drawHangman() {
    let bMade = false;

    partsHangman.forEach(nodePartHangman => {
        console.log("nodePartHangman:", nodePartHangman);
        const nodePart = document.querySelector(nodePartHangman);
        console.log("bMade:" + bMade);
        if (!bMade) {

            if (nodePart.classList.contains("hide")) {
                // Preguntar no el nodePartHangman === partsHangman[ partsHangman.length - 1 ]
                //console.log( "Has muerto" );
                if (nodePartHangman === partsHangman[partsHangman.length - 1]) {
                    console.log("%cHAS MUERTO", "color: blue");
                }
                nodePart.classList.remove("hide");
                bMade = true;
            }
        }
    });
} */


function initialiceHangman() {
    const objPartsHangman = getObjectHangman();
    for (const nodePartHangman in objPartsHangman) {
        const nodePart = document.querySelector(nodePartHangman);
        nodePart.classList.add( "hide" );
    }

}
function getObjectHangman( level ) {
    let objPartsHangman;
    //if (level === "easy" ) {
        objPartsHangman = {
            "#head": {
                "#head": {
                    action: "remove",
                    selector: "hide"
                },
                "#rEyes": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#rEyes": {
                "#rEyes": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#bust": {
                "#bust": {
                    action: "remove",
                    selector: "hide"
                },
                "#armL": {
                    action: "remove",
                    selector: "hide"
                },
                "#armR": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#armL": {
                "#armL": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#armR": {
                "#armR": {
                    action: "remove",
                    selector: "hide"
                },
                "#armL": {
                    action: "add",
                    selector: "red"
                }
            },
            "#legL": {
                "#legL": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#legR": {
                "#legR": {
                    action: "remove",
                    selector: "hide"
                }
            },
            "#xEyes": {
                "#xEyes": {
                    action: "remove",
                    selector: "hide"
                },
                "#rEyes": {
                    action: "add",
                    selector: "hide"
                }
            }
        };
    //}

    return objPartsHangman;
}

function objDrawHangman() {
    
    let bMade = false;
    const objPartsHangman = getObjectHangman( );
    //partsHangman.forEach(nodePartHangman => {
    for (const nodePartHangman in objPartsHangman) {
        console.log("nodePartHangman:", nodePartHangman);
        const nodePart = document.querySelector(nodePartHangman);
        //console.log("bMade:" + bMade);
        if (!bMade) {

            if (nodePart.classList.contains("hide")) {
                // Preguntar no el nodePartHangman === partsHangman[ partsHangman.length - 1 ]
                //console.log( "Has muerto" );
                const bodyParts = Object.keys(objPartsHangman);
                const lastBodyPart = bodyParts[bodyParts.length - 1];
                if (nodePartHangman === lastBodyPart) {
                    console.log("%cHAS MUERTO", "color: blue");
                    showPlayAgain( false );
                    /* console.log("%cHola, esto es un mensaje en color", "color: blue"); */
                }
                console.log ( objPartsHangman[ nodePartHangman ] );
                for (const key in objPartsHangman[ nodePartHangman ] ) {
                    console.log( key );
                    console.log( objPartsHangman[ nodePartHangman ][ key ].action );
                    const nodeKey = document.querySelector( key );
                    console.log ( nodeKey );
                    /* if (objPartsHangman[nodePartHangman][key].action === "remove" ) {
                        nodeKey.classList.remove(objPartsHangman[nodePartHangman][key].selector);
                    } else if (objPartsHangman[nodePartHangman][key].action === "add") {
                        nodeKey.classList.add(objPartsHangman[nodePartHangman][key].selector);
                    } */
                    let action = objPartsHangman[ nodePartHangman ][ key ].action; // add | remove
                    let selector = objPartsHangman[ nodePartHangman ][ key ].selector;
                    nodeKey.classList[ action ]( selector ); // nodekey.classList.toggle( "hide" ); nodekey.classList[ "toggle" ]( "hide" ); 

                }

                
                //console.log( nodePartHangman );
                //nodePart.classList.remove("hide");
                bMade = true;
            }
        }
    }
}

function emptyInputUser(node) {
    setTimeout(() => {
        node.value = "";
    }, 1000);
}

function setWordToGuess() {
    const words = ["tasa", "árbol", "cereza"];
    const iWord = getRandomIntNumber(0, words.length - 1);
    return words[iWord];

}

function writeUnderscoreDOM( lengthWordSelected ) {
    const node = document.querySelector( ".wordselected" );
    node.innerHTML = "";
    for (let i = 0; i < lengthWordSelected; i++) {
        console.log("_ ");
        node.innerHTML += "<span class='lettertoguess'>_</span>";
    }
}

function setWordToGuessOLD(iPositionToChange = null, letterToChange = null) {
    const node = document.querySelector(".wordselected");

    console.log(iWord);
    console.log(words[iWord]);
    node.innerHTML = "";
    for (let i = 0; i < words[iWord].length; i++) {
        if (i === iPositionToChange) {
            node.innerHTML += letterToChange + "&nbsp;";
        } else {
            console.log("_ ");
            node.innerHTML += "_&nbsp;";
        }
    }

    // wordSelected = words[ iWord ].split( "" );
    // console.log( wordSelected );
    // 
    // wordSelected.forEach(element => {
    //     console.log( "_ " );
    //     node.innerHTML+= "_&nbsp;";
    // });
}

function showPlayAgain( bResultMatch ) {
    const textResult = ( bResultMatch ) ? "Has ganado ;)" : "Has perdido ;(";
    const overlayHTML = `<div class='overlay'><div class='overlay__board'><h1>¿Quieres jugar de nuevo?</h1><h2>${textResult}</h2><div class='overlay__responde'><div class='overlay__yes'>Si</div><div class='overlay__no'>No</div></div></div></div>`;

    document.body.insertAdjacentHTML( "beforeend", overlayHTML ); // document.body.innerHTML = overlayHTML + document.body.innerHTML;
    
    const nodeYes = document.querySelector( ".overlay__yes" );
    const nodeNo = document.querySelector( ".overlay__no" );

    nodeYes.addEventListener( "click", initializeHangMan );
    nodeNo.addEventListener( "click", comoqueno );

}

function comoqueno() {
    alert( "¿Estás seguro de que deseas salir?" );
}



