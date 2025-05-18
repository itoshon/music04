$('.main__voice-container').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  prevArrow: $('.voice-arrow--prev'),
  nextArrow: $('.voice-arrow--next'),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,    // SP は 1 枚
        slidesToScroll: 1
      }
    }
  ]
});

