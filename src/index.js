import { setupCarouselAnimation } from './carousel';
import style from './styles/style.css';

/** @type NodeListOf<HTMLDivElement> */
const carousels = document.querySelectorAll('.carousel');
setupCarouselAnimation(carousels[0]);