document.addEventListener("DOMContentLoaded", function() {
      const scrollElements = document.querySelectorAll('.scroll-hidden');

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show');
          } else {
            entry.target.classList.remove('scroll-show');
          }
        });
      }, {
        threshold: 0.2
      });

      scrollElements.forEach(el => scrollObserver.observe(el));
    });