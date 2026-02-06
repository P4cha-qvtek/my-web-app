//---- javascript  -- old animation for background in website -- dont use it for anything else--

//  ---------------------------------------------------------------------- animation of the particle in the background
// Particle Network Animation with geometric figures
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Array of colors to randomly choose from
const colors = ['#393a3c', '#003f88', '#bf0603', '#38b000', '#006400'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Reduced from 0.8 to 0.4 (slower)
        this.vy = (Math.random() - 0.5) * 0.4; // Reduced from 0.8 to 0.4 (slower)
        this.radius = 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.colorChangeInterval = Math.random() * 3000 + 2000;
        this.lastColorChange = Date.now();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Change color randomly
        if (Date.now() - this.lastColorChange > this.colorChangeInterval) {
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.lastColorChange = Date.now();
            this.colorChangeInterval = Math.random() * 3000 + 2000;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
const particleCount = 80;
const activeShapes = new Map(); // Track shapes with fade in/out
const shapeStability = new Map(); // Track how long shapes have existed

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function findConnectedParticles() {
    const connections = [];
    
    for (let i = 0; i < particles.length; i++) {
        const connected = [i];
        
        for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                connected.push(j);
            }
        }
        
        if (connected.length >= 3) {
            connections.push(connected);
        }
    }
    
    return connections;
}

function drawGeometricShape(indices, opacity = 1) {
    if (indices.length < 3) return;
    
    // Take first 3-6 particles to form a shape
    const shapeSize = Math.min(indices.length, Math.floor(Math.random() * 4) + 3);
    const shapeIndices = indices.slice(0, shapeSize);
    
    // Random color with transparency
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    let r, g, b;
    
    if (randomColor.startsWith('#')) {
        const hex = randomColor.replace('#', '');
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
    }
    
    // Draw filled shape with controlled opacity
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.15 * opacity})`;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.4 * opacity})`;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(particles[shapeIndices[0]].x, particles[shapeIndices[0]].y);
    
    for (let i = 1; i < shapeIndices.length; i++) {
        ctx.lineTo(particles[shapeIndices[i]].x, particles[shapeIndices[i]].y);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function connectParticles() {
    const currentShapes = new Set();
    const fadeSpeed = 0.03; // Controls fade speed
    const stabilityThreshold = 3000; // Milliseconds particles must stay connected before shape appears
    const currentTime = Date.now();
    
    for (let i = 0; i < particles.length; i++) {
        const connected = [i];
        
        for (let j = 0; j < particles.length; j++) {
            if (i === j) continue;
            
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                connected.push(j);
                
                // Draw connection line
                const color = particles[i].color;
                let r, g, b;
                
                if (color.startsWith('#')) {
                    const hex = color.replace('#', '');
                    r = parseInt(hex.substr(0, 2), 16);
                    g = parseInt(hex.substr(2, 2), 16);
                    b = parseInt(hex.substr(4, 2), 16);
                }
                
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        // Check if shape should be drawn (3+ particles connected)
        if (connected.length >= 3) {
            const shapeKey = connected.sort((a, b) => a - b).join('-');
            currentShapes.add(shapeKey);
            
            // Track stability - how long has this shape existed?
            if (!shapeStability.has(shapeKey)) {
                shapeStability.set(shapeKey, currentTime);
            }
            
            const shapeAge = currentTime - shapeStability.get(shapeKey);
            
            // Only draw if shape has been stable long enough
            if (shapeAge >= stabilityThreshold) {
                // Get or create shape opacity
                if (!activeShapes.has(shapeKey)) {
                    activeShapes.set(shapeKey, { opacity: 0, color: colors[Math.floor(Math.random() * colors.length)] });
                }
                
                const shapeData = activeShapes.get(shapeKey);
                
                // Fade in
                if (shapeData.opacity < 1) {
                    shapeData.opacity = Math.min(1, shapeData.opacity + fadeSpeed);
                }
                
                drawGeometricShape(connected, shapeData.opacity);
            }
        }
    }
    
    // Clean up stability tracking for shapes that no longer exist
    for (let key of shapeStability.keys()) {
        if (!currentShapes.has(key)) {
            shapeStability.delete(key);
        }
    }
    
    // Fade out shapes that no longer exist
    for (let [key, shapeData] of activeShapes.entries()) {
        if (!currentShapes.has(key) || !shapeStability.has(key)) {
            shapeData.opacity = Math.max(0, shapeData.opacity - fadeSpeed);
            
            if (shapeData.opacity > 0) {
                const indices = key.split('-').map(Number);
                drawGeometricShape(indices, shapeData.opacity);
            } else {
                activeShapes.delete(key);
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

animate();