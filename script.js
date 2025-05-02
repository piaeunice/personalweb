// SweetAlert2 Form Submission
document.getElementById('contact').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    Swal.fire({
        title: 'Message Sent!',
        text: 'Your message has been successfully sent.',
        icon: 'success',
        confirmButtonColor: '#BE5985',
        confirmButtonText: 'OK'
    }).then(() => {
        clearContactForm(); // Clear form after confirmation
    });
});

function clearContactForm() {
    const form = document.getElementById('contact');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.value = '';
    });
}

// Particle Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Adjust the canvas size to fill the entire browser window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Array to store all particle objects
const particles = [];
// Total number of particles to be generated
const particleCount = 100;

// Particle class defines the properties and behavior of each particle
class Particle {
    constructor() {
        // Random starting position within the canvas
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Random size between 1 and 4
        this.size = Math.random() * 3 + 1;
        // Random horizontal and vertical speed
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Randomly assign a shape (0: Crescent, 1: Planet Ring, 2: Asteroid, 3: Star)
        this.shape = Math.floor(Math.random() * 4);
    }

    // Update particle position and handle boundary bounce
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the canvas edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    // Draw the particle based on its assigned shape
    draw() {
        ctx.fillStyle = 'rgba(255, 153, 153, 0.5)'; // Pink color with transparency
        ctx.beginPath();

        const size = this.size * 1.5; // Base size for all shapes

        if (this.shape === 0) { // Crescent Moon
            const offset = size * 0.6;
            ctx.arc(this.x - offset / 2, this.y, size, 0, Math.PI * 2); // Full moon
            ctx.globalCompositeOperation = 'destination-out'; // Cut out inner arc
            ctx.arc(this.x + offset / 2, this.y, size * 0.7, 0, Math.PI * 2); // Inner cutout
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; // Reset composite operation
        } else if (this.shape === 1) { // Planet Ring
            const innerSize = size * 0.6;
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2); // Outer ring
            ctx.globalCompositeOperation = 'destination-out'; // Cut out inner circle
            ctx.arc(this.x, this.y, innerSize, 0, Math.PI * 2); // Inner planet
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; // Reset composite operation
        } else if (this.shape === 2) { // Asteroid
            const sides = Math.floor(Math.random() * 3) + 6; // 6 to 8 sides
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const radius = size * (0.8 + Math.random() * 0.4); // Random radius for irregularity
                const x = this.x + Math.cos(angle) * radius;
                const y = this.y - Math.sin(angle) * radius; // Subtract for canvas y-axis
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        } else if (this.shape === 3) { // Star
            const innerSize = size * 0.5;
            for (let i = 0; i < 5; i++) {
                const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
                const x = this.x + Math.cos(angle) * size;
                const y = this.y - Math.sin(angle) * size; // Subtract for canvas y-axis
                ctx.lineTo(x, y);
                const innerAngle = (Math.PI / 2) + (i * 2 * Math.PI / 5) + (Math.PI / 5);
                const innerX = this.x + Math.cos(innerAngle) * innerSize;
                const innerY = this.y - Math.sin(innerAngle) * innerSize;
                ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
        }

        ctx.closePath(); // Ensure path is closed if needed
    }
}

// Initialize all particles and store them in the array
function initParticles() {
    particles.length = 0; // Clear existing particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Animation loop: clears the canvas, updates and redraws all particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particles.forEach(particle => {
        particle.update(); 
        particle.draw();   
    });
    requestAnimationFrame(animateParticles); // Loop the animation
}

// On page load: set canvas size, initialize particles, start animation
window.addEventListener('load', () => {
    resizeCanvas();
    initParticles();
    animateParticles();
});

// On window resize: update canvas size and regenerate particles
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
