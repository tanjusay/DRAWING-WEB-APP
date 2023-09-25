const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearBtn = document.getElementById('clearBtn');

let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 150;

ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = lineWidth.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
}

function draw(e) {
    if (!drawing) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    ctx.stroke();
    [lastX, lastY] = [clientX - canvas.offsetLeft, clientY - canvas.offsetTop];
}


function stopDrawing() {
    drawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add touch events
canvas.addEventListener('touchstart', (e) => {
    startDrawing(e.touches[0]);
});
canvas.addEventListener('touchmove', (e) => {
    draw(e.touches[0]);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// ... (rest of the code)
colorPicker.addEventListener('input', () => {
    ctx.strokeStyle = colorPicker.value;
});

lineWidth.addEventListener('input', () => {
    ctx.lineWidth = lineWidth.value;
});

clearBtn.addEventListener('click', clearCanvas);


