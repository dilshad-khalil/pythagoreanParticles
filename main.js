const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

//getting window width and window height
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = Math.floor(Math.random() * 250);

let color = `hsl(${hue} , 100% , 50%)`;

const particlesArray = [];
const Particles = [];

const Mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('click', function(event) {
    Mouse.x = event.x;
    Mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new clickParticles());
    }
})

class clickParticles {
    constructor() {
        this.x = Mouse.x;
        this.y = Mouse.y;
        this.radius = Math.random() * 2 + 1;
        this.dx = Math.random() * 0.5 - 0.25;
        this.dy = Math.random() * 0.5 - 0.25;

    }

    draw() {
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // if (this.y > winHeight - this.radius || this.y < this.radius) {


        //     //when the statement becomes true the function pops the new particles

        // }

        // if (this.x > winWidth - this.radius || this.x < this.radius) {

        // }
    }
}

function onClickParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
        // uncomment if you don't wnat the new particles to connect with the old one
        // for (let j = i; j < Particles.length; j++) {
        //     const dx = Particles[i].x - Particles[j].x;
        //     const dy = Particles[i].y - Particles[j].y;

        //     const distance = Math.sqrt(dx * dx + dy * dy);

        //     if (distance < 100) {
        //         c.beginPath();
        //         c.strokeStyle = color;
        //         c.lineWidth = Particles[i].radius / 8;
        //         c.moveTo(Particles[i].x, Particles[i].y);
        //         c.lineTo(Particles[j].x, Particles[j].y);

        //         c.stroke();
        //     }
        // }
    }
}


//a class to handle the particle drawing and updating them
class particles {
    constructor() {
        this.radius = Math.random() * 2 + 1;
        this.x = Math.random() * (winWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (winHeight - this.radius * 2) + this.radius;
        this.dx = Math.random() * 1 - 0.5;
        this.dy = Math.random() * 1 - 0.5;
    }

    draw() {
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();

    }


    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.y > winHeight - this.radius || this.y < this.radius) {
            this.dy *= -1;

        }

        if (this.x > winWidth - this.radius || this.x < this.radius) {
            this.dx *= -1;

        }
    }
}


for (let i = 0; i < 100; i++) {
    particlesArray.push(new particles());
}

function handleParticles() {

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();

        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                c.beginPath();
                c.strokeStyle = color;
                c.lineWidth = particlesArray[i].radius / 8;
                c.moveTo(particlesArray[i].x, particlesArray[i].y);
                c.lineTo(particlesArray[j].x, particlesArray[j].y);

                c.stroke();
            }
        }
    }

}

function animate() {
    requestAnimationFrame(animate);
    onClickParticles();

    c.fillStyle = "rgba(0,0,0,1)";
    c.fillRect(0, 0, winWidth, winHeight);
    handleParticles();
}
animate();

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        alert('Left was pressed');
    } else if (event.keyCode == 39) {
        alert('Right was pressed');
    }
});