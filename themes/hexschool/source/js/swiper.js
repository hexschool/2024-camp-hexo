const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 28,
  loop: true,
  
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    }
  },

  pagination: {
    el: '.swiper-pagination',
    renderBullet: function (index, className) {
      return `<span 
      class="${className} rounded-circle bg-primary-900"
      style="width: 12px; height: 12px;"
      ></span>`;
    },
  },
  
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});