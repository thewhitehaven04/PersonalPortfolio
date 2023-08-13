import { setupCarouselAnimation } from './carousel';
import style from './styles/style.css';
import { ThemeTogglerService, ThemePersistenceService } from './themeSwitcher';
import '/src/themeSwitcher';

/** @type NodeListOf<HTMLDivElement> */
const carousels = document.querySelectorAll('.carousel');
setupCarouselAnimation(carousels[0]);

const themeToggleButton = document.querySelector('#theme-toggle');
const body = document.querySelector('body');

const themeTogglerService = new ThemeTogglerService(
  themeToggleButton,
  body,
  new ThemePersistenceService(),
);
themeTogglerService.applyUserPreferredThemeIfDefined();
