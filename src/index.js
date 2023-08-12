import { setupCarouselAnimation } from './carousel';
import style from './styles/style.css';
import {
  getToggleIconButton,
  prefersDarkSchemeQuery,
  toggleThemeSwitcherButtonOnPreferSchemeChange,
} from './themeSwitcher';
import '/src/themeSwitcher';

/** @type NodeListOf<HTMLDivElement> */
const carousels = document.querySelectorAll('.carousel');
setupCarouselAnimation(carousels[0]);

export const themeToggleButton = document.querySelector('#theme-toggle');
themeToggleButton?.appendChild(
  getToggleIconButton(prefersDarkSchemeQuery.matches),
);

prefersDarkSchemeQuery.addEventListener('change', (e) =>
  toggleThemeSwitcherButtonOnPreferSchemeChange(e, themeToggleButton),
);
