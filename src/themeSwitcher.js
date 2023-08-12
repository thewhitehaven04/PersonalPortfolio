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

    this.prefersDarkSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    this.isOverridden = Boolean(
      themePersistenceService.getPreferredThemeFromLocalStorage(),
    );

    this.prefersDarkSchemeQuery.addEventListener('change', (e) => {
      const isDarkTheme = e.matches;
      if (!this.isOverridden) {
        this.#setTheme(isDarkTheme);
        this.#setButtonTheme(isDarkTheme);
      }
    });

    this.toggleButton?.addEventListener('click', this.#toggleOnClick);
  }

  #toggleOnClick(e) {
    const currentUserPreferredTheme =
      this.themePersistenceService.getPreferredThemeFromLocalStorage();
    const theme =
      currentUserPreferredTheme ?? this.prefersDarkSchemeQuery
        ? 'dark'
        : 'light';
    const isDarkTheme = theme === 'dark';
    this.#setPreferredTheme(!isDarkTheme);
  }

  /** @param {boolean} isDarkTheme */
  #setButtonTheme(isDarkTheme) {
    this.button?.replaceChildren(getIconForTheme(isDarkTheme));
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

  applyPreferredThemeIfDefined() {
    const isDefined =
      this.themePersistenceService.getPreferredThemeFromLocalStorage();
    if (isDefined) {
      const isDarkTheme = isDefined === 'dark';
      this.#setButtonTheme(isDarkTheme);
      this.#setTheme(isDarkTheme);
    }
  }
}
