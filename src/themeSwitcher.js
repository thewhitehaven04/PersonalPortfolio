import { icon } from '@fortawesome/fontawesome-svg-core';

export const prefersDarkSchemeQuery = window.matchMedia(
  '(prefers-color-scheme: dark)',
);
/**
 * @param {Boolean} matchesDark
 */
export const getToggleIconButton = (matchesDark) => {
  const placeholderNode = document.createElement('div');
  let buttonIcon;
  if (matchesDark) {
    buttonIcon = icon({ iconName: 'sun', prefix: 'fas' });
  } else {
    buttonIcon = icon({ iconName: 'moon', prefix: 'fas' });
  }

  placeholderNode.appendChild(buttonIcon.node[0]);
  return placeholderNode;
};

/**
 * @param {MediaQueryListEvent} e
 * @param {HTMLButtonElement} button
 */
export const toggleThemeSwitcherButtonOnPreferSchemeChange = (e, button) => {
  button?.replaceChildren(getToggleIconButton(e.matches));
};
