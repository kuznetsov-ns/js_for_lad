const readLineSync = require('readline-sync');

function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function theGame() {
    let tries = 10;
    let num = getRand(100, 999999);
    num = String(num);
    console.log("*DEV*", num);
    console.log('Введите %d цифр, у вас есть %d попыток!\n', num.length, tries);
    while (tries > 0) {        
        let numOutOfPlace = 0, numInPlace = 0;
        let arrInPlace = new Array();
        let arrOutOfPlace = new Array();        
        let turn = readLineSync.question("Введите цифры без пробелов: ");
        turn = String(turn);
        if (turn.length != num.length) {
            console.log("Введено некоректное кол-во чисел!\n");
        } else {
            for (let i = 0; i < num.length; i++) {
                if (turn[i] === num[i]) {
                    numInPlace++;
                    arrInPlace.push(turn[i]);
                } else {
                    for (let j = 0; j < num.length; j++) {
                        if (turn[i] === num[j]) {
                            numOutOfPlace++;
                            arrOutOfPlace.push(turn[j]);
                            break;
                        }
                    }        
                }    
            }
            console.log('Чисел совпало на своих местах - ' + numInPlace + '(' +
            arrInPlace + '), ' + 'не на своих местах - ' + numOutOfPlace + 
            '(' + arrOutOfPlace + ')\n');
            if (numInPlace === num.length)
                break;
    }
        tries--;
        console.log('Осталось попыток - ' + tries);
    }
    console.log('GG!');
}

theGame();
