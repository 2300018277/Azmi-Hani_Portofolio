// 1. Interactive Pink Cyber-Network Particle Canvas
const canvas = document.getElementById('cyberCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 140 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const glow = document.getElementById('cursorGlow');
    if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    }
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 133, 169, 0.55)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 85);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 125) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 133, 169, ${0.16 - dist / 800})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        // Connect to mouse cursor
        if (mouse.x !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 133, 169, ${0.42 - dist / 350})`;
                ctx.lineWidth = 1.1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Cyber Text Scramble / Decryption Effect
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
function scrambleElement(el) {
    const original = el.dataset.value || el.innerText;
    let iteration = 0;
    clearInterval(el.scrambleInterval);

    el.scrambleInterval = setInterval(() => {
        el.innerText = original
            .split('')
            .map((letter, idx) => {
                if (letter === ' ') return ' ';
                if (idx < iteration) return original[idx];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= original.length) {
            clearInterval(el.scrambleInterval);
        }
        iteration += 1 / 2;
    }, 28);
}

document.querySelectorAll('.scramble-text').forEach((el) => {
    scrambleElement(el);
    el.addEventListener('mouseenter', () => scrambleElement(el));
});

// 3. Auto-Typing Live Command in Terminal
const autoPhrases = [
    'yara -r anomaly_rules.yar ./uploads',
    'wireshark -i eth0 -k -f "tcp port 443"',
    'php artisan serve --host=hani.sec',
    'git commit -m "feat: secure architecture"'
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
    const target = document.getElementById('typingLive');
    if (!target) return;
    const current = autoPhrases[phraseIdx];
    target.textContent = isDeleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

    let speed = isDeleting ? 35 : 70;
    if (!isDeleting && charIdx === current.length + 1) {
        isDeleting = true;
        speed = 1600;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % autoPhrases.length;
        speed = 400;
    }
    setTimeout(typeLoop, speed);
}
typeLoop();

// 4. Interactive Terminal Buttons
const terminalData = {
    academic: {
        cmd: './academic-roles',
        res: 'Asisten Praktikum (Keamanan Komputer, Kriptografi, Grafika Komputer, Bisnis Cerdas) & Student Employee at FTI UAD.'
    },
    org: {
        cmd: './organization',
        res: 'Informatics Student Association (HMIF) Board Member for 2 consecutive terms + Department & Faculty Event Committees.'
    },
    security: {
        cmd: './sec-stack',
        res: 'Wireshark, Linux, YARA Heuristic Rules, Cryptography, Laravel Backend & MySQL 3NF.'
    },
    creative: {
        cmd: './creative-side',
        res: 'Avid novel reader & original fiction writer — balancing logic with storytelling ✨'
    }
};

function runCommand(type) {
    const out = document.getElementById('terminalOutput');
    const data = terminalData[type];
    if (!out || !data) return;
    out.innerHTML = `
        <p><span class="prompt">hani@uad:~$</span> ${data.cmd}</p>
        <p class="output">${data.res}</p>
        <p><span class="prompt">hani@uad:~$</span> <span class="typing-live" id="typingLive"></span><span class="cursor">█</span></p>
    `;
}

// 5. 3D Holographic Tilt Effect on Cards
document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// 6. Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const checkReveal = () => {
    revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);
