const menuIcon = document.getElementById('menuIcon');
const taskbar = document.getElementById('taskbar');
const iconSpan = menuIcon.querySelector('.icon');
const overlay = document.getElementById('overlay');
const taskbarItems = document.querySelectorAll('.taskbar-item');
const sections = document.querySelectorAll('.section');
let isTaskbarVisible = false;

function toggleTaskbar() {
    isTaskbarVisible = !isTaskbarVisible;
    isTaskbarVisible ? showTaskbar() : hideTaskbar();
}

function showTaskbar() {
    taskbar.classList.add('show');
    overlay.classList.add('show');
    menuIcon.classList.add('active');
    iconSpan.className = 'icon close-icon'; 
}

function hideTaskbar() {
    taskbar.classList.remove('show');
    overlay.classList.remove('show');
    menuIcon.classList.remove('active');
    menuIcon.innerHTML = '<span class="hamburger-icon">☰</span>';  
    isTaskbarVisible = false;
}

document.addEventListener('click', function (event) {
    if (isTaskbarVisible && !taskbar.contains(event.target) && event.target !== menuIcon) {
        hideTaskbar();
    }
});

taskbarItems.forEach(item => {
    item.addEventListener('click', function () {
        const sectionId = this.dataset.section;
        showSection(sectionId);
        hideTaskbar();
    });

    item.addEventListener('mousedown', () => item.classList.add('pressed'));
    item.addEventListener('mouseup', () => item.classList.remove('pressed'));
    item.addEventListener('mouseleave', () => item.classList.remove('pressed'));
});

function showSection(sectionId) {
    const sectionMap = {
        'profile': 'section-profiles',
        'skills': 'section-skill',
        'hobby': 'section-hobby',
        'experience': 'section-experiencestory'
    };

    taskbarItems.forEach(item => item.classList.remove('active'));

    const targetSectionClass = sectionMap[sectionId];
    if (targetSectionClass) {
        const targetSection = document.querySelector(`.${targetSectionClass}`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    const clickedItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        hideTaskbar();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    menuIcon.innerHTML = '<span class="hamburger-icon">☰</span>';
    const firstItem = document.querySelector('[data-section="profile"]');
    if (firstItem) {
        firstItem.classList.add('active');
    }
    showSlide(currentSlideIndex);
});

// Gallery slider logic
let currentSlideIndex = 1;
const totalSlides = 4;

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function nextSlide() {
    showSlide(++currentSlideIndex);
}

function previousSlide() {
    showSlide(--currentSlideIndex);
}

function showSlide(n) {
    const indicators = document.querySelectorAll('.indicator');
    const galleryTrack = document.getElementById('galleryTrack');

    if (n > totalSlides) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = totalSlides;

    if (galleryTrack) {
        const translateX = -(currentSlideIndex - 1) * 25;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
    }

    indicators.forEach(ind => ind.classList.remove('active'));
    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') previousSlide();
    else if (event.key === 'ArrowRight') nextSlide();
});

let startX = 0;
let endX = 0;

document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : previousSlide();
});

menuIcon.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    this.classList.add('active');
    setTimeout(() => this.classList.remove('active'), 200);

    toggleTaskbar();
});

function resizeOverlay() {
    const overlay = document.getElementById('dark-overlay');
    const totalHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const height = totalHeight - viewportHeight;

    overlay.style.height = (height > 0 ? height : 0) + 'px';
  }

  window.addEventListener('load', resizeOverlay);
  window.addEventListener('resize', resizeOverlay);