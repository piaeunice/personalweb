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
    }

    // Update particle position and handle boundary bounce
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the canvas edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    // Draw the particle as a semi-transparent pink circle
    draw() {
        ctx.fillStyle = 'rgba(255, 153, 153, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles.forEach(particle => {
        particle.update(); // Update position
        particle.draw();   // Draw particle
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
