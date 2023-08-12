import { setupCarouselAnimation } from './carousel';
import style from './styles/style.css';
import { ThemeTogglerService, ThemePersistenceService } from './themeSwitcher';
import '/src/themeSwitcher';

/** @type NodeListOf<HTMLDivElement> */
const carousels = document.querySelectorAll('.carousel');
setupCarouselAnimation(carousels[0]);

export const themeToggleButton = document.querySelector('#theme-toggle');

const themeTogglerService = new ThemeTogglerService(
  themeToggleButton,
  new ThemePersistenceService(),
);
themeTogglerService.applyPreferredThemeIfDefined();
