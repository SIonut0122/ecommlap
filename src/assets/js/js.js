document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', (e) => handleScroll(e));

    function isElementOutOfView(element) {
        var rect = element.getBoundingClientRect();
        return (
          rect.bottom < 0 ||
          rect.right < 0 ||
          rect.left > window.innerWidth ||
          rect.top > window.innerHeight
        );
      }

    function handleScroll(e) {
      if(document.querySelector('.header-main-container')) {
        let header = document.querySelector('.header-main-container');
        const headerOffsetTop = header.offsetTop;
        
        if (window.scrollY - 100  > headerOffsetTop) {
            // Add the "fixed" class to the header element
            header.classList.add('fixed');
          } else {
            // Remove the "fixed" class from the header element
            header.classList.remove('fixed');
          }
        }
    }

 
    
})