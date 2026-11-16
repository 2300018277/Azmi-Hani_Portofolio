// 1. Subtle Cursor Glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});

// 2. Interactive Mini Terminal Commands
const commands = {
    track: {
        cmd: './check-track',
        res: 'Focus: Cyber Security (Wireshark, YARA, Linux) & Laravel Backend Engineering.'
    },
    org: {
        cmd: './leadership',
        res: 'HMIF Committee (2 Terms), Faculty & Dept Committees, Laboratoium Assisntant.'
    },
    hobby: {
        cmd: './off-duty',
        res: 'Avid novel reader & creative fiction writer ✨'
    }
};

function runCommand(key) {
    const terminalBody = document.getElementById('terminalOutput');
    const item = commands[key];
    if (!terminalBody || !item) return;

    terminalBody.innerHTML = `
        <p><span class="prompt">$</span> ${item.cmd}</p>
        <p class="output">${item.res}</p>
        <p><span class="prompt">$</span> <span class="cursor">|</span></p>
    `;
}

// 3. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;
    revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
