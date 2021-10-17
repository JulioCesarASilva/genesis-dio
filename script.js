

let order = [];
let activeClick = false;

let el = {
    emptyCircle: null,
    level: document.querySelector(".leftPanel .level .num"),
    point: document.querySelector(".leftPanel .point .num")
}

let numbers = {
    level: 1,
    score: 0,
    aux: 0,
    click: 0
}

const game = document.querySelector('.game');

let sortNumber = () => Math.floor(Math.random() * 39);

const createGame = async () => {
    await createVariaveis()
}

const createVariaveis = async () => {
    await createElColors(color.index3)
    await createElColors(color.index2)
    await createElColors(color.index1)
    await order.push(sortNumber())
    await createEmptyCircle();
    // await createStart();

    await functionInit("Iniciar", () => {
        functionAssista();
        functionStart(order, 0);
        upScore();
    })
}

const createEl = (type) => document.createElement(type);

const createElColors = (color) => {
    let circle = createEl("div");
    color.map((item) => {
        let div = createEl("div");
        // div.className = "circle";
        div.style = item;
        div.setAttribute("data-number", numbers.aux)
        div.onclick = (e) => {
            if (!activeClick) return
            // let c = div.style.backgroundColor;
            // div.style.backgroundColor = "#fff"
            let el = e.target.getAttribute("data-number")
            if (order[numbers.click] == +el) {
                numbers.score++;
                upScore();
                if (!order[numbers.click + 1]) {
                    order.push(sortNumber())
                    numbers.level++ & upLevel();
                    functionAssista();

                    setTimeout(() => {
                        functionStart(order, 0);
                    }, 1000)

                } else {
                    numbers.click++;
                    
                }
            } else functionRecomecar();
        }
        numbers.aux++
        circle.appendChild(div);
    })
    circle.className = "circle"
    game.appendChild(circle);
}

const createEmptyCircle = () => {
    el.emptyCircle = createEl("div");
    el.emptyCircle.className = "emptyCircle";
    game.appendChild(el.emptyCircle);
}

const createStart = () => {
    el.emptyCircle.innerHTML = "";
    let start = createEl("div");
    start.className = "start";
    start.innerText = "Iniciar";
    start.onclick = () => {
        functionAssista();
        functionStart(order, 0);
    }
    el.emptyCircle.appendChild(start);
}

const functionStart = (n, i) => {
    let el = document.querySelector(".game [data-number='" + n[i] + "']");
    let color = el.style.backgroundColor
    el.style.backgroundColor = "#fff"
    setTimeout(() => {
        el.style.backgroundColor = color;
        setTimeout(() => {
            if (!!n[i + 1]) {
                functionStart(n, i + 1)
            } else {
                setTimeout(() => {
                    functionSuaVez()
                }, 500)
            }
        }, 500)
    }, 1000)
}

const functionInit = (text, func, color = "") => {
    el.emptyCircle.innerHTML = "";
    let div = createEl("div");
    div.className = "start " + color;
    div.innerText = text;

    if (!!func) {
        div.onclick = func;
    }

    el.emptyCircle.appendChild(div);
}

const functionAssista = () => {
    el.emptyCircle.innerHTML = "";
    game.className = "game"
    activeClick = false
    functionInit("Assista", () => { }, "cornflowerblue")
}

const functionSuaVez = () => {
    el.emptyCircle.innerHTML = "";
    functionInit("Sua vez", () => { }, "green");
    numbers.click = 0;
    game.className = "game active"
    activeClick = true;
}

const functionRecomecar = async () => {
    el.emptyCircle.innerHTML = "";
    order = [];
    numbers.click = 0;
    activeClick = false;
    numbers.level = 1;
    numbers.score = 0;
    await order.push(sortNumber())

    functionInit("Recomecar", () =>
        upScore() & upLevel() & functionInit("Iniciar", () => {
            functionAssista();
            functionStart(order, 0);
        }), "black"
    );

    game.className = "game";
}

const upScore = () => el.point.innerHTML = numbers.score;

const upLevel = () => el.level.innerHTML = numbers.level;

const color = {
    index1: [
        "box-shadow: rgb(255, 0, 0) 5px 0px 20px -10px;transform: rotate(180deg) skew(50deg);background-color: rgb(255, 51, 51);",
        "box-shadow: rgb(255, 170, 0) 5px 0px 20px -10px; transform: rotate(220deg) skew(50deg); background-color: rgb(255, 187, 51);",
        "box-shadow: rgb(170, 255, 0) 5px 0px 20px -10px; transform: rotate(260deg) skew(50deg); background-color: rgb(187, 255, 51);",
        "box-shadow: rgb(0, 255, 0) 5px 0px 20px -10px; transform: rotate(300deg) skew(50deg); background-color: rgb(51, 255, 51);",
        "box-shadow: rgb(0, 255, 170) 5px 0px 20px -10px; transform: rotate(340deg) skew(50deg); background-color: rgb(51, 255, 187);",
        "box-shadow: rgb(0, 170, 255) 5px 0px 20px -10px; transform: rotate(380deg) skew(50deg); background-color: rgb(51, 187, 255);",
        "box-shadow: rgb(0, 0, 255) 5px 0px 20px -10px; transform: rotate(420deg) skew(50deg); background-color: rgb(51, 51, 255);",
        "box-shadow: rgb(170, 0, 255) 5px 0px 20px -10px; transform: rotate(460deg) skew(50deg); background-color: rgb(187, 51, 255);",
        "box-shadow: rgb(255, 0, 170) 5px 0px 20px -10px; transform: rotate(500deg) skew(50deg); background-color: rgb(255, 51, 187);"
    ],
    index2: [
        'box-shadow: rgb(179, 0, 0) 5px 0px 20px -10px; transform: rotate(90deg) skew(60deg); background-color: rgb(230, 0, 0)',
        'box-shadow: rgb(179, 89, 0) 5px 0px 20px -10px; transform: rotate(120deg) skew(60deg); background-color: rgb(230, 115, 0)',
        'box-shadow: rgb(179, 179, 0) 5px 0px 20px -10px; transform: rotate(150deg) skew(60deg); background-color: rgb(230, 230, 0)',
        'box-shadow: rgb(89, 179, 0) 5px 0px 20px -10px; transform: rotate(180deg) skew(60deg); background-color: rgb(115, 230, 0)',
        'box-shadow: rgb(0, 179, 0) 5px 0px 20px -10px; transform: rotate(210deg) skew(60deg); background-color: rgb(0, 230, 0)',
        'box-shadow: rgb(0, 179, 89) 5px 0px 20px -10px; transform: rotate(240deg) skew(60deg); background-color: rgb(0, 230, 115)',
        'box-shadow: rgb(0, 179, 179) 5px 0px 20px -10px; transform: rotate(270deg) skew(60deg); background-color: rgb(0, 230, 230)',
        'box-shadow: rgb(0, 89, 179) 5px 0px 20px -10px; transform: rotate(300deg) skew(60deg); background-color: rgb(0, 115, 230)',
        'box-shadow: rgb(0, 0, 179) 5px 0px 20px -10px; transform: rotate(330deg) skew(60deg); background-color: rgb(0, 0, 230)',
        'box-shadow: rgb(89, 0, 179) 5px 0px 20px -10px; transform: rotate(360deg) skew(60deg); background-color: rgb(115, 0, 230)',
        'box-shadow: rgb(179, 0, 179) 5px 0px 20px -10px; transform: rotate(390deg) skew(60deg); background-color: rgb(230, 0, 230)',
        'box-shadow: rgb(179, 0, 89) 5px 0px 20px -10px; transform: rotate(420deg) skew(60deg); background-color: rgb(230, 0, 115)'
    ],
    index3: [
        "box-shadow: rgb(153, 0, 0) 5px 0px 20px -10px; transform: rotate(0deg) skew(70deg); background-color: rgb(204, 0, 0)",
        "box-shadow: rgb(153, 51, 0) 5px 0px 20px -10px; transform: rotate(20deg) skew(70deg); background-color: rgb(204, 68, 0)",
        "box-shadow: rgb(153, 102, 0) 5px 0px 20px -10px; transform: rotate(40deg) skew(70deg); background-color: rgb(204, 136, 0)",
        "box-shadow: rgb(153, 153, 0) 5px 0px 20px -10px; transform: rotate(60deg) skew(70deg); background-color: rgb(204, 204, 0)",
        "box-shadow: rgb(102, 153, 0) 5px 0px 20px -10px; transform: rotate(80deg) skew(70deg); background-color: rgb(136, 204, 0)",
        "box-shadow: rgb(51, 153, 0) 5px 0px 20px -10px; transform: rotate(100deg) skew(70deg); background-color: rgb(68, 204, 0)",
        "box-shadow: rgb(0, 153, 0) 5px 0px 20px -10px; transform: rotate(120deg) skew(70deg); background-color: rgb(0, 204, 0)",
        "box-shadow: rgb(0, 153, 51) 5px 0px 20px -10px; transform: rotate(140deg) skew(70deg); background-color: rgb(0, 204, 68)",
        "box-shadow: rgb(0, 153, 102) 5px 0px 20px -10px; transform: rotate(160deg) skew(70deg); background-color: rgb(0, 204, 136)",
        "box-shadow: rgb(0, 153, 153) 5px 0px 20px -10px; transform: rotate(180deg) skew(70deg); background-color: rgb(0, 204, 204)",
        "box-shadow: rgb(0, 102, 153) 5px 0px 20px -10px; transform: rotate(200deg) skew(70deg); background-color: rgb(0, 136, 204)",
        "box-shadow: rgb(0, 51, 153) 5px 0px 20px -10px; transform: rotate(220deg) skew(70deg); background-color: rgb(0, 68, 204)",
        "box-shadow: rgb(0, 0, 153) 5px 0px 20px -10px; transform: rotate(240deg) skew(70deg); background-color: rgb(0, 0, 204)",
        "box-shadow: rgb(51, 0, 153) 5px 0px 20px -10px; transform: rotate(260deg) skew(70deg); background-color: rgb(68, 0, 204)",
        "box-shadow: rgb(102, 0, 153) 5px 0px 20px -10px; transform: rotate(280deg) skew(70deg); background-color: rgb(136, 0, 204)",
        "box-shadow: rgb(153, 0, 153) 5px 0px 20px -10px; transform: rotate(300deg) skew(70deg); background-color: rgb(204, 0, 204)",
        "box-shadow: rgb(153, 0, 102) 5px 0px 20px -10px; transform: rotate(320deg) skew(70deg); background-color: rgb(204, 0, 136)",
        "box-shadow: rgb(153, 0, 51) 5px 0px 20px -10px; transform: rotate(340deg) skew(70deg); background-color: rgb(204, 0, 68)"
    ]
}

createGame();