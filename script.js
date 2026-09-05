// 이미지 슬라이드에 실제 사진을 넣으려면 아래 배열에 이미지 경로를 추가하세요.
// 예: const slides = ['img/photo1.jpg', 'img/photo2.jpg'];
const slides = [];

const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');

let currentSlide = 0;
let autoplayTimer = null;

function renderSlides() {
  if (!sliderTrack) return;

  if (slides.length === 0) {
    sliderPrev.hidden = true;
    sliderNext.hidden = true;
    return;
  }

  sliderTrack.innerHTML = slides
    .map((src) => `<div class="hero-slide" style="background-image:url('${src}')"></div>`)
    .join('');

  sliderDots.innerHTML = slides
    .map((_, i) => `<button type="button" data-index="${i}" aria-label="${i + 1}번 이미지"></button>`)
    .join('');

  sliderDots.querySelectorAll('button').forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
  });

  updateSlidePosition();
  restartAutoplay();
}

function updateSlidePosition() {
  if (!sliderTrack || slides.length === 0) return;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  sliderDots.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(index) {
  if (slides.length === 0) return;
  currentSlide = (index + slides.length) % slides.length;
  updateSlidePosition();
  restartAutoplay();
}

function restartAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  if (slides.length < 2) return;
  autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
}

if (sliderPrev) sliderPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
if (sliderNext) sliderNext.addEventListener('click', () => goToSlide(currentSlide + 1));

renderSlides();

// bgm player

const bgmAudio = document.getElementById('bgmAudio');
const playerToggle = document.getElementById('playerToggle');
const playerTime = document.getElementById('playerTime');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

if (bgmAudio && playerToggle) {
  playerToggle.addEventListener('click', async () => {
    try {
      if (bgmAudio.paused) {
        await bgmAudio.play();
        playerToggle.classList.add('playing');
      } else {
        bgmAudio.pause();
        playerToggle.classList.remove('playing');
      }
    } catch (err) {
      console.warn('bgm 파일을 재생할 수 없습니다. audio/bgm.mp3 파일을 추가해주세요.', err);
    }
  });

  bgmAudio.addEventListener('timeupdate', () => {
    playerTime.textContent = formatTime(bgmAudio.currentTime);
  });

  bgmAudio.addEventListener('pause', () => {
    playerToggle.classList.remove('playing');
  });

  bgmAudio.addEventListener('ended', () => {
    playerTime.textContent = '00:00';
  });
}

// menu overlay

const menuOverlay = document.getElementById('menuOverlay');
const menuTitle = document.getElementById('menuTitle');
const menuBody = document.getElementById('menuBody');

const menuLabels = {
  home: 'SYNDROME & LIA',
  seol: 'SEOL',
  gallery: 'GALLERY',
  log: 'LOG',
  share: 'SHARE',
};

function openMenu(key) {
  if (!menuOverlay) return;
  menuTitle.textContent = menuLabels[key] || '메뉴';
  menuBody.textContent = '준비 중입니다';
  menuOverlay.classList.add('open');
  menuOverlay.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  if (!menuOverlay) return;
  menuOverlay.classList.remove('open');
  menuOverlay.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-menu]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openMenu(el.dataset.menu);
  });
});

document.querySelectorAll('[data-close="menu"]').forEach((el) => {
  el.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
