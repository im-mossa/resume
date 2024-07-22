document.addEventListener('DOMContentLoaded', function() {
    const selectBrand = document.getElementById("select-brand");
    const selectPriceRange = document.querySelector(".range-slider");
    const subHeadingsBrand = document.querySelector(".sub-headings-brand");
    const PriceRangeSubHeadings = document.querySelector(".Price-range-sub-headings");
    const aside = document.getElementById("aside-container");
    const minValue = document.getElementById('min-price');
    const maxValue = document.getElementById('max-price');
    const rangeTrack = document.querySelector('.range-track');
    const minThumb = document.getElementById('min-thumb');
    const maxThumb = document.getElementById('max-thumb');
    const rangeProgress = document.querySelector('.range-progress');
    const maxPrice = 25250000;
    let trackWidth;
    let isDraggingMin = false;
    let isDraggingMax = false;

    function asideHeight() {
        const isBrandVisible = selectBrand.style.display === "block";
        const isPriceRangeVisible = selectPriceRange.style.display === "block";

        if (isBrandVisible && isPriceRangeVisible) {
            aside.style.height = "510px";
            transition(aside);
        } else if (isBrandVisible) {
            aside.style.height = "350px";
            transition(aside);
        } else if (isPriceRangeVisible) {
            aside.style.height = "310px";
            transition(aside);
        } else {
            aside.style.height = "150px";
            transition(aside);
        }
    }

    function toggleDisplay(element) {
        if (element.style.display === "block") {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
        asideHeight();
    }

    function updateValues() {
        const minLeft = parseFloat(minThumb.style.left) || 0;
        const maxLeft = parseFloat(maxThumb.style.left) || trackWidth;

        const minPercent = minLeft / trackWidth;
        const maxPercent = maxLeft / trackWidth;

        const minPriceValue = Math.round(minPercent * maxPrice);
        const maxPriceValue = Math.round(maxPercent * maxPrice);

        minValue.value = !isNaN(minPriceValue) ? minPriceValue : 0;
        maxValue.value = !isNaN(maxPriceValue) ? maxPriceValue : maxPrice;

        rangeProgress.style.left = `${minLeft}px`;
        rangeProgress.style.width = `${maxLeft - minLeft}px`;
    }

    function setTrackWidth() {
        trackWidth = 170;
        minThumb.style.left = '0px';
        maxThumb.style.left = `${trackWidth}px`;
        updateValues();
    }

    window.addEventListener('resize', setTrackWidth);

    function handleMove(event) {

        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        if (!isDraggingMin && !isDraggingMax) return;
    
        const rect = rangeTrack.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const newLeft = Math.max(0, Math.min(offsetX, trackWidth));
        const minDistance = 10; // حداقل فاصله بین دو thumb
    
        if (isDraggingMin && newLeft < parseFloat(maxThumb.style.left) - minDistance) {
            minThumb.style.left = `${newLeft}px`;
        }
    
        if (isDraggingMax && newLeft > parseFloat(minThumb.style.left) + minDistance) {
            maxThumb.style.left = `${newLeft}px`;
        }
    
        updateValues();
        event.preventDefault();
    }
    
    minThumb.addEventListener('mousedown', function(event) {
        isDraggingMin = true;
        document.addEventListener('mousemove', handleMove);
        event.preventDefault();
    });

    maxThumb.addEventListener('mousedown', function(event) {
        isDraggingMax = true;
        document.addEventListener('mousemove', handleMove);
        event.preventDefault();
    });

    document.addEventListener('mouseup', function() {
        isDraggingMin = false;
        isDraggingMax = false;
        document.removeEventListener('mousemove', handleMove);

    });



    minThumb.addEventListener('touchstart', function(event) {

        isDraggingMin = true;

        document.addEventListener('touchmove', handleMove);

        event.preventDefault();

    });



    maxThumb.addEventListener('touchstart', function(event) {

        isDraggingMax = true;

        document.addEventListener('touchmove', handleMove);

        event.preventDefault();

    });



    document.addEventListener('touchend', function() {

        isDraggingMin = false;

        isDraggingMax = false;

        document.removeEventListener('touchmove', handleMove);
    });

    subHeadingsBrand.addEventListener("click", () => {
        toggleDisplay(selectBrand);
    });

    PriceRangeSubHeadings.addEventListener("click", () => {
        toggleDisplay(selectPriceRange);
    });

    // Ensure setTrackWidth runs after the page is fully loaded
    window.addEventListener('load', setTrackWidth);
});



