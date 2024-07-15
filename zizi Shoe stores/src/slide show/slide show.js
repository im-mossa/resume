const slideshowDuration = 8000;
const slideshow = document.querySelector('.main-content .slideshow');

function slideshowSwitch(slideshow, index, auto) {
    if (slideshow.dataset.wait === "true") return;

    const slides = slideshow.querySelectorAll('.slide');
    const pages = slideshow.querySelectorAll('.pagination .item');
    const activeSlide = slideshow.querySelector('.slide.is-active');
    const activeSlideImage = activeSlide.querySelector('.image-container');
    const newSlide = slides[index];
    const newSlideImage = newSlide.querySelector('.image-container');
    const newSlideContent = newSlide.querySelector('.slide-content');
    const newSlideElements = newSlide.querySelectorAll('.caption > *');
    if (newSlide === activeSlide) return;

    newSlide.classList.add('is-new');
    clearTimeout(slideshow.dataset.timeout);
    slideshow.dataset.wait = "true";

    let newSlideRight, newSlideLeft, newSlideImageRight, newSlideImageLeft, newSlideImageToRight, newSlideImageToLeft, newSlideContentLeft, newSlideContentRight, activeSlideImageLeft;

    if (index > Array.prototype.indexOf.call(slides, activeSlide)) {
        newSlideRight = 0;
        newSlideLeft = 'auto';
        newSlideImageRight = -slideshow.clientWidth / 8;
        newSlideImageLeft = 'auto';
        newSlideImageToRight = 0;
        newSlideImageToLeft = 'auto';
        newSlideContentLeft = 'auto';
        newSlideContentRight = 0;
        activeSlideImageLeft = -slideshow.clientWidth / 4;
    } else {
        newSlideRight = 'auto';
        newSlideLeft = 0;
        newSlideImageRight = 'auto';
        newSlideImageLeft = -slideshow.clientWidth / 8;
        newSlideImageToRight = 'auto';
        newSlideImageToLeft = 0;
        newSlideContentLeft = 0;
        newSlideContentRight = 'auto';
        activeSlideImageLeft = slideshow.clientWidth / 4;
    }

    newSlide.style.cssText = `
        display: block;
        width: 0;
        right: ${newSlideRight};
        left: ${newSlideLeft};
        z-index: 2;
    `;
    newSlideImage.style.cssText = `
        width: ${slideshow.clientWidth}px;
        right: ${newSlideImageRight};
        left: ${newSlideImageLeft};
    `;
    newSlideContent.style.cssText = `
        width: ${slideshow.clientWidth}px;
        left: ${newSlideContentLeft};
        right: ${newSlideContentRight};
    `;
    activeSlideImage.style.left = 0;

    // Animation using CSS
    activeSlideImage.style.transition = "left 1s ease-in-out";
    activeSlideImage.style.left = `${activeSlideImageLeft}px`;

    newSlide.style.transition = "width 1s ease-in-out";
    newSlide.style.width = `${slideshow.clientWidth}px`;

    newSlideImage.style.transition = "right 1s ease-in-out, left 1s ease-in-out";
    newSlideImage.style.right = `${newSlideImageToRight}`;
    newSlideImage.style.left = `${newSlideImageToLeft}`;

    newSlideElements.forEach((el, i) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(60px)";
        setTimeout(() => {
            el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, 600 + (i * 100));
    });

    setTimeout(() => {
        newSlide.classList.add('is-active');
        newSlide.classList.remove('is-new');
        activeSlide.classList.remove('is-active');
        newSlide.style.cssText = '';
        newSlideImage.style.cssText = '';
        newSlideContent.style.cssText = '';
        newSlideElements.forEach(el => {
            el.style.cssText = '';
        });
        activeSlideImage.style.left = '';

        pages.forEach(page => page.classList.remove('is-active'));
        pages[index].classList.add('is-active');
        slideshow.dataset.wait = "false";
        if (auto) {
            const timeout = setTimeout(() => {
                slideshowNext(slideshow, false, true);
            }, slideshowDuration);
            slideshow.dataset.timeout = timeout;
        }
    }, 1000);
}

function slideshowNext(slideshow, previous, auto) {
    const slides = slideshow.querySelectorAll('.slide');
    const activeSlide = slideshow.querySelector('.slide.is-active');
    let newSlide = null;
    if (previous) {
        newSlide = activeSlide.previousElementSibling;
        if (!newSlide) {
            newSlide = slides[slides.length - 1];
        }
    } else {
        newSlide = activeSlide.nextElementSibling;
        if (!newSlide) {
            newSlide = slides[0];
        }
    }
    slideshowSwitch(slideshow, Array.prototype.indexOf.call(slides, newSlide), auto);
}

function homeSlideshowParallax() {
    const scrollTop = window.scrollY;
    if (scrollTop > window.innerHeight) return;
    const inner = slideshow.querySelector('.slideshow-inner');
    const newHeight = window.innerHeight - (scrollTop / 2);
    const newTop = scrollTop * 0.8;

    inner.style.transform = `translateY(${newTop}px)`;
    inner.style.height = `${newHeight}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slide').forEach(slide => slide.classList.add('is-loaded'));

    document.querySelectorAll('.slideshow .arrows .arrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            slideshowNext(this.closest('.slideshow'), this.classList.contains('prev'));
        });
    });

    document.querySelectorAll('.slideshow .pagination .item').forEach((item, index) => {
        item.addEventListener('click', function() {
            slideshowSwitch(this.closest('.slideshow'), index);
        });
    });

    document.querySelector('.slideshow .pagination').addEventListener('check', function() {
        const slideshow = this.closest('.slideshow');
        const pages = this.querySelectorAll('.item');
        const index = Array.prototype.indexOf.call(slideshow.querySelectorAll('.slide'), slideshow.querySelector('.slide.is-active'));
        pages.forEach(page => page.classList.remove('is-active'));
        pages[index].classList.add('is-active');
    });

    const timeout = setTimeout(() => {
        slideshowNext(slideshow, false, true);
    }, slideshowDuration);

    slideshow.dataset.timeout = timeout;

    setInterval(() => {
        slideshowNext(slideshow, false, true);
    }, slideshowDuration);
});

if (document.querySelectorAll('.main-content .slideshow').length > 1) {
    window.addEventListener('scroll', homeSlideshowParallax);
}
