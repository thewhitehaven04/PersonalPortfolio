import { icon } from '@fortawesome/fontawesome-svg-core';

const PREFERRED_THEME_KEY = 'preferredTheme';
const DARK_THEME_CLASS_NAME = 'dark-theme';

const getIconForTheme = (/** @type {boolean} */ isDarkTheme) => {
  let buttonIcon;
  if (isDarkTheme) {
    buttonIcon = icon({ iconName: 'sun', prefix: 'fas' });
  } else {
    buttonIcon = icon({ iconName: 'moon', prefix: 'fas' });
  }
  return buttonIcon.node[0];
};

/** Saves theme preference to local storage. */
export class ThemePersistenceService {
  getPreferredTheme() {
    return localStorage.getItem(PREFERRED_THEME_KEY);
  }

  /** @param {string} theme */
  savePreferredTheme(theme) {
    localStorage.setItem(PREFERRED_THEME_KEY, theme);
  }
}
export class ThemeTogglerService {
  /**
   * @param {?Element} button
   * @param {ThemePersistenceService} themePersistenceService
   * @param {HTMLBodyElement | null} bodyElement
   */
  constructor(button, bodyElement, themePersistenceService) {
    this.themePersistenceService = themePersistenceService;
    this.toggleButton = button;
    this.bodyElement = bodyElement;

    this.systemPreferredDarkSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    const initialPreferred = this.themePersistenceService.getPreferredTheme();
    if (initialPreferred) {
      this.#setButtonTheme(initialPreferred === 'dark');
    } else {
      this.#setButtonTheme(this.getSystemPreferredTheme() === 'dark');
    }

    this.systemPreferredDarkSchemeQuery.addEventListener('change', (e) => {
      const isDarkTheme = this.getSystemPreferredTheme() === 'dark';
      if (!initialPreferred) {
        this.#setTheme(isDarkTheme);
        this.#setButtonTheme(isDarkTheme);
      }
    });

    this.toggleButton?.addEventListener('click', this.#toggleOnClick);
  }

  getSystemPreferredTheme = () =>
    this.systemPreferredDarkSchemeQuery.matches ? 'dark' : 'light';

  #toggleOnClick = () => {
    const currentUserPreferredTheme =
      this.themePersistenceService.getPreferredTheme();
    const theme = currentUserPreferredTheme ?? this.getSystemPreferredTheme();
    const isDarkTheme = theme === 'dark';
    this.#setPreferredTheme(!isDarkTheme);
  };

  /** @param {boolean} isDarkTheme */
  #setButtonTheme(isDarkTheme) {
    this.toggleButton?.replaceChildren(getIconForTheme(isDarkTheme));
  }

  /** @param {boolean} isDarkTheme */
  #setTheme(isDarkTheme) {
    if (isDarkTheme) {
      this.bodyElement?.classList.add(DARK_THEME_CLASS_NAME);
    } else {
      this.bodyElement?.classList.remove(DARK_THEME_CLASS_NAME);
    }
  }

  /** @param {boolean} isDarkTheme */
  #setPreferredTheme(isDarkTheme) {
    this.#setTheme(isDarkTheme);
    this.#setButtonTheme(isDarkTheme);

    const preferredTheme = isDarkTheme ? 'dark' : 'light';
    this.themePersistenceService.savePreferredTheme(preferredTheme);
  }

  applyUserPreferredThemeIfDefined() {
    const isDefined = this.themePersistenceService.getPreferredTheme();
    if (isDefined) {
      const isDarkTheme = isDefined === 'dark';
      this.#setButtonTheme(isDarkTheme);
      this.#setTheme(isDarkTheme);
    }
  }
}
