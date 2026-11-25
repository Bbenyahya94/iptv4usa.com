const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}

for (const plan of document.querySelectorAll('.plan[data-base]')) {
  const select = plan.querySelector('.connection-select');
  const price = plan.querySelector('.plan-price');
  const note = plan.querySelector('.plan-price-note');
  const link = plan.querySelector('.order-link');
  const discount = [0, 5, 10, 15, 20];
  const update = () => {
    const count = Number(select.value);
    const amount = (Number(plan.dataset.base) * count * (1 - discount[count - 1] / 100)).toFixed(2);
    price.textContent = `$${amount}`;
    note.textContent = `${count} connection${count === 1 ? '' : 's'} · ${discount[count - 1]}% discount`;
    const message = `Hello, I came from iptv4usa.com. I would like to order the ${plan.dataset.term} IPTV4USA subscription with ${count} connection${count === 1 ? '' : 's'} for $${amount}.`;
    link.href = `https://wa.me/212670779271?text=${encodeURIComponent(message)}`;
  };
  select.addEventListener('change', update);
  update();
}

const slider = document.querySelector('.hero-slider');
if (slider) {
  const slides = [...slider.querySelectorAll('.hero-slide')];
  const dots = [...slider.querySelectorAll('[data-slide-to]')];
  let active = 0;
  let timer;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const visible = i === active;
      slide.classList.toggle('is-active', visible);
      slide.setAttribute('aria-hidden', String(!visible));
      slide.inert = !visible;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-current', String(i === active));
    });
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden) {
      timer = setInterval(() => show(active + 1), 7000);
    }
  };
  slider.querySelector('[data-slide-prev]').addEventListener('click', () => { show(active - 1); start(); });
  slider.querySelector('[data-slide-next]').addEventListener('click', () => { show(active + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', event => { if (!slider.contains(event.relatedTarget)) start(); });
  document.addEventListener('visibilitychange', start);
  start();
}
