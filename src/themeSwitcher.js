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

export class ThemePersistenceService {
  getPreferredThemeFromLocalStorage() {
    return localStorage.getItem(PREFERRED_THEME_KEY);
  }

  savePreferredThemeToLocalStorage(theme) {
    localStorage.setItem(PREFERRED_THEME_KEY, theme);
  }
}
export class ThemeTogglerService {
  /**
   * @param {?Element} button
   * @param {ThemePersistenceService} themePersistenceService
   */
  constructor(button, themePersistenceService) {
    this.themePersistenceService = themePersistenceService;

    this.toggleButton = button;
    this.bodyElement = document.querySelector('body');

    this.systemPreferredDarkSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    const initialPreferred =
      themePersistenceService.getPreferredThemeFromLocalStorage();
    if (initialPreferred) {
      this.#setButtonTheme(initialPreferred === 'dark');
    } else {
      this.#setButtonTheme(this.isCurrentSystemPreferredThemeDark() === 'dark');
    }

    this.systemPreferredDarkSchemeQuery.addEventListener('change', (e) => {
      const isDarkTheme = this.isCurrentSystemPreferredThemeDark() === 'dark';
      if (!initialPreferred) {
        this.#setTheme(isDarkTheme);
        this.#setButtonTheme(isDarkTheme);
      }
    });

    this.toggleButton?.addEventListener('click', this.#toggleOnClick);
  }

  isCurrentSystemPreferredThemeDark = () =>
    this.systemPreferredDarkSchemeQuery.matches ? 'dark' : 'light';

  #toggleOnClick = () => {
    const currentUserPreferredTheme =
      this.themePersistenceService.getPreferredThemeFromLocalStorage();
    const theme =
      currentUserPreferredTheme ?? this.isCurrentSystemPreferredThemeDark();
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
    this.themePersistenceService.savePreferredThemeToLocalStorage(
      preferredTheme,
    );
  }

  applyUserPreferredThemeIfDefined() {
    const isDefined =
      this.themePersistenceService.getPreferredThemeFromLocalStorage();
    if (isDefined) {
      const isDarkTheme = isDefined === 'dark';
      this.#setButtonTheme(isDarkTheme);
      this.#setTheme(isDarkTheme);
    }
  }
}
