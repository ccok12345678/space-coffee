export default function hideElement(el) {
  const elAutohide = document.querySelector(el);

  const navbarHeight = document.querySelector(el).offsetHeight;
  document.body.style.paddingTop = `${navbarHeight} + px`;

  if (elAutohide) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      if (scrollTop <= lastScrollTop) {
        elAutohide.classList.remove('scroll-down');
        elAutohide.classList.add('scroll-up');
      } else {
        elAutohide.classList.add('scroll-down');
        elAutohide.classList.remove('scroll-up');
      }
      lastScrollTop = scrollTop;
    });
  }
}
