const menuIcon = document.getElementById('menuIcon');
const taskbar = document.getElementById('taskbar');
let isTaskbarVisible = false;

menuIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleTaskbar();
});

function toggleTaskbar() {
    isTaskbarVisible = !isTaskbarVisible;

    if (isTaskbarVisible) {
        taskbar.classList.add('show');
    } else {
        taskbar.classList.remove('show');
    }
}

document.addEventListener('click', function (event) {
    if (isTaskbarVisible &&
        !taskbar.contains(event.target) &&
        event.target !== menuIcon) {

        taskbar.classList.remove('show');
        isTaskbarVisible = false;
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });

        if (window.innerWidth < 768) {
            toggleTaskbar();
        }
    }
}


document.querySelectorAll(".taskbar-item").forEach(item => {
    item.addEventListener("click", function () {
        document.getElementById("skills-container").scrollIntoView({ behavior: "smooth" });
    });
});





function showDetails(skill) {
    const details = document.getElementById(skill + '-details');
    if (!details) {
        console.warn('Element not found:', skill + '-details');
        return;
    }

    const clickedSkillcard = details.closest('.skillcard1, .skillcard2');

    if (clickedSkillcard.classList.contains('skillcard1')) {

        const skillcard2Details = document.querySelectorAll('.skillcard2 .skill-details');
        skillcard2Details.forEach(detail => {
            detail.classList.remove('show');
        });

        const skillcard1Details = document.querySelectorAll('.skillcard1 .skill-details');
        skillcard1Details.forEach(detail => {
            if (detail.id !== skill + '-details') {
                detail.classList.remove('show');
            }
        });

    } else if (clickedSkillcard.classList.contains('skillcard2')) {

        const skillcard1Details = document.querySelectorAll('.skillcard1 .skill-details');
        skillcard1Details.forEach(detail => {
            detail.classList.remove('show');
        });

        const skillcard2Details = document.querySelectorAll('.skillcard2 .skill-details');
        skillcard2Details.forEach(detail => {
            if (detail.id !== skill + '-details') {
                detail.classList.remove('show');
            }
        });
    }

    details.classList.toggle('show');
}


let currentSlideIndex = 1;
const totalSlides = 3;

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function nextSlide() {
    showSlide(currentSlideIndex += 1);
}

function previousSlide() {
    showSlide(currentSlideIndex -= 1);
}

function showSlide(n) {
    const indicators = document.querySelectorAll('.indicator');
    const galleryTrack = document.getElementById('galleryTrack');

    if (n > totalSlides) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = totalSlides;
    }

    if (galleryTrack) {
        const translateX = -(currentSlideIndex - 1) * 33;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
    }

    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    if (indicators[currentSlideIndex - 1]) {
        indicators[currentSlideIndex - 1].classList.add('active');
    }
}

function autoSlide() {
    nextSlide();
}

document.addEventListener('DOMContentLoaded', function () {
    showSlide(currentSlideIndex);

});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        previousSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});

let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function (event) {
    startX = event.touches[0].clientX;
});

document.addEventListener('touchend', function (event) {
    endX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }
}





function hideGallery() {
    const imageGallery = document.querySelector('.image-gallery');

    if (imageGallery) {
        imageGallery.style.display = 'none';
        imageGallery.style.opacity = '0';
        imageGallery.style.visibility = 'hidden';
    }
}

function showGallery() {
    const imageGallery = document.querySelector('.image-gallery');
    const galleryTrack = document.getElementById('galleryTrack');
    const indicators = document.querySelectorAll('.indicator');

    currentSlideIndex = 1;

    if (imageGallery) {
        imageGallery.style.display = '';
        imageGallery.style.opacity = '1';
        imageGallery.style.visibility = 'visible';
    }

    if (galleryTrack) {
        galleryTrack.style.transform = 'translateX(0%)';
    }

    indicators.forEach((indicator, index) => {
        if (index === 0) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    showSlide(1);
}

function showDetails(skill) {
    hideGallery();

    const allDetails = document.querySelectorAll('.skill-details');
    allDetails.forEach(detail => {
        detail.classList.remove('show');
    });

    const targetDetail = document.getElementById(skill + '-details');
    if (targetDetail) {
        targetDetail.classList.add('show');
    }
}

function hideDetails(skill) {
    const details = document.getElementById(skill + '-details');
    if (details) {
        details.classList.remove('show');
    }

    setTimeout(() => {
        const visibleDetails = document.querySelectorAll('.skill-details.show');
        if (visibleDetails.length === 0) {
            showGallery();
        }
    }, 100);
}

document.addEventListener('mousedown', function (event) {
    const skillItem = event.target.closest('.skill-item');
    const skillCard1 = event.target.closest('.skillcard1');
    const skillCard2 = event.target.closest('.skillcard2');
    const getSkill = event.target.closest('.get-skill');

    if (skillItem) {
        hideGallery();

        const skillDetails = document.querySelectorAll('.skill-details');
        skillDetails.forEach(detail => detail.classList.remove('show'));

        const onclickAttr = skillItem.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/showDetails\('(.+?)'\)/);
            if (match) {
                const targetId = match[1];
                const targetDetail = document.getElementById(targetId + '-details');
                if (targetDetail) {
                    targetDetail.classList.add('show');
                }
            }
        }
    }
});

document.addEventListener('click', function (event) {
    const skillItem = event.target.closest('.skill-item');
    const skillCard1 = event.target.closest('.skillcard1');
    const skillCard2 = event.target.closest('.skillcard2');
    const getSkill = event.target.closest('.get-skill');
    const closeBtn = event.target.closest('.close-btn');
    const skillDetails = event.target.closest('.skill-details');
    const imageGallery = event.target.closest('.image-gallery');

    if (closeBtn) {
        return;
    }

    if (imageGallery) {
        return;
    }

    if (skillDetails && !closeBtn) {
        return;
    }

    if (!skillItem && !skillCard1 && !skillCard2 && !getSkill && !skillDetails) {
        const allDetails = document.querySelectorAll('.skill-details');
        const hasVisibleDetails = Array.from(allDetails).some(detail => detail.classList.contains('show'));

        if (hasVisibleDetails) {
            allDetails.forEach(detail => {
                detail.classList.remove('show');
            });
            showGallery();
        } else {
            const imageGallery = document.querySelector('.image-gallery');
            if (imageGallery && (imageGallery.style.display === 'none' || imageGallery.style.visibility === 'hidden')) {
                showGallery();
            }
        }
    }
});

document.addEventListener('touchstart', function (event) {
    const skillItem = event.target.closest('.skill-item');
    const skillCard1 = event.target.closest('.skillcard1');
    const skillCard2 = event.target.closest('.skillcard2');
    const getSkill = event.target.closest('.get-skill');
    const closeBtn = event.target.closest('.close-btn');
    const skillDetails = event.target.closest('.skill-details');
    const imageGallery = event.target.closest('.image-gallery');

    if (skillItem) {
        hideGallery();

        const skillDetails = document.querySelectorAll('.skill-details');
        skillDetails.forEach(detail => detail.classList.remove('show'));

        const onclickAttr = skillItem.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/showDetails\('(.+?)'\)/);
            if (match) {
                const targetId = match[1];
                const targetDetail = document.getElementById(targetId + '-details');
                if (targetDetail) {
                    targetDetail.classList.add('show');
                }
            }
        }
    }
    else if (closeBtn) {
        return;
    }
    else if (imageGallery) {
        return;
    }
    else if (skillDetails && !closeBtn) {
        return;
    }
    else if (!skillCard1 && !skillCard2 && !getSkill) {
        const allDetails = document.querySelectorAll('.skill-details');
        const hasVisibleDetails = Array.from(allDetails).some(detail => detail.classList.contains('show'));

        if (hasVisibleDetails) {
            allDetails.forEach(detail => {
                detail.classList.remove('show');
            });
            showGallery();
        } else {
            const imageGallery = document.querySelector('.image-gallery');
            if (imageGallery && (imageGallery.style.display === 'none' || imageGallery.style.visibility === 'hidden')) {
                showGallery();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    showSlide(1);
    currentSlideIndex = 1;
});

const style = document.createElement('style');
style.textContent = `
    .image-gallery {
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
`;
document.head.appendChild(style);

function selectTask(task) {
    console.log('Selected task:', task);
}