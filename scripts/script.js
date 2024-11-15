const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reinitialize particles when resized
});

const mouse = {
    x: null,
    y: null,
    radius: 100 // Radius of effect for the mouse repelling action
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x; // Original position
        this.baseY = y;
        this.size = Math.random() * 3 + 1; // Star size
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        // Calculate distance from mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel the particles if within mouse radius
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance; // Stronger force closer to mouse
            const directionX = forceDirectionX * force * 5; // Adjust the multiplier to control strength
            const directionY = forceDirectionY * force * 5;

            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Return to original position
            if (this.x !== this.baseX) {
                const dx = this.x - this.baseX;
                this.x -= dx / 20; // Speed of return
            }
            if (this.y !== this.baseY) {
                const dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
    }

    draw() {
        ctx.fillStyle = '#ffffc770'; // White color for stars
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create particles array
let particlesArray = [];
const numParticles = 200; // Number of stars

function init() {
    particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();