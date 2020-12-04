// ALL CREDITS GO TO: GIGA JACHVADZE

let cWidthIn = document.getElementById('widthIn');
let speed;
let fastSort = document.getElementById('fast');
let fastText = document.getElementById('fastText');
let widthOfPX = document.getElementById('pxwidth');

let minHeight = 1;

let canvas;
let ctx;
let width;
let height;

let startOverBool = false;
let cantSort = false;

let colorStates = {normal: 'black', sorted:'green', sorting:'blue'};
let lines;

let select = document.getElementById('select');

let algorithmstemplate = {name: '', fast: true};
let currentAlgorithms = [{name: 'BUBBLE', fast: true}, {name: 'SELECTION', fast: false}, {name: 'MyOwn', fast: false}];

function main(){
    setUpCanvas();
    setUpSelect();
}

function onSubmit(){
    speed = document.getElementById('speed').value;

    if(!cantSort){
        update();
    }
}

function startOver(){
    startOverBool = true;
    checkIfFast();
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

function setUpSelect(){
    for (let i = 0; i < currentAlgorithms.length; i++) {
        let template = document.createElement('option');
        template.value = i;
        template.innerHTML = currentAlgorithms[i].name;
        select.appendChild(template);
    }
}

function checkIfFast(){
    if(!currentAlgorithms[select.value].fast){
        fastSort.style.display = 'none';
        fastText.style.display = 'none';
    }
    else{
        fastSort.style.display = 'inline-block';
        fastText.style.display = 'inline';
    }
}

function checkPxWidth(){
    if(widthOfPX.value){
        if(width % widthOfPX.value != 0){
            widthOfPX.value -= width % widthOfPX.value;
        }
    }
    else{
        widthOfPX.value = 1;
    }
    if(widthOfPX.value === 0){
        widthOfPX.value = 1;
    }
}

function setUp(){
    // ctx.beginPath();
    cantSort = false;
    lines = {x: [], y: [], color:[]};

    checkPxWidth();

    let y;
    for (let i = 0; i < width / widthOfPX.value; i++) {
        ctx.beginPath();

        y = randomRange(minHeight, height);

        ctx.lineWidth = widthOfPX.value;

        ctx.strokeStyle = colorStates.normal;

        ctx.moveTo(i * widthOfPX.value, height);
        ctx.lineTo(i * widthOfPX.value, height - y);
        lines.x.push(i * widthOfPX.value);
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
        if(currentAlgorithms[select.value].name == 'BUBBLE'){
            bubbleSort();
        }
        else if(currentAlgorithms[select.value].name == 'SELECTION'){
            selectionSort();
        }
        else if(currentAlgorithms[select.value].name == 'MyOwn'){
            MyOwnSort();
        }
    }
}

function reDraw(){
    clearCanvas();

    for (let i = 0; i < lines.x.length; i++) {
        ctx.beginPath();

        ctx.lineWidth = widthOfPX.value;

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

async function selectionSort(){

    cantSort = true;

    for (let i = 0; i < lines.y.length; i++) {
        let min = i;
        for (let j = i + 1; j < lines.y.length; j++) {
            if (lines.y[min] > lines.y[j]) {
                min = j;
            }
            if (startOverBool) {
                break;
            }
        }
        if (min !== i) {
            let tmp = lines.y[i];
            lines.y[i] = lines.y[min];
            lines.y[min] = tmp;
            lines.color[min] = colorStates.sorting;
            lines.color[i] = colorStates.sorted;
            await sleep(speed);
            reDraw();
            lines.color[min] = colorStates.normal;
        }
        else{
            lines.color[i] = colorStates.sorted;
            reDraw();
        }
        if (startOverBool) {
            break;
        }
    }

    console.log(lines);
}

async function MyOwnSort() {
    cantSort = false;
    let s = 128
    for (let l = 0; l < s; l++) {
        let portion = (lines.x.length - 1) / (s - l);
        for (let i = 0; i < portion; i++) {
            for (let j = 0; j < portion; j++) {
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
            lines.color[((lines.x.length - 1) / (16 - i)) - i] = colorStates.sorted;
    
            if(i == (lines.x.length)- 2){
                lines.color[0] = colorStates.sorted;
            }
            await sleep(speed);
            reDraw();
            if (startOverBool) {
                break;
            }
        }
    }
}

//sorting algorithms