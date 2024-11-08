loadSlider = async () => {
    const sliderApi = new SliderApi();
    await sliderApi.getAll(function (data) {
        const slideItemTemplate = document.getElementById("slide-item-template").innerHTML;
        const slidesBox = document.getElementById("slides-box");
        for (let index = 0; index < data.length; index++) {
            let template = slideItemTemplate;
            template = template.replace(/__ID__/g, data[index].id);
            template = template.replace(/__TITLE__/g, data[index].title);
            template = template.replace(/__subTitle__/g, data[index].subTitle);
            // template = template.replace(/__link__/g, data[index].link);
            template = template.replace(/__IMG__/g, data[index].image);
            slidesBox.innerHTML += template;
        }
        prepareslide();
    });
}

prepareslide = () => {
    $('.slideshow').slideshowPlugin({
        effect: 'sliding',
        slideSpeed: 800,
        ratio: "keep",
    });

    // Typing Text
    var content = $('.copy-title').text();

    var ele = '<span>' + content.split('').join('</span><span>') + '</span>';

    $(ele).hide().appendTo('.main-title').each(function (i) {
        $(this).delay(100 * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, 100);
    });
    // End Typing text
}