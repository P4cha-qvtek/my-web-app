console.log('Hello from external JS!');

//  Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and sections
document.querySelectorAll('.project-card, .header-block, .section-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

///----------------------------------------------------------------------- Typing effect for main heading in home.html
// Add typing effect to main heading
const mainHeading = document.querySelector('.header-block h1');
if (mainHeading) {
    const text = mainHeading.textContent;
    mainHeading.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            mainHeading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Add hover sound effect (optional - can be annoying, comment out if you don't like it)
document.querySelectorAll('.technologies-list li').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

const menuToggle = document.getElementById('menuToggle');
const navCenter = document.querySelector('.nav-center');

if (menuToggle && navCenter) {
    menuToggle.addEventListener('click', () => {
        navCenter.classList.toggle('active');
        menuToggle.textContent = navCenter.classList.contains('active') ? '✕' : '☰';
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navCenter.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
}

const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

const swiftUpElements = document.querySelectorAll('.swift-up-text');

swiftUpElements.forEach(elem => {
    // Get HTML content to preserve BR tags
    const html = elem.innerHTML;
    const lines = html.split('<br>');
    
    elem.innerHTML = '';
    
    lines.forEach((line, lineIndex) => {
        const words = line.trim().split(' ');
        
        words.forEach((word, wordIndex) => {
            const span = document.createElement('span');
            const i = document.createElement('i');
            i.textContent = word;
            i.style.animationDelay = `${(lineIndex * words.length + wordIndex) * 0.1}s`;
            span.appendChild(i);
            elem.appendChild(span);
            
            // Add space after word (except last word in line)
            if (wordIndex < words.length - 1) {
                elem.appendChild(document.createTextNode(' '));
            }
        });
        
        // Add line break after each line (except last)
        if (lineIndex < lines.length - 1) {
            elem.appendChild(document.createElement('br'));
        }
    });
});


//  ---------------------------------------------------------------------- animation of the particle in the background
//  Spacial Constellation Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.style.background = '#000814';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const colors = ['#393a3c', '#003f88', '#bf0603', '#38b000', '#006400'];

// Expanded constellation patterns
const constellationPatterns = [
    {
        name: "Big Dipper",
        stars: [
            {x: 0, y: 0}, {x: 70, y: -30}, {x: 140, y: -45}, {x: 210, y: -30},
            {x: 170, y: 60}, {x: 110, y: 120}, {x: 40, y: 150}
        ],
        connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]]
    },
    {
        name: "Orion",
        stars: [
            {x: 0, y: 0}, {x: 90, y: 15}, {x: 180, y: 0},
            {x: 45, y: -120}, {x: 135, y: -105},
            {x: 45, y: 120}, {x: 135, y: 135}
        ],
        connections: [[0,1], [1,2], [3,0], [4,2], [0,5], [2,6], [3,4]]
    },
    {
        name: "Cassiopeia",
        stars: [
            {x: 0, y: 0}, {x: 60, y: -75}, {x: 120, y: -30},
            {x: 180, y: -90}, {x: 240, y: -15}
        ],
        connections: [[0,1], [1,2], [2,3], [3,4]]
    },
    {
        name: "Scorpius",
        stars: [
            {x: 0, y: 0}, {x: 50, y: -40}, {x: 100, y: -50}, {x: 150, y: -30},
            {x: 180, y: 20}, {x: 200, y: 70}, {x: 210, y: 120}, {x: 200, y: 170}
        ],
        connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7]]
    },
    {
        name: "Cygnus",
        stars: [
            {x: 0, y: 0}, {x: 60, y: -80}, {x: 120, y: -160},
            {x: -80, y: -100}, {x: 200, y: -100}, {x: 120, y: 40}
        ],
        connections: [[0,1], [1,2], [1,3], [1,4], [0,5]]
    },
    {
        name: "Lyra",
        stars: [
            {x: 0, y: 0}, {x: 80, y: -60}, {x: 140, y: -20}, {x: 100, y: 80}
        ],
        connections: [[0,1], [1,2], [2,3], [3,0]]
    },
    {
        name: "Aquarius",
        stars: [
            {x: 0, y: 0}, {x: 60, y: -40}, {x: 120, y: -60}, {x: 180, y: -40},
            {x: 90, y: 50}, {x: 150, y: 70}
        ],
        connections: [[0,1], [1,2], [2,3], [1,4], [2,5]]
    },
    {
        name: "Gemini",
        stars: [
            {x: 0, y: 0}, {x: 40, y: -80}, {x: 80, y: -140}, 
            {x: 120, y: 0}, {x: 160, y: -80}, {x: 200, y: -140}
        ],
        connections: [[0,1], [1,2], [3,4], [4,5], [1,4]]
    },
    {
        name: "Andromeda",
        stars: [
            {x: 0, y: 0}, {x: 70, y: -50}, {x: 140, y: -80}, {x: 210, y: -60},
            {x: 140, y: 20}
        ],
        connections: [[0,1], [1,2], [2,3], [2,4]]
    }
];

let usedPatterns = [];

function getRandomPattern() {
    // Reset if all used
    if (usedPatterns.length >= constellationPatterns.length) {
        usedPatterns = [];
    }
    
    // Get unused patterns
    const available = constellationPatterns.filter((_, idx) => !usedPatterns.includes(idx));
    const chosenIndex = constellationPatterns.indexOf(available[Math.floor(Math.random() * available.length)]);
    usedPatterns.push(chosenIndex);
    
    return constellationPatterns[chosenIndex];
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slower for vast space feel
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.colorChangeInterval = Math.random() * 5000 + 3000; // Slower color change
        this.lastColorChange = Date.now();
        
        // Constellation properties
        this.isLocked = false;
        this.lockedUntil = 0;
        this.targetX = this.x;
        this.targetY = this.y;
        this.constellationId = null;
        this.starIndex = null;
        this.formingProgress = 0;
        this.originalColor = this.color;
    }

    update() {
        const currentTime = Date.now();
        
        // Check if constellation lock has expired
        if (this.isLocked && currentTime > this.lockedUntil) {
            this.isLocked = false;
            this.constellationId = null;
            this.starIndex = null;
            this.formingProgress = 0;
            this.color = this.originalColor; // Restore original color
        }
        
        // Movement - ALWAYS move, even when locked
        if (this.isLocked) {
            // Gradually increase forming progress - balanced speed
            if (this.formingProgress < 1) {
                this.formingProgress += 0.012; // Faster than before but not too fast
            }
            
            // Gently drift toward target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const speed = 0.06 * this.formingProgress; // Balanced movement speed
            this.x += dx * speed;
            this.y += dy * speed;
        } else {
            // Normal free roaming - always active
            this.x += this.vx;
            this.y += this.vy;
        }

        // Bounce off edges with proper velocity reversal
        if (this.x <= 0 || this.x >= canvas.width) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y <= 0 || this.y >= canvas.height) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        // Change color randomly (only when not locked)
        if (!this.isLocked && currentTime - this.lastColorChange > this.colorChangeInterval) {
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.originalColor = this.color;
            this.lastColorChange = currentTime;
            this.colorChangeInterval = Math.random() * 5000 + 3000;
        }
    }
    
    lockInConstellation(targetX, targetY, duration, constellationId, starIndex, color) {
        this.isLocked = true;
        this.targetX = targetX;
        this.targetY = targetY;
        this.lockedUntil = Date.now() + duration;
        this.constellationId = constellationId;
        this.starIndex = starIndex;
        this.color = color;
        this.formingProgress = 0;
    }

    draw() {
        const opacity = this.isLocked ? this.formingProgress * 0.7 : 0.5; // Very soft
        
        // Ethereal glow
        if (this.isLocked) {
            ctx.shadowBlur = 20 * opacity;
            ctx.shadowColor = this.color;
            ctx.globalAlpha = opacity;
        } else {
            ctx.globalAlpha = opacity;
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

const particles = [];
const particleCount = 90; // More particles for 3-5 constellations
const constellationDuration = 8000; // 8 seconds total
const constellationFadeInDuration = 1200; // 1.2 seconds fade in
const constellationFadeOutDuration = 2000; // 2 seconds fade out
const activeConstellations = new Map();
let nextConstellationId = 0;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function formConstellation() {
    // Find free particles
    const freeParticles = particles.filter(p => !p.isLocked);
    
    if (freeParticles.length < 3) return;
    
    // Get random unused pattern
    const pattern = getRandomPattern();
    
    if (freeParticles.length < pattern.stars.length) return;
    
    // Random position ANYWHERE on screen with proper margins
    const margin = 200;
    const centerX = Math.random() * (canvas.width - margin * 2) + margin;
    const centerY = Math.random() * (canvas.height - margin * 2) + margin;
    
    // Random scale for size variety
    const scale = 0.6 + Math.random() * 0.8; // 60% to 140% size
    
    const constellationId = nextConstellationId++;
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Assign CLOSEST free particles to minimize travel distance
    const particlesWithDistance = freeParticles.map(p => ({
        particle: p,
        distance: Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2)
    }));
    
    particlesWithDistance.sort((a, b) => a.distance - b.distance);
    
    // Assign particles
    for (let i = 0; i < pattern.stars.length; i++) {
        const particle = particlesWithDistance[i].particle;
        const star = pattern.stars[i];
        
        particle.lockInConstellation(
            centerX + star.x * scale,
            centerY + star.y * scale,
            constellationDuration,
            constellationId,
            i,
            chosenColor
        );
    }
    
    activeConstellations.set(constellationId, {
        pattern: pattern,
        color: chosenColor,
        expiresAt: Date.now() + constellationDuration,
        createdAt: Date.now()
    });
}

function drawConstellations() {
    const currentTime = Date.now();
    
    // Clean up expired
    for (let [id, data] of activeConstellations.entries()) {
        if (currentTime > data.expiresAt) {
            activeConstellations.delete(id);
        }
    }
    
    // Draw constellations
    activeConstellations.forEach((data, id) => {
        const pattern = data.pattern;
        const constellationParticles = particles.filter(p => p.constellationId === id);
        
        const age = currentTime - data.createdAt;
        const timeUntilExpiry = data.expiresAt - currentTime;
        
        let constellationOpacity = 1;
        
        if (age < constellationFadeInDuration) {
            constellationOpacity = age / constellationFadeInDuration;
        } else if (timeUntilExpiry < constellationFadeOutDuration) {
            constellationOpacity = timeUntilExpiry / constellationFadeOutDuration;
        }
        
        let r, g, b;
        const hex = data.color.replace('#', '');
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
        
        // Draw connections
        pattern.connections.forEach(([starA, starB]) => {
            const particleA = constellationParticles.find(p => p.starIndex === starA);
            const particleB = constellationParticles.find(p => p.starIndex === starB);
            
            if (particleA && particleB) {
                const lineOpacity = Math.min(particleA.formingProgress, particleB.formingProgress) * constellationOpacity;
                
                // More visible lines
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.65 * lineOpacity})`; // Increased visibility
                ctx.lineWidth = 2 * lineOpacity;
                ctx.shadowBlur = 15 * lineOpacity;
                ctx.shadowColor = data.color;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
                
                // Soft outer glow
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.25 * lineOpacity})`; // More visible
                ctx.lineWidth = 4 * lineOpacity;
                ctx.shadowBlur = 25 * lineOpacity;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        });
        
        ctx.shadowBlur = 0;
    });
    
    // Very faint free particle connections
    particles.forEach((particle, i) => {
        if (particle.isLocked) return;
        
        particles.forEach((other, j) => {
            if (i >= j || other.isLocked) return;
            
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const opacity = 1 - distance / 120;
                ctx.strokeStyle = `rgba(80, 80, 100, ${opacity * 0.06})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        });
    });
}

let burstCooldown = false;

function formConstellationBurst() {
    const numConstellations = Math.floor(Math.random() * 3) + 3; // 3-5 constellations
    
    for (let i = 0; i < numConstellations; i++) {
        setTimeout(() => {
            formConstellation();
        }, i * 250); // Slightly faster stagger
    }
}

let nextConstellationTime = Date.now() + Math.random() * 3000 + 3000; // 3-6 seconds (initial)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentTime = Date.now();
    
    // Form burst of constellations at random intervals
    if (currentTime >= nextConstellationTime && !burstCooldown) {
        burstCooldown = true;
        formConstellationBurst();
        // Set next random burst time (6-12 seconds) - much shorter
        nextConstellationTime = currentTime + Math.random() * 6000 + 6000;
        
        // Reset cooldown after burst completes
        setTimeout(() => {
            burstCooldown = false;
        }, 2000);
    }

    // Draw connections first
    drawConstellations();
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

//----------------------------------------------------------------------- animation of custom cursor
// === Custom animated symbol cursor ===

// Create the glowing dot
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

// Create the outline ring
const cursorOutline = document.createElement('div');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorOutline);

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// Smooth outline follow animation
function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateOutline);
}
animateOutline();

// Hover scaling for interactive elements
const hoverElements = document.querySelectorAll('a, button, .nav-links a, .content-section a');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ✨ Click "pop" effect
document.addEventListener('click', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
    cursorDot.style.opacity = '0.8';
    setTimeout(() => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.opacity = '1';
    }, 120);
});

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button').forEach(el => {
    el.style.cursor = 'none';
});

//----------------------------------------------------------------------- Owl Carousel for about age - more section

// Initialize each Owl Carousel separately
$(document).ready(function () {
  $(".custom-carousel").each(function() {
    var itemCount = $(this).find('.item').length;
    
    $(this).owlCarousel({
      autoWidth: true,
      loop: false,
      items: itemCount, // Show all items
      margin: 15,
      nav: false,
      dots: true
    });
  });

  // Click handler for toggle active state
  $(".custom-carousel .item").click(function () {
    $(this).toggleClass("active"); // Simply toggle on the clicked item
  });
});


///----------------------------------------------------------------------- Resume page card expansion

// Hide navbar when clicking Experience or Projects buttons
const showExperienceBtn = document.getElementById('show-experience');
const showProjectsBtn = document.getElementById('show-projects');
const backButtons = document.querySelectorAll('.back-btn');

// Hide navbar when Experience is clicked
if (showExperienceBtn) {
    showExperienceBtn.addEventListener('click', function() {
        document.body.classList.add('hide-navbar');
    });
}

// Hide navbar when Projects is clicked
if (showProjectsBtn) {
    showProjectsBtn.addEventListener('click', function() {
        document.body.classList.add('hide-navbar');
    });
}

// Show navbar when Back button is clicked
backButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        document.body.classList.remove('hide-navbar');
    });
});


// Toggle card expansion
function toggleCard(card) {
  const details = card.querySelector('.card-details');
  const isExpanded = details.classList.contains('expanded');
  
  // Close all other cards
  document.querySelectorAll('.card-details.expanded').forEach(detail => {
    if (detail !== details) {
      detail.classList.remove('expanded');
      detail.parentElement.classList.remove('expanded');
    }
  });
  
  // Toggle current card
  if (isExpanded) {
    details.classList.remove('expanded');
    card.classList.remove('expanded');
  } else {
    details.classList.add('expanded');
    card.classList.add('expanded');
  }
}

// Resume page toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const showExperienceBtn = document.getElementById('show-experience');
  const showProjectsBtn = document.getElementById('show-projects');
  const experienceSection = document.getElementById('experience-section');
  const projectsSection = document.getElementById('projects-section');
  const mainOptions = document.getElementById('main-options');
  const backButtons = document.querySelectorAll('.back-btn');

  // Show Experience Section
  if (showExperienceBtn) {
    showExperienceBtn.addEventListener('click', () => {
      mainOptions.style.display = 'none';
      experienceSection.classList.remove('hidden');
      experienceSection.classList.add('visible');
    });
  }

  // Show Projects Section
  if (showProjectsBtn) {
    showProjectsBtn.addEventListener('click', () => {
      mainOptions.style.display = 'none';
      projectsSection.classList.remove('hidden');
      projectsSection.classList.add('visible');
    });
  }

  // Back Button Functionality
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSection = btn.getAttribute('data-target');
      const section = document.getElementById(targetSection);
      
      section.classList.remove('visible');
      section.classList.add('hidden');
      mainOptions.style.display = 'flex';

      // ADD THIS LINE - Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Close all expanded cards when going back
      document.querySelectorAll('.card-details.expanded').forEach(detail => {
        detail.classList.remove('expanded');
        detail.parentElement.classList.remove('expanded');
      });
    });
  });

  // ADD THIS - Click listeners for all cards
  document.querySelectorAll('.experience-card, .project-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Only toggle if not clicking on a link or button inside the card
      if (!e.target.closest('a, button')) {
        toggleCard(this);
      }
    });
  });
});

// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('projectList');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const currentProjectSpan = document.getElementById('currentProject');
  const totalProjectsSpan = document.getElementById('totalProjects');
  
  if (projectList && prevBtn && nextBtn) {
    const projects = projectList.querySelectorAll('.project-card');
    const totalProjects = projects.length;
    let currentIndex = 0;
    
    // Set total projects count
    if (totalProjectsSpan) {
      totalProjectsSpan.textContent = totalProjects;
    }
    
    function updateCarousel() {
      const offset = -currentIndex * 100;
      projectList.style.transform = `translateX(${offset}%)`;
      
      // Update counter
      if (currentProjectSpan) {
        currentProjectSpan.textContent = currentIndex + 1;
      }
      
      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === totalProjects - 1;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalProjects - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Initialize
    updateCarousel();
  }
});

//--------------------------------------------------------------------------------------wandering logo animation for home  page
// Wandering Logo on HOME Page with Drag and Navbar Docking
document.addEventListener('DOMContentLoaded', () => {
  // Only run on about page
  if (!document.querySelector('.home-page')) return;
  
  const logo = document.querySelector('.logo img');
  const navbar = document.querySelector('.navbar');
  
  if (!logo || !navbar) return;
  
  // Hide the original navbar logo on about page
  logo.style.opacity = '0';
  
  // Create a clone of the logo for animation
  const wanderingLogo = logo.cloneNode(true);
  wanderingLogo.classList.add('wandering-logo');
  wanderingLogo.style.position = 'fixed';
  wanderingLogo.style.zIndex = '999';
  wanderingLogo.style.width = '120px';
  wanderingLogo.style.height = 'auto';
  wanderingLogo.style.opacity = '0.9';
  wanderingLogo.style.cursor = 'grab';
  wanderingLogo.style.transition = 'width 0.3s ease, opacity 0.3s ease';
  document.body.appendChild(wanderingLogo);
  
  // Random starting position
  function getRandomStartPosition() {
    const margin = 150;
    return {
      x: margin + Math.random() * (window.innerWidth - margin * 2),
      y: margin + Math.random() * (window.innerHeight - margin * 2)
    };
  }
  
  const startPos = getRandomStartPosition();
  let currentX = startPos.x;
  let currentY = startPos.y;
  let targetX = currentX;
  let targetY = currentY;
  let isDragging = false;
  let isDocked = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let undockTimeout = null;
  
  function getNavbarLogoPosition() {
    const logoRect = logo.getBoundingClientRect();
    return {
      x: logoRect.left + logoRect.width / 2,
      y: logoRect.top + logoRect.height / 2
    };
  }
  
  function getRandomTarget() {
    const radius = 200;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    
    let newX = currentX + Math.cos(angle) * distance;
    let newY = currentY + Math.sin(angle) * distance;
    
    const margin = 150;
    newX = Math.max(margin, Math.min(window.innerWidth - margin, newX));
    newY = Math.max(margin, Math.min(window.innerHeight - margin, newY));
    
    return { x: newX, y: newY };
  }
  
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  function createFirework(x, y) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];
    const particleCount = 30; // More particles!
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '8px'; // Slightly bigger
      particle.style.height = '8px';
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 3 + Math.random() * 3; // Faster
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let px = x;
      let py = y;
      let opacity = 1;
      let scale = 1;
      
      function animateParticle() {
        px += vx;
        py += vy;
        opacity -= 0.015;
        scale += 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${scale})`;
        
        if (opacity > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      }
      
      animateParticle();
    }
  }
  
  function dockToNavbar() {
    isDocked = true;
    const navPos = getNavbarLogoPosition();
    currentX = navPos.x;
    currentY = navPos.y;
    targetX = navPos.x;
    targetY = navPos.y;
    
    wanderingLogo.style.width = '39px'; // Navbar size
    wanderingLogo.style.left = navPos.x + 'px';
    wanderingLogo.style.top = navPos.y + 'px';
    
    // Fireworks!
    createFirework(navPos.x, navPos.y);
    
    // Show original logo
    logo.style.opacity = '1';
    
    // Hide wandering logo after fireworks
    setTimeout(() => {
      wanderingLogo.style.opacity = '0';
    }, 300);
    
    // Undock after 2 minutes (120000ms)
    undockTimeout = setTimeout(() => {
      undockFromNavbar();
    }, 120000);
  }
  
  function undockFromNavbar() {
    isDocked = false;
    logo.style.opacity = '0';
    wanderingLogo.style.opacity = '0.9';
    wanderingLogo.style.width = '120px';
    
    const navPos = getNavbarLogoPosition();
    currentX = navPos.x;
    currentY = navPos.y;
    
    const newTarget = getRandomTarget();
    targetX = newTarget.x;
    targetY = newTarget.y;
  }
  
  function isNearNavbar(x, y) {
    const navPos = getNavbarLogoPosition();
    const distance = Math.sqrt(
      Math.pow(x - navPos.x, 2) + Math.pow(y - navPos.y, 2)
    );
    return distance < 80; // Snap distance
  }
  
  function animate() {
    if (!isDragging && !isDocked) {
      currentX = lerp(currentX, targetX, 0.005);
      currentY = lerp(currentY, targetY, 0.005);
      
      const time = Date.now() * 0.0005;
      const floatX = Math.sin(time * 0.5) * 8;
      const floatY = Math.cos(time * 0.7) * 8;
      
      wanderingLogo.style.left = (currentX + floatX) + 'px';
      wanderingLogo.style.top = (currentY + floatY) + 'px';
      
      const distanceToTarget = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      );
      
      if (distanceToTarget < 20) {
        const newTarget = getRandomTarget();
        targetX = newTarget.x;
        targetY = newTarget.y;
      }
    }
    
    wanderingLogo.style.transform = 'translate(-50%, -50%)';
    requestAnimationFrame(animate);
  }
  
  // Drag functionality
  wanderingLogo.addEventListener('mousedown', (e) => {
    if (isDocked) {
      // Cancel undock timeout if dragging while docked
      if (undockTimeout) {
        clearTimeout(undockTimeout);
        undockTimeout = null;
      }
      isDocked = false;
      logo.style.opacity = '0';
      wanderingLogo.style.opacity = '0.9';
      wanderingLogo.style.width = '120px';
    }
    
    isDragging = true;
    wanderingLogo.style.cursor = 'grabbing';
    
    const rect = wanderingLogo.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left - rect.width / 2;
    dragOffsetY = e.clientY - rect.top - rect.height / 2;
    
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      currentX = e.clientX - dragOffsetX;
      currentY = e.clientY - dragOffsetY;
      
      wanderingLogo.style.left = currentX + 'px';
      wanderingLogo.style.top = currentY + 'px';
      
      // Visual feedback when near navbar
      if (isNearNavbar(currentX, currentY)) {
        wanderingLogo.style.opacity = '0.6';
      } else {
        wanderingLogo.style.opacity = '0.9';
      }
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      wanderingLogo.style.cursor = 'grab';
      
      // Check if dropped near navbar
      if (isNearNavbar(currentX, currentY)) {
        dockToNavbar();
      } else {
        // Set new target from current dragged position
        targetX = currentX;
        targetY = currentY;
        wanderingLogo.style.opacity = '0.9';
        
        // Get new random target after a brief pause
        setTimeout(() => {
          const newTarget = getRandomTarget();
          targetX = newTarget.x;
          targetY = newTarget.y;
        }, 500);
      }
    }
  });
  
  // Set initial random target (different from start position)
  targetX = currentX;
  targetY = currentY;
  
  setTimeout(() => {
    const initialTarget = getRandomTarget();
    targetX = initialTarget.x;
    targetY = initialTarget.y;
  }, 1000);
  
  animate();
  
  // Update on window resize
  window.addEventListener('resize', () => {
    if (!isDocked) {
      const newTarget = getRandomTarget();
      targetX = newTarget.x;
      targetY = newTarget.y;
    }
  });
});

