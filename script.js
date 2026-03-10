// ===================
// DATA - Planos atualizados conforme a imagem
// ===================
const plans = [
{
name: "Plano Cinzas",
speed: 420,
upload: 230,
price: 89.90,
router: "Roteador Wi-Fi Single Band",
features: ["Download 420 Mbps", "Upload 230 Mbps", "Roteador Wi-Fi Single Band", "Instalacao gratuita", "Suporte tecnico"],
featured: false
},
{
name: "Plano Renascer",
speed: 570,
upload: 285,
price: 99.90,
router: "Roteador Wi-Fi Dual Band",
features: ["Download 570 Mbps", "Upload 285 Mbps", "Roteador Wi-Fi Dual Band", "Instalacao gratuita", "Suporte tecnico"],
featured: false
},
{
name: "Plano Fênix",
speed: 670,
upload: 335,
price: 119.90,
router: "Roteador Wi-Fi Dual Band",
features: ["Download 670 Mbps", "Upload 335 Mbps", "Roteador Wi-Fi Dual Band", "Instalacao gratuita", "Suporte tecnico"],
featured: true
},
{
name: "Plano Ninho",
speed: 720,
upload: 360,
price: 129.90,
router: "Roteador Wi-Fi Dual Band",
features: ["Download 720 Mbps", "Upload 360 Mbps", "Roteador Wi-Fi Dual Band", "Cursos e Certificacao", "Streaming incluso", "Suporte tecnico"],
featured: false
}
];

const features = [
{
icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
title: "Velocidade Extrema",
description: "Ate 720 Mbps de download e upload simetrico para streaming, jogos e trabalho remoto."
},
{
icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
title: "Conexao Estavel",
description: "99.9% de uptime garantido com nossa infraestrutura de fibra optica de ultima geracao."
},
{
icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
title: "Suporte 24/7",
description: "Equipe tecnica especializada disponivel a qualquer hora para resolver seus problemas."
},
{
icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
title: "Seguranca Total",
description: "Protecao contra ataques DDoS e rede segura para sua navegacao."
}
];

// ===================
// INITIALIZATION
// ===================
let particlesCanvas = null;
let particlesCtx = null;
let particles = [];
let animationFrameId = null;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
// Initialize all components
initParticles();
renderPlans();
renderFeatures();
initScrollReveal();
initCounterAnimation();
initMobileMenu();
initForms();
initNetworkCanvas();
initChatWidget();
initAvailabilityForm();
});

// ===================
// AVAILABILITY FORM - WhatsApp Integration
// ===================
function initAvailabilityForm() {
const form = document.getElementById('availability-form');
if (!form) return;

form.addEventListener('submit', (e) => {
e.preventDefault();

// Get form values
const nome = document.getElementById('nome-completo').value.trim();
const telefone = document.getElementById('telefone').value.trim();
const endereco = document.getElementById('endereco').value.trim();
const plano = document.getElementById('plano-select').value;

// Validate
if (!nome || !telefone || !endereco || !plano) {
showToast('Por favor, preencha todos os campos!');
return;
}

// Format phone number (remove non-numeric characters)
const phoneFormatted = telefone.replace(/\D/g, '');

// Create WhatsApp message
const message = `*Olá! Gostaria de verificar disponibilidade de internet* 🚀\n\n` +
`*Nome:* ${nome}\n` +
`*Telefone:* ${telefone}\n` +
`*Endereço:* ${endereco}\n` +
`*Plano de Interesse:* ${plano}\n\n` +
`Aguardo retorno!`;

// Encode message for URL
const encodedMessage = encodeURIComponent(message);

// WhatsApp number
const whatsappNumber = '555134381304';

// Create WhatsApp URL
const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

// Open WhatsApp in new tab
window.open(whatsappURL, '_blank');

// Show success message
showToast('Redirecionando para o WhatsApp...');
});
}

// ===================
// CHAT WIDGET
// ===================
function initChatWidget() {
const chatButton = document.getElementById('chat-button');
const chatPanel = document.getElementById('chat-panel');
if (!chatButton || !chatPanel) return;

let isOpen = false;

chatButton.addEventListener('click', () => {
isOpen = !isOpen;
if (isOpen) {
chatPanel.classList.add('open');
} else {
chatPanel.classList.remove('open');
}
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
if (isOpen && !chatButton.contains(e.target) && !chatPanel.contains(e.target)) {
isOpen = false;
chatPanel.classList.remove('open');
}
});
}

// ===================
// PARTICLES - Cores roxo e laranja
// ===================
function initParticles() {
particlesCanvas = document.getElementById('particles-canvas');
if (!particlesCanvas) return;

particlesCtx = particlesCanvas.getContext('2d');
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
createParticles();
animateParticles();
}

function resizeCanvas() {
if (!particlesCanvas) return;
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;
}

function createParticles() {
particles = [];
const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));

for (let i = 0; i < particleCount; i++) {
// Alterna entre roxo e laranja
const isOrange = Math.random() > 0.5;
particles.push({
x: Math.random() * window.innerWidth,
y: Math.random() * window.innerHeight,
size: Math.random() * 2 + 0.5,
speedX: (Math.random() - 0.5) * 0.3,
speedY: -Math.random() * 0.5 - 0.1,
opacity: Math.random() * 0.5 + 0.2,
hue: isOrange ? 25 : 270, // Laranja ou roxo
saturation: isOrange ? 100 : 70,
lightness: isOrange ? 60 : 65
});
}
}

function animateParticles() {
if (!particlesCtx || !particlesCanvas) return;

// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
return;
}

particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

particles.forEach(p => {
p.x += p.speedX;
p.y += p.speedY;

if (p.y < -10) {
p.y = particlesCanvas.height + 10;
p.x = Math.random() * particlesCanvas.width;
}
if (p.x < -10) p.x = particlesCanvas.width + 10;
if (p.x > particlesCanvas.width + 10) p.x = -10;

// Draw particle with glow
const gradient = particlesCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.size * 3));
gradient.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.opacity})`);
gradient.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);

particlesCtx.beginPath();
particlesCtx.arc(p.x, p.y, Math.max(1, p.size * 3), 0, Math.PI * 2);
particlesCtx.fillStyle = gradient;
particlesCtx.fill();
});

animationFrameId = requestAnimationFrame(animateParticles);
}

// ===================
// RENDER FUNCTIONS
// ===================
function renderPlans() {
const container = document.getElementById('plans-container');
if (!container) return;

container.innerHTML = plans.map((plan, index) => `
<div class="reveal ${index > 0 ? 'reveal-delay-' + Math.min(index, 4) : ''}">
<div class="plan-card ${plan.featured ? 'featured' : ''} rounded-2xl p-6 lg:p-8 h-full flex flex-col relative">
${plan.featured ? `
<img src="https://z-cdn-media.chatglm.cn/files/1bcae544-3540-46ea-bdb6-53c9c61fe861.jpg?auth_key=1873097067-1cab28135bbe4d91a072af44919df60a-0-906833d8c609778ffb6db4e271619b75"
alt="Recomendado"
class="plan-mascot rounded-full object-cover border-2 border-[var(--purple)] mascot-float">
` : ''}
${plan.featured ? '<div class="text-xs font-semibold text-[var(--purple-light)] uppercase tracking-wider mb-4">Mais Popular</div>' : '<div class="pt-8"></div>'}
<h3 class="text-xl font-bold mb-2">${plan.name}</h3>
<div class="flex items-baseline gap-1 mb-1">
<span class="text-4xl font-extrabold plan-speed">${plan.speed}</span>
<span class="text-[var(--muted)]">Mbps</span>
</div>
<div class="text-sm text-[var(--muted)] mb-4">
Download / Upload ${plan.upload} Mbps
</div>
<div class="flex items-baseline gap-1 mb-6">
<span class="text-sm text-[var(--muted)]">R$</span>
<span class="text-3xl font-bold plan-price">${plan.price.toFixed(2).replace('.', ',')}</span>
<span class="text-sm text-[var(--muted)]">/mes</span>
</div>
<div class="text-xs text-[var(--purple-light)] mb-4 font-medium">
${plan.router}
</div>
<ul class="space-y-3 mb-8 flex-1">
${plan.features.map(f => `
<li class="flex items-center gap-2 text-sm">
<svg class="w-4 h-4 text-[var(--purple-light)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
</svg>
<span class="text-[var(--muted)]">${f}</span>
</li>
`).join('')}
</ul>
<a href="https://wa.me/555134381304?text=Olá! Tenho interesse no plano ${plan.name} da Fenix Internet"
class="btn-${plan.featured ? 'primary text-white' : 'secondary'} py-3 rounded-xl font-semibold text-center block">
<span>Assinar ${plan.name}</span>
</a>
</div>
</div>
`).join('');

// Re-init scroll reveal for new elements
initScrollReveal();
}

function renderFeatures() {
const container = document.getElementById('features-container');
if (!container) return;

container.innerHTML = features.map((f, i) => `
<div class="reveal reveal-delay-${i + 3} feature-card rounded-xl p-5 flex items-start gap-4">
<div class="feature-icon w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-[var(--purple-light)]">
${f.icon}
</div>
<div>
<h3 class="font-semibold mb-1">${f.title}</h3>
<p class="text-sm text-[var(--muted)]">${f.description}</p>
</div>
</div>
`).join('');

initScrollReveal();
}

// ===================
// SCROLL REVEAL
// ===================
function initScrollReveal() {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('active');
}
});
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
observer.observe(el);
});
}

// ===================
// COUNTER ANIMATION
// ===================
function initCounterAnimation() {
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const counter = entry.target;
const target = parseInt(counter.dataset.target);
animateCounter(counter, target);
observer.unobserve(counter);
}
});
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
const duration = 2000;
const start = performance.now();

function update(currentTime) {
const elapsed = currentTime - start;
const progress = Math.min(elapsed / duration, 1);
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
const current = Math.floor(easeOutQuart * target);

element.textContent = current.toLocaleString('pt-BR');

if (progress < 1) {
requestAnimationFrame(update);
}
}

requestAnimationFrame(update);
}

// ===================
// MOBILE MENU
// ===================
function initMobileMenu() {
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const menu = document.getElementById('mobile-menu');
const links = document.querySelectorAll('.mobile-nav-link');

if (!menuBtn || !closeBtn || !menu) return;

menuBtn.addEventListener('click', () => {
menu.classList.add('open');
document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
menu.classList.remove('open');
document.body.style.overflow = '';
});

links.forEach(link => {
link.addEventListener('click', () => {
menu.classList.remove('open');
document.body.style.overflow = '';
});
});
}

// ===================
// FORMS
// ===================
function initForms() {
const contactForm = document.getElementById('contact-form');

if (contactForm) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
showToast('Mensagem enviada com sucesso!');
contactForm.reset();
});
}
}

function showToast(message) {
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
if (!toast || !toastMessage) return;

toastMessage.textContent = message;
toast.classList.remove('translate-y-20', 'opacity-0');

setTimeout(() => {
toast.classList.add('translate-y-20', 'opacity-0');
}, 3000);
}

// ===================
// NETWORK CANVAS - Cores roxo e laranja
// ===================
function initNetworkCanvas() {
const canvas = document.getElementById('network-canvas');
if (!canvas) return;

const ctx = canvas.getContext('2d');

function resize() {
const rect = canvas.parentElement.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;
}

resize();
window.addEventListener('resize', resize);

const nodes = [];
const nodeCount = 15;

for (let i = 0; i < nodeCount; i++) {
nodes.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
vx: (Math.random() - 0.5) * 0.5,
vy: (Math.random() - 0.5) * 0.5,
radius: Math.random() * 3 + 2,
isOrange: Math.random() > 0.5
});
}

function drawNetwork() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw connections
ctx.lineWidth = 1;
for (let i = 0; i < nodes.length; i++) {
for (let j = i + 1; j < nodes.length; j++) {
const dx = nodes[i].x - nodes[j].x;
const dy = nodes[i].y - nodes[j].y;
const dist = Math.sqrt(dx * dx + dy * dy);

if (dist < 120) {
ctx.beginPath();
ctx.moveTo(nodes[i].x, nodes[i].y);
ctx.lineTo(nodes[j].x, nodes[j].y);
ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * (1 - dist / 120)})`;
ctx.stroke();
}
}
}

// Draw nodes
nodes.forEach(node => {
const color = node.isOrange ? 'rgba(249, 115, 22, 1)' : 'rgba(139, 92, 246, 1)';
const colorFade = node.isOrange ? 'rgba(249, 115, 22, 0)' : 'rgba(139, 92, 246, 0)';

const gradient = ctx.createRadialGradient(
node.x, node.y, 0,
node.x, node.y, Math.max(1, node.radius * 2)
);
gradient.addColorStop(0, color);
gradient.addColorStop(1, colorFade);

ctx.beginPath();
ctx.arc(node.x, node.y, Math.max(1, node.radius * 2), 0, Math.PI * 2);
ctx.fillStyle = gradient;
ctx.fill();
});

// Update positions
nodes.forEach(node => {
node.x += node.vx;
node.y += node.vy;

if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
requestAnimationFrame(drawNetwork);
}
}

drawNetwork();
}

// Handle smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});
});

// ==========================================
// BENEFITS SECTION - INTERACTIONS
// ==========================================

// Initialize Benefits Section
function initBenefitsSection() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // Add click tracking for analytics (optional)
    benefitCards.forEach(card => {
        card.addEventListener('click', function() {
            const benefitName = this.querySelector('h3').textContent;
            console.log(`Benefit clicked: ${benefitName}`);
            // Add your analytics tracking here
        });
    });
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.benefit-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        cards.forEach((card, index) => {
            const speed = (index + 1) * 5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            if (card.matches(':hover')) {
                card.style.transform = `translateY(-8px) perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
            }
        });
    });
    
    // Reset transform on mouse leave
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    initBenefitsSection();
});
