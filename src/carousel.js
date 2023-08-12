import { ANIMATION_INTERVAL } from './constants';
import '/src/themeSwitcher';

const getElementWidth = (/** @type {Element} */ element) =>
  element.getBoundingClientRect().width;

/** @param {HTMLElement} carousel */
export function setupCarouselAnimation(carousel) {
  let counter = 0;
  const itemCount = carousel.childElementCount;

  setInterval(() => {
    const offset = getElementWidth(carousel.children[0]);
    carousel.style.transform = `translateX(-${
      (counter % itemCount) * offset
    }px)`;
    counter++;
  }, ANIMATION_INTERVAL);
}
