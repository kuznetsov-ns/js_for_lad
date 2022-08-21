const readLineSync = require('readline-sync');

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const mage = {
    maxHealth: 20,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

function selectDifficulty() { // функция выбора сложности
    let input = readLineSync.question('Выберите уровень сложности\n1 - ЛЕГКИЙ\n2 - СРЕДНИЙ\n3 - СЛОЖНЫЙ\n');
    input = Number(input);
    if (input === 1) {
        return 20;
    } else if (input === 2) {
        return 15;
    } else if (input === 3) {
        return 10;
    } else {
        console.log('Ошибка ввода! Выбрано значение по умолчаниию - ЛЕГКИЙ');
        return 20;
    }
}

function randBotTurn(min, max) { // функция рандома
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function botTurn(...arrOfCd) { // рандом абилки для противника
    while (true) {
        let rand = randBotTurn(0, 3);
        if (arrOfCd[rand] % monster.moves[rand].cooldown === 0 || arrOfCd[rand] === 0)
            return rand;     
    }
}

function availableSkillsMage(...cd) { // отображение доступных скиллов для игрока
    console.log('Доступные приёмы:\n');
    console.log('1 - ' + mage.moves[0].name + ' (Phys DMG = ' +
        mage.moves[0].physicalDmg + ', Magic DMG block = ' +
        mage.moves[0].magicArmorPercents + '%)');
    if (cd[0] === 0 || cd[0] % mage.moves[1].cooldown === 0) {
        console.log('2 - ' + mage.moves[1].name +
            ' (Phys DMG = ' + mage.moves[1].physicalDmg + ')');
    } else {
        console.log('2 - ' + mage.moves[1].name + ' (Phys DMG = ' +
            mage.moves[1].physicalDmg + ') в кулдауне ещё ' +
            (4 - (cd[0] % 4)) + ' хода');
    }
    if (cd[1] === 0 || cd[1] % mage.moves[2].cooldown === 0) {
        console.log('3 - ' + mage.moves[2].name + ' (Magic DMG = ' +
            mage.moves[2].magicDmg + ')');
    } else {
        console.log('3 - ' + mage.moves[2].name + ' (Magic DMG = ' +
            mage.moves[2].magicDmg + ') в кулдауне ещё ' +
            (3 - (cd[1] % 3)) + ' хода');
    }
    if (cd[2] === 0 || cd[2] % mage.moves[3].cooldown === 0) {
        console.log('4 - ' + mage.moves[3].name + ' (Phys DMG block = ' +
            mage.moves[3].physicArmorPercents + ', Magic DMG block = ' +
            mage.moves[3].magicArmorPercents + ')');
    } else {
        console.log('4 - ' + mage.moves[3].name + ' (Phys DMG block = ' +
            mage.moves[3].physicArmorPercents + ', Magic DMG block = ' +
            mage.moves[3].magicArmorPercents + ') в кулдауне ещё ' +
            (4 - (cd[2] % 4)) + ' хода');
    }    
}

function overalDMG(physDMG, mgDMG, physArmr, mgArmr) { // формула урона
    let result = physDMG * (1 - physArmr / 100) + mgDMG * (1 - mgArmr / 100);
    return result;
}

function theGame() {
    mage.maxHealth = selectDifficulty(); // выбираем сложность

    let arrOfCdBot = [ 0, 0, 0 ]; // кулдауны для противника
    let arrOfCdPlayer = [ 0, 0, 0 ]; // кулдауны для игрока

    while(mage.maxHealth >= 0 && monster.maxHealth >= 0) { // игра не закончится, пока хп одного из игроков не будет 0 или отрицательным
        //let monsterTurn = botTurn(arrOfCdBot[0], arrOfCdBot[1], arrOfCdBot[2]);
        let monsterTurn = botTurn(...arrOfCdBot);
        if (monsterTurn != 0) {
            if (monsterTurn === 1 && arrOfCdBot[1] % monster.moves[1].cooldown === 0) {
                arrOfCdBot[1]++;
            } else if (monsterTurn === 2 && arrOfCdBot[2] % monster.moves[2].cooldown === 0) {
                arrOfCdBot[2]++;
            }
        } else if (monsterTurn === 0) {
            for (let i = 1; i < 3; i++) {
                if (arrOfCdBot[i] % monster.moves[i].cooldown != 0)
                    arrOfCdBot[i]++;
            }
        }

        console.log(monster.name + ' собирается скастовать ' +
            monster.moves[monsterTurn].name + ' (' + monster.moves[monsterTurn].physicalDmg +
            ' Phys DMG, ' + monster.moves[monsterTurn].magicDmg + ' Magic DMG)');
        console.log('Ваша очередь делать ход!');
        //availableSkillsMage(arrOfCdPlayer[0], arrOfCdPlayer[1], arrOfCdPlayer[2]);
        availableSkillsMage(...arrOfCdPlayer);
        let input;
        while (1) { // делаем корректным инпут числа
            input = readLineSync.question('Выберите приём (число): ');
            input = Number(input);
            if (input < 1 || input > 4 || !(Number(input))) {
                console.log('Введено некорректное значение, повторите попытку');
            } else if (arrOfCdPlayer[input - 2] % mage.moves[input - 1].cooldown != 0 && input != 1) {
                console.log('Выбраный скилл в кулдауне, выберете другой!');
            } else {
                break;
            }
        }

        if (input != 1) {
            if (input === 2 && arrOfCdPlayer[0] % mage.moves[1].cooldown === 0) {
                arrOfCdPlayer[0]++;
                if (arrOfCdPlayer[1] % mage.moves[2].cooldown != 0) {
                    arrOfCdPlayer[1]++;
                }
                if (arrOfCdPlayer[2] % mage.moves[3].cooldown != 0) {
                    arrOfCdPlayer[2]++;
                }
            } else if (input === 3 && arrOfCdPlayer[1] % mage.moves[2].cooldown === 0) {
                arrOfCdPlayer[1]++;
                if (arrOfCdPlayer[0] % mage.moves[1].cooldown != 0) {
                    arrOfCdPlayer[0]++;
                }
                if (arrOfCdPlayer[2] % mage.moves[3].cooldown != 0) {
                    arrOfCdPlayer[2]++;
                }
            } else if (input === 4 && arrOfCdPlayer[2] % mage.moves[3].cooldown === 0) {
                arrOfCdPlayer[2]++;
                if (arrOfCdPlayer[0] % mage.moves[1].cooldown != 0) {
                    arrOfCdPlayer[0]++;
                }
                if (arrOfCdPlayer[1] % mage.moves[2].cooldown != 0) {
                    arrOfCdPlayer[1]++;
                }
            }
        } else if (input === 1) {
            for (let i = 0; i < 3; i++) {
                if (arrOfCdPlayer[i] % mage.moves[i + 1].cooldown != 0) {
                    arrOfCdPlayer[i]++;
                }
            }
        }

        mage.maxHealth = mage.maxHealth - overalDMG(monster.moves[monsterTurn].physicalDmg,
            monster.moves[monsterTurn].magicDmg, mage.moves[input - 1].physicArmorPercents,
            mage.moves[input - 1].magicArmorPercents);
        mage.maxHealth = mage.maxHealth.toFixed(2);
        console.log('Здоровье %s: %d', mage.name, mage.maxHealth);
        monster.maxHealth = monster.maxHealth - overalDMG(mage.moves[input - 1].physicalDmg,
            mage.moves[input - 1].magicDmg, monster.moves[monsterTurn].physicArmorPercents,
            monster.moves[monsterTurn].magicArmorPercents);
        monster.maxHealth = monster.maxHealth.toFixed(2);
        console.log('Здоровье %s: %d', monster.name, monster.maxHealth);  
    }
    console.log("GG WP!");
    if (mage.maxHealth > 0) {
        console.log('Евстафий одолел Лютого!');
    } else {
        console.log('Лютый победил Евстафия!');
    }
}

theGame();
