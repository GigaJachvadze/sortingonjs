// ALL CREDITS GO TO: GIGA JACHVADZE

let cWidthIn = document.getElementById('widthIn');
let speed;
let fastSort = document.getElementById('fast');

let minHeight = 1;

let canvas;
let ctx;
let width;
let height;

let startOverBool = false;
let cantSort = false;

let colorStates = {normal: 'black', sorted:'green', sorting:'blue'};
let lines;

function main(){
    setUpCanvas();
}

function onSubmit(){
    speed = document.getElementById('speed').value;

    if(!cantSort){
        update();
    }
}

function startOver(){
    startOverBool = true;
    clearCanvas();
    setUp();
}

function setUpCanvas(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    if(cWidthIn.value){
        canvas.width = cWidthIn.value;
    }

    console.log(canvas.width)

    width = canvas.width;
    height = canvas.height;

    setUp();
}

function setUp(){
    // ctx.beginPath();
    cantSort = false;
    lines = {x: [], y: [], color:[]};

    let y;
    for (let i = 0; i < width; i++) {
        ctx.beginPath();

        y = randomRange(minHeight, height);

        ctx.strokeStyle = colorStates.normal;

        ctx.moveTo(i, height);
        ctx.lineTo(i, height - y);
        lines.x.push(i);
        lines.y.push(y);
        lines.color.push(colorStates.normal);

        ctx.stroke();
    }

    // ctx.stroke();

    console.log(lines);
}

function update(){
    startOverBool = false;
    if(!cantSort){
        bubbleSort();
    }
}

function reDraw(){
    clearCanvas();
    
    for (let i = 0; i < lines.x.length; i++) {
        ctx.beginPath();

        ctx.strokeStyle = lines.color[i];

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

//sorting algorithms

async function bubbleSort(){
    
    cantSort = true;

    if(fastSort.checked){
        for (let i = 0; i < lines.x.length - 1; i++) {
            for (let j = 0; j < lines.x.length - i - 1; j++) { 
                if (lines.y[j] > lines.y[j + 1]) 
                {
                    let temp = lines.y[j];
                    lines.y[j] = lines.y[j + 1];
                    lines.y[j + 1] = temp;
                    lines.color[j + 1] = colorStates.sorting;
                    lines.color[j] = colorStates.normal;
                }
                else{
                    lines.color[j] = colorStates.normal;
                }
                if (startOverBool) {
                    break;
                }
                // await sleep(speed);
                // reDraw();
            }
            lines.color[lines.x.length - 1 - i] = colorStates.sorted;
    
            if(i == lines.x.length - 2){
                lines.color[0] = colorStates.sorted;
            }
            await sleep(speed);
            reDraw();
            if (startOverBool) {
                break;
            }
        }
        console.log(lines)
    }
    else{
        for (let i = 0; i < lines.x.length - 1; i++) {
            for (let j = 0; j < lines.x.length - i - 1; j++) { 
                if (lines.y[j] > lines.y[j + 1]) 
                {
                    let temp = lines.y[j];
                    lines.y[j] = lines.y[j + 1];
                    lines.y[j + 1] = temp;
                    lines.color[j + 1] = colorStates.sorting;
                    lines.color[j] = colorStates.normal;
                }
                else{
                    lines.color[j] = colorStates.normal;
                }
                if (startOverBool) {
                    break;
                }
                await sleep(speed);
                reDraw();
            }
            lines.color[lines.x.length - 1 - i] = colorStates.sorted;
    
            if(i == lines.x.length - 2){
                lines.color[0] = colorStates.sorted;
            }
            // await sleep(speed);
            reDraw();
            if (startOverBool) {
                break;
            }
        }
        console.log(lines)
    }
}