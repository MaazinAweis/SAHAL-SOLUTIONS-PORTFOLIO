// ==== 1. Hero 3D Background Animation (Canvas) ====
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
  const colors = ['#00eaff', '#a259ff', '#00fff7'];
  return colors[Math.floor(Math.random() * colors.length)];
}
function createParticle() {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 1.5 + 0.5,
    r: Math.random() * 32 + 16,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    color: randomColor(),
    shape: Math.random() > 0.5 ? 'circle' : 'triangle',
    angle: Math.random() * Math.PI * 2
  };
}
for (let i = 0; i < 24; i++) particles.push(createParticle());
function drawParticle(p) {
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.translate(p.x, p.y);
  ctx.scale(p.z, p.z);
  ctx.rotate(p.angle);
  ctx.shadowColor = p.color;
  ctx.shadowBlur = 32;
  ctx.fillStyle = p.color;
  if (p.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, p.r, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.lineTo(p.r, p.r);
    ctx.lineTo(-p.r, p.r);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}
function animateHeroBg() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    p.x += p.dx * p.z;
    p.y += p.dy * p.z;
    p.angle += 0.002 * p.z;
    if (p.x < -100) p.x = w + 100;
    if (p.x > w + 100) p.x = -100;
    if (p.y < -100) p.y = h + 100;
    if (p.y > h + 100) p.y = -100;
    drawParticle(p);
  }
  requestAnimationFrame(animateHeroBg);
}
animateHeroBg();

// ==== 2. Hero Text Fade-in Animation ====
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-content').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.hero-content').style.transition = 'opacity 1.2s cubic-bezier(.25,1.7,.45,.87)';
    document.querySelector('.hero-content').style.opacity = 1;
  }, 400);
});

// ==== 3. Smooth Scroll for CTA ====
document.getElementById('view-work-btn').addEventListener('click', () => {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
});

// ==== 4. Portfolio Data & Rendering (Folder-based Images) ====
const folderImages = {
  posters: [
    'images/posters/WhatsApp Image 2025-05-16 at 22.00.54_9151ba4a.jpg',
    'images/posters/09-normal poster design-01.png',
    'images/posters/09-jumma AI-01.png',
    'images/posters/09-normal poster.png',
    'images/posters/03 - Jimco poster-01.jpg',
    'images/posters/01 - facebook poster-01.jpg',
    'images/posters/salsabiila organization.jpg',
    'images/posters/al-najax_POSTER DESIGN_1_v2.jpg',
    'images/posters/al najax poster design_2.jpg',
    'images/posters/al-najax_POSTER DESIGN_1.jpg',
    'images/posters/maazin fruits.jpg',
    'images/posters/maazin fruits design 2.jpg',
    'images/posters/FURNITURE 2.jpg'
  ],
  logos: [
    'images/logos/jazeera university.png',
    'images/logos/lobby_6_10_09_2022.png',
    'images/logos/waabari2.png',
    'images/logos/waaberi hotel.png',
    'images/logos/al najax welfare organization.png',
    'images/logos/01-logo_____.png',
    'images/logos/01-logo.jpg',
    'images/logos/01-logo.png',
    'images/logos/01 LOGO BAKKA TRAINING CENTER-01.png',
    'images/logos/11 Logo1-05.png',
    'images/logos/11 Logo1-06.png',
    'images/logos/11 Logo1-04.png',
    'images/logos/11 Logo1-03.png',
    'images/logos/11 Logo1-02.png',
    'images/logos/ALNAJAX LOGO.png'
  ],
  branding: [
    'images/branding/bakka training center/06-billboard design.png',
    'images/branding/bakka training center/17-calendar.jpg',
    'images/branding/bakka training center/08-tri fold brochure.png',
    'images/branding/bakka training center/09-normal fb poster.png',
    'images/branding/bakka training center/09-jumca poster.png',
    'images/branding/bakka training center/18-DESK NAME.png',
    'images/branding/bakka training center/15-stage banner.png',
    'images/branding/bakka training center/01-logo_____.png',
    'images/branding/bakka training center/18-shopping bag.jpg',
    'images/branding/bakka training center/18-bag.jpg',
    'images/branding/bakka training center/07-rollup banner.jpg',
    'images/branding/bakka training center/02-facebook cover.jpg',
    'images/branding/bakka training center/01-logo.jpg',
    'images/branding/bakka training center/18-phone_mockup_5.jpg',
    'images/branding/bakka training center/18-phone_mockup_2.jpg',
    'images/branding/bakka training center/18-white cap.png',
    'images/branding/bakka training center/01-logo.png',
    'images/branding/bakka training center/18-bakeeri.png',
    'images/branding/bakka training center/01 LOGO BAKKA TRAINING CENTER-01.png'
  ],
  'other-designs': [
    'images/other_designs/07 - rollup banner.jpg',
    'images/other_designs/14-stage baner.jpg',
    'images/other_designs/13 - bilboard.jpg',
    'images/other_designs/12 - flyer design.png',
    'images/other_designs/10 - invitation.png',
    'images/other_designs/08-letterhead.png',
    'images/other_designs/06-STAMPT RUBBER.png',
    'images/other_designs/04-BUSSINESS CARD.png',
    'images/other_designs/05-ID-Card.png',
    'images/other_designs/03 - Jimco poster.jpg',
    'images/other_designs/02-facebook cover.jpg',
    'images/other_designs/01-data service poster.jpg',
    'images/other_designs/11-logo.jpg',
    'images/other_designs/orange mockup2.jpg',
    'images/other_designs/orange mockup.jpg',
    'images/other_designs/my mock up.jpg',
    'images/other_designs/maazin fruits.jpg',
    'images/other_designs/maazin fruits design 2.jpg',
    'images/other_designs/BASHAAIR AL NUUR BOARD SPECIALIST copy.jpg',
    'images/other_designs/bashaair al nuur board design 1.2 and 2.jpg',
    'images/other_designs/menu-02.jpg',
    'images/other_designs/menu-01.jpg',
    'images/other_designs/Mockup.jpg',
    'images/other_designs/fruit slices2.jpg',
    'images/other_designs/fruit slices1.jpg',
    'images/other_designs/fruit slices.jpg',
    'images/other_designs/PHOTO MANIPULATION.jpg',
    'images/other_designs/medical pharmacy.jpg',
    'images/other_designs/dripping effect.jpg',
    'images/other_designs/albaab ifaaya.jpg',
    'images/other_designs/bill sticker.jpg',
    'images/other_designs/the right one jazeera board  .png'
  ]
};

let currentFilter = 'posters';

function renderProjects() {
  const grid = document.getElementById('portfolio-grid');
  grid.innerHTML = '';
  const images = folderImages[currentFilter] || [];
  if (images.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center text-muted">No designs found in this category.</div>';
    return;
  }
  images.forEach(imgPath => {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-lg-4';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${imgPath}" class="card-img-top" alt="Design" style="object-fit:contain;max-height:320px;width:100%;background:#181f2f;" loading="lazy">
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==== 5. Filter Tabs (Updated) ====
document.querySelectorAll('#portfolio-filters .nav-link').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#portfolio-filters .nav-link').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.filter;
    renderProjects();
  });
});

// ==== 6. Add New Project Modal & Dynamic Gallery Update ====
document.getElementById('add-project-btn').addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('addProjectModal'));
  modal.show();
});
document.getElementById('add-project-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('project-title').value.trim();
  const category = document.getElementById('project-category').value;
  const date = document.getElementById('project-date').value;
  const tools = document.getElementById('project-tools').value.trim();
  const description = document.getElementById('project-description').value.trim();
  const image = document.getElementById('project-image').value.trim();
  if (!title || !category || !date || !tools || !description || !image) return;
  projects.unshift({ title, category, date, tools, description, image });
  renderProjects();
  bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
  this.reset();
});

// ==== 7. Modal Animations (handled by Bootstrap + CSS) ====
// Add 3D hover to close button
Array.from(document.getElementsByClassName('btn-close-neon')).forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.classList.add('hovered'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('hovered'));
});

// ==== 8. Scroll-triggered Animations ====
function animateOnScroll() {
  document.querySelectorAll('[data-animate]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// ==== 9. Neon Input Focus (handled by CSS) ====
// No extra JS needed

// ==== 10. Ambient Music Toggle ====
const music = document.getElementById('ambient-music');
const musicBtn = document.getElementById('music-toggle');
let musicPlaying = false;
musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    music.play();
    musicBtn.classList.add('active');
  } else {
    music.pause();
    musicBtn.classList.remove('active');
  }
  musicPlaying = !musicPlaying;
});

// ==== 11. Initial Render (Updated) ====
renderProjects();

// ==== 12. Branding Section Rendering ====
const bakkaBrandingImages = [
  'images/01-logo_____.png',
  'images/01-logo.jpg',
  'images/01-logo.png',
  'images/01 LOGO BAKKA TRAINING CENTER-01.png',
  'images/02-facebook cover.jpg',
  'images/03-BUSINESS CARD.png',
  'images/04.jpg',
  'images/05-ID CARD.jpg',
  'images/06-billboard 2.png',
  'images/06-billboard design.png',
  'images/07-rollup banner.jpg',
  'images/08-tri fold brochure.png',
  'images/09-jumca poster.png',
  'images/09-normal fb poster.png',
  'images/10-stamp rubber.png',
  'images/11-car brand.jpg',
  'images/13-certificate award.jpg',
  'images/14-invoice.jpg',
  'images/15-stage banner.png',
  'images/17-calendar.jpg',
  'images/18-bag.jpg',
  'images/18-bakeeri.png',
  'images/18-DESK NAME.png',
  'images/18-flag.jpg',
  'images/18-flag.png',
  'images/18-pen.png',
  'images/18-phone_mockup_1.png',
  'images/18-phone_mockup_2.jpg',
  'images/18-phone_mockup_5.jpg',
  'images/18-shopping bag.jpg',
  'images/18-white cap.png'
];

function renderBrandingImages() {
  const brandingList = document.getElementById('branding-list');
  brandingList.innerHTML = '';
  bakkaBrandingImages.forEach(imgPath => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 mb-4';
    col.innerHTML = `
      <div class="glass-card p-2 h-100 d-flex flex-column align-items-center">
        <img src="${imgPath}" alt="Bakka Branding" class="img-fluid rounded mb-2" style="max-height:180px;object-fit:contain;">
        <div class="small text-center text-light">${imgPath.split('/').pop()}</div>
      </div>
    `;
    brandingList.appendChild(col);
  });
}

window.addEventListener('DOMContentLoaded', renderBrandingImages); 