// ALL CREDITS GO TO: GIGA JACHVADZE

let cWidthIn = document.getElementById('widthIn');
let fastSortInput = document.getElementById('fast');
let randomInput = document.getElementById('random');
let fastText = document.getElementById('fastText');
let widthOfPX = document.getElementById('pxwidth');

let minHeight = 1;

let canvas;
let ctx;
let width;
let height;

let startOverBool = false;
let cantSort = false;

let speed;

let colorStates = {normal: 'black', sorted: 'green', sorting: 'blue', selected: 'red'};
let lines;

let select = document.getElementById('select');

let currentAlgorithms = [{name: 'BUBBLE', fast: true}, {name: 'SELECTION', fast: false}, {name: 'QUIKCSORT', fast: false}, {name: 'MyOwn', fast: false}];

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
    clearState();
    setUp();
}

function setUpCanvas(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    if(cWidthIn.value){
        canvas.width = cWidthIn.value;
    }

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
        fastSortInput.style.display = 'none';
        fastText.style.display = 'none';
    }
    else{
        fastSortInput.style.display = 'inline-block';
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
    
    if (randomInput.checked) {

        ctx.beginPath();

        for (let i = 0; i < width / widthOfPX.value; i++) {
    
            y = randomRange(minHeight, height);
    
            ctx.lineWidth = widthOfPX.value;
    
            ctx.strokeStyle = colorStates.normal;
    
            ctx.moveTo(i * widthOfPX.value, height);
            ctx.lineTo(i * widthOfPX.value, height - y);
            lines.x.push(i * widthOfPX.value);
            lines.y.push(y);
            lines.color.push(colorStates.normal);
        }

        ctx.stroke();
        
    } else {

        ctx.beginPath();

        for (let i = 0; i < width / widthOfPX.value; i++) {
            
            y = (height / (width / widthOfPX.value)) * i;
    
            ctx.lineWidth = widthOfPX.value;
    
            ctx.strokeStyle = colorStates.normal;
    
            ctx.moveTo(i * widthOfPX.value, height);
            ctx.lineTo(i * widthOfPX.value, height - y);
            lines.x.push(i * widthOfPX.value);
            lines.y.push(y);
            lines.color.push(colorStates.normal);
    
        }

        lines = shuffle(lines);

        reDraw();

        ctx.stroke();

    }

    // ctx.stroke();

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
        else if(currentAlgorithms[select.value].name == 'QUIKCSORT'){
            console.log(lines);
            quickSort(lines.y, 0, lines.x.length - 1);
        }
    }
}

function reDraw() {
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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearState() {
    for (let i = 0; i < lines.color.length; i++) {
        lines.color[i] = colorStates.normal;
    }
}

function swap(a, b) {
    let temp = lines.y[a];
    lines.y[a] = lines.y[b];
    lines.y[b] = temp;
    lines.color[a] = colorStates.sorting;
    lines.color[b] = colorStates.sorted;
}

//helper

function randomRange(min, max){
    return Math.floor(Math.random() * max) + min;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function shuffle(array) {
    let currentIndex = array.y.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array.y[currentIndex], array.y[randomIndex]] = [
        array.y[randomIndex], array.y[currentIndex]];
    }

    return array;
}

//helper

window.onLoad = main();

//algorithms

async function bubbleSort(){

    cantSort = true;

    if(fastSortInput.checked){
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

async function quickSort(arr, low, high) {
    cantSort = true;
    if (startOverBool) {
        return;
    }
    if (low < high) {
        let pivotIndex = await partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex, high);
    }

    async function partition(arr, low, high) {
        let pivot = high; 

        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < arr[pivot]) {
                i++;
                lines.color[i]
                swap(i, j);
                await sleep(speed);
                reDraw();
            }
            if (startOverBool) {
                return;
            }
        }

        swap(i + 1, pivot);
        await sleep(speed);
        return (i + 1)
    }
}

//algorithms

//MADE BY: GIGA JACHAVDZE