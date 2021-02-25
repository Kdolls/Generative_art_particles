// creating canvas

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const edge = 180;

// creating a brush for drawing
let drawing = false;
// mouse interactions
const mouse = {
    x: null,
    y: null

}
// capture mouse movements
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse.x);

})


// creating paritcles

class Root {
    constructor (x, y, color, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;    
    }

    // rendering the particles

    draw() {
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        this.x += this.speedX;
        this.y += this.speedY;

        // algorithm to calculate the distace between 2 points
        const distanceX =  this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // defining the size/thickness of the particles
        const radius = (-distance / edge + 1) * edge / 6;

        // drawing the particles

        if(radius > 0){
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();

        }

    }
}
// the direction of particles branching out


function branchOut (){
    if(drawing){
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 50 ; i++) {
            const root = new Root(mouse.x, mouse.y, 'black', centerX, centerY);
            root.draw();
            
        }

    }
    

}
// if user resizes the window


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// mouse trail effect
// change the values of fillStyle and fillRect to toggle betw. static and clear

window.addEventListener('mousemove', function(){
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
})


// eventlisteners for the brush strokes

window.addEventListener('mousedown',function(){
    drawing = true; 
});


window.addEventListener('mouseup',function(){
    drawing = false;
    
});

