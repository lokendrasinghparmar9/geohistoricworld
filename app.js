// Geo Historic World - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initCategoryTabs();
  initSearch();
  renderVideos(SITE_DATA.videos);
  renderShorts(SITE_DATA.shorts);
  initTimeline();
  initQuiz();
  initModal();
  initGlobe();
  initNewsletter();
  initContactForm();
});

// Category Tab Filters
let activeCategory = 'all';
let searchQuery = '';

function initCategoryTabs() {
  const tabsGroup = document.getElementById('tabsGroup');
  if (!tabsGroup) return;

  tabsGroup.innerHTML = SITE_DATA.categories.map(cat => `
    <button class="tab-btn ${cat.id === activeCategory ? 'active' : ''}" data-id="${cat.id}">
      ${cat.name}
    </button>
  `).join('');

  tabsGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.id;
    filterAndRenderVideos();
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterAndRenderVideos();
  });
}

function filterAndRenderVideos() {
  let filtered = SITE_DATA.videos;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(v => v.category === activeCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(v =>
      v.title.toLowerCase().includes(searchQuery) ||
      v.description.toLowerCase().includes(searchQuery) ||
      v.tags.some(t => t.toLowerCase().includes(searchQuery))
    );
  }

  renderVideos(filtered);
}

function renderVideos(videos) {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;

  if (videos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 12px; color: var(--accent-gold);"></i>
        <h3>No documentary videos found</h3>
        <p>Try clearing your search filters or selecting another category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = videos.map(video => `
    <div class="video-card glass-panel" onclick="openVideoModal('${video.id}')">
      <div class="thumb-container">
        <img src="${video.thumbnail}" alt="${video.title}" class="thumb-img" loading="lazy">
        <span class="duration-badge">${video.duration}</span>
        <div class="play-overlay">
          <div class="play-btn-circle"><i class="fas fa-play"></i></div>
        </div>
      </div>
      <div class="video-info">
        <h3 class="video-title">${video.title}</h3>
        <div class="video-meta">
          <span><i class="fas fa-eye"></i> ${video.views}</span>
          <span>•</span>
          <span><i class="far fa-clock"></i> ${video.published}</span>
        </div>
        <p class="video-desc">${video.description}</p>
        <div class="video-tags">
          ${video.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderShorts(shorts) {
  const shortsGrid = document.getElementById('shortsGrid');
  if (!shortsGrid) return;

  shortsGrid.innerHTML = shorts.map(short => `
    <div class="short-card" onclick="openVideoModal('${short.id}', true)">
      <span class="short-badge"><i class="fab fa-youtube"></i> Short</span>
      <h4 class="short-title">${short.title}</h4>
      <span class="short-views"><i class="fas fa-play"></i> ${short.views}</span>
    </div>
  `).join('');
}

// Timeline Navigation
let activeTimelineIndex = 1;

function initTimeline() {
  const timelineNav = document.getElementById('timelineNav');
  if (!timelineNav) return;

  timelineNav.innerHTML = SITE_DATA.timelineEvents.map((evt, idx) => `
    <button class="timeline-node ${idx === activeTimelineIndex ? 'active' : ''}" onclick="selectTimelineIndex(${idx})">
      <div class="node-dot"></div>
      <span class="node-year">${evt.year}</span>
    </button>
  `).join('');

  updateTimelineDisplay();
}

window.selectTimelineIndex = function(index) {
  activeTimelineIndex = index;
  document.querySelectorAll('.timeline-node').forEach((node, idx) => {
    node.classList.toggle('active', idx === index);
  });
  updateTimelineDisplay();
};

function updateTimelineDisplay() {
  const evt = SITE_DATA.timelineEvents[activeTimelineIndex];
  if (!evt) return;

  const display = document.getElementById('timelineDisplay');
  if (!display) return;

  display.innerHTML = `
    <div>
      <div class="section-tag">${evt.year} ERA</div>
      <h3 class="timeline-content-title">${evt.title}</h3>
      <div class="timeline-region"><i class="fas fa-map-marker-alt"></i> ${evt.region}</div>
      <p class="timeline-text">${evt.description}</p>
      <div class="key-fact-box">
        <strong><i class="fas fa-lightbulb"></i> Historical Insight:</strong> ${evt.keyFact}
      </div>
      <button class="btn-primary" onclick="openVideoModal('${evt.relatedVideoId}')">
        <i class="fas fa-film"></i> Watch Epoch Documentary
      </button>
    </div>
    <div class="glass-panel" style="padding: 24px; text-align: center;">
      <i class="fas fa-globe-americas" style="font-size: 5rem; color: var(--accent-gold); margin-bottom: 16px;"></i>
      <h4 style="margin-bottom: 8px;">Cartographic Archive</h4>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Map rendering layer tuned for ${evt.year}. Discover territorial boundaries and key conflict points.</p>
    </div>
  `;
}

// Geo Quiz Machine
let currentQuestionIndex = 0;
let score = 0;
let questionAnswered = false;

function initQuiz() {
  renderQuestion();
}

function renderQuestion() {
  const q = SITE_DATA.quizQuestions[currentQuestionIndex];
  if (!q) return;

  questionAnswered = false;
  const total = SITE_DATA.quizQuestions.length;

  document.getElementById('quizProgressText').innerText = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById('quizProgressFill').style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;
  document.getElementById('quizQuestionText').innerText = q.question;

  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="quiz-option-btn" onclick="checkAnswer(${idx})">
      <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
    </button>
  `).join('');

  document.getElementById('quizExplanation').style.display = 'none';
  document.getElementById('quizNextBtn').style.display = 'none';
}

window.checkAnswer = function(selectedIndex) {
  if (questionAnswered) return;
  questionAnswered = true;

  const q = SITE_DATA.quizQuestions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.quiz-option-btn');

  buttons.forEach((btn, idx) => {
    btn.classList.add('disabled');
    if (idx === q.correctIndex) {
      btn.classList.add('selected-correct');
    } else if (idx === selectedIndex) {
      btn.classList.add('selected-wrong');
    }
  });

  if (selectedIndex === q.correctIndex) {
    score++;
  }

  const expBox = document.getElementById('quizExplanation');
  expBox.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
  expBox.style.display = 'block';

  const nextBtn = document.getElementById('quizNextBtn');
  if (currentQuestionIndex < SITE_DATA.quizQuestions.length - 1) {
    nextBtn.innerText = 'Next Question →';
  } else {
    nextBtn.innerText = 'View Quiz Score 🎉';
  }
  nextBtn.style.display = 'inline-flex';
};

window.nextQuizQuestion = function() {
  if (currentQuestionIndex < SITE_DATA.quizQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showQuizResults();
  }
};

function showQuizResults() {
  const total = SITE_DATA.quizQuestions.length;
  const quizBox = document.getElementById('quizBox');
  quizBox.innerHTML = `
    <div style="text-align: center; padding: 20px 0;">
      <i class="fas fa-trophy" style="font-size: 4rem; color: var(--accent-gold); margin-bottom: 16px;"></i>
      <h3 style="font-size: 2rem; margin-bottom: 8px;">Quiz Completed!</h3>
      <p style="color: var(--text-muted); margin-bottom: 24px;">You scored <strong>${score} out of ${total}</strong> in Geo-History Trivia.</p>
      <button class="btn-primary" onclick="restartQuiz()">
        <i class="fas fa-redo"></i> Retake Quiz
      </button>
    </div>
  `;
}

window.restartQuiz = function() {
  currentQuestionIndex = 0;
  score = 0;
  location.reload();
};

// Video Modal Player
function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  if (!backdrop) return;

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}

window.openVideoModal = function(videoId, isShort = false) {
  let video = SITE_DATA.videos.find(v => v.id === videoId);
  if (!video && isShort) {
    video = SITE_DATA.shorts.find(s => s.id === videoId);
  }
  if (!video) video = SITE_DATA.videos[0];

  const backdrop = document.getElementById('modalBackdrop');
  const wrapper = document.getElementById('modalVideoWrapper');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');

  wrapper.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
  `;

  title.innerText = video.title;
  desc.innerText = video.description || `Enjoy this documentary brought to you by Geo Historic World.`;

  backdrop.classList.add('open');
};

window.closeModal = function() {
  const backdrop = document.getElementById('modalBackdrop');
  const wrapper = document.getElementById('modalVideoWrapper');
  if (backdrop) backdrop.classList.remove('open');
  if (wrapper) wrapper.innerHTML = '';
};

// Globe Initialization
function initGlobe() {
  new GeoGlobe('globeCanvas', SITE_DATA.globeHotspots, (pin) => {
    showToast(`📍 Selected ${pin.name}: ${pin.title}`);
  });
}

// Newsletter
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value) {
      showToast(`✨ Thanks for subscribing to Geo Historic World updates!`);
      input.value = '';
    }
  });
}

// Contact Form & Email Copying
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    showToast(`✉️ Message sent! Thank you ${name}, we will respond shortly.`);
    form.reset();
  });
}

window.copyEmailToClipboard = function() {
  const email = SITE_DATA.channelInfo.contactEmail;
  navigator.clipboard.writeText(email).then(() => {
    showToast(`📋 Email address copied to clipboard: ${email}`);
  }).catch(() => {
    showToast(`✉️ Email address: ${email}`);
  });
};

window.showToast = function(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-gold)"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
};

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    el.style.opacity = 1;
  });
}
