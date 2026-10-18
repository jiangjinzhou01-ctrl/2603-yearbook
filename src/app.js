import { animate, scroll } from 'motion';

// Native document scrolling is the only input. No preventDefault, scroll-jacking,
// touch handlers, dragging handles or fixed controls. Motion only observes it.
const cover = document.querySelector('.cover');
const coming = document.querySelector('.coming');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let dispose = [];

function configureMotion() {
  dispose.forEach(cancel => cancel());
  dispose = [];
  if (preference.matches) return;

  const mobile = matchMedia('(max-width: 640px)').matches;
  const distance = mobile ? 45 : 90;
  for (const [name, x, y, rotation] of [
    ['classroom', -distance * .3, -distance, -3],
    ['sky', distance * .3, -distance * 1.6, 7],
  ]) {
    const el = document.querySelector(`[data-photo="${name}"]`);
    const animation = animate(el, {
      x: [0, x], y: [0, y], rotate: [0, rotation],
    }, { ease: 'linear' });
    dispose.push(scroll(animation, { target: cover, offset: ['start start', 'end start'] }));
    dispose.push(() => animation.cancel());
  }

  const numeral = animate('.class-numeral', { y: [0, -distance * .6] }, { ease: 'linear' });
  dispose.push(scroll(numeral, { target: cover, offset: ['start start', 'end start'] }));
  dispose.push(() => numeral.cancel());

  const reveal = animate('.coming-content', { opacity: [.18, 1], y: [42, 0] }, { ease: 'linear' });
  dispose.push(scroll(reveal, { target: coming, offset: ['start .95', 'start .3'] }));
  dispose.push(() => reveal.cancel());
}

configureMotion();
preference.addEventListener('change', configureMotion);
// A page restored from bfcache keeps its current native scroll position.
addEventListener('pagehide', event => {
  if (!event.persisted) {
    dispose.forEach(cancel => cancel());
    preference.removeEventListener('change', configureMotion);
  }
}, { once: true });

// A failed image never leaves a broken-image icon or blocks text/scrolling.
document.querySelectorAll('.memory img').forEach(img => {
  const fallback = () => {
    img.style.visibility = 'hidden';
    img.closest('.memory').classList.add('image-unavailable');
  };
  img.addEventListener('error', fallback, { once: true });
  if (img.complete && !img.naturalWidth) fallback();
});
