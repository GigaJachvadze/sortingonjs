// ALL CREDITS GO TO: GIGA JACHVADZE

let speed;

let minHeight = 1;

let canvas;
let ctx;
let width;
let height;

let startOverBool = false;

let lines;

function main(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    setUp();
}

function onSubmit(){
    speed = document.getElementById('speed').value
    console.log(speed)


    update();
}

function startOver(){
    startOverBool = true;
    clearCanvas();
    setUp();
}

function setUp(){
    // ctx.beginPath();

    lines = {x: [], y: []};

    let y;
    for (let i = 0; i < width; i++) {
        ctx.beginPath();

        y = randomRange(minHeight, height);

        ctx.moveTo(i, height);
        ctx.lineTo(i, height - y);
        lines.x.push(i);
        lines.y.push(y);

        ctx.stroke();
    }

    // ctx.stroke();

    console.log(lines);
}

async function update(){
    startOverBool = false;

    for (let i = 0; i < lines.x.length - 1; i++) {
        for (let j = 0; j < lines.x.length - i - 1; j++) { 
            if (lines.y[j] > lines.y[j + 1]) 
            {
                let temp = lines.y[j];
                lines.y[j] = lines.y[j + 1];
                lines.y[j + 1] = temp
            }
        }
        if (startOverBool) {
            break;
        }
        await sleep(speed);
        reDraw();
    }

    console.log(lines)
}

function reDraw(){
    clearCanvas();
    
    for (let i = 0; i < lines.y.length; i++) {
        ctx.beginPath();

        ctx.moveTo(lines.x[i], height);
        ctx.lineTo(lines.x[i], height - lines.y[i]);

        ctx.stroke();
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function randomRange(min, max){
    return Math.floor(Math.random() * max) + min;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

window.onLoad = main();

//MADE BY: GIGA JACHAVDZE