import { setupCarouselAnimation } from "./carousel";
import style from "./styles/style.css";
import flex from "./styles/flex.css";
import positioning from "./styles/positioning.css";
import box from "./styles/box.css";
import { ThemeTogglerService, ThemePersistenceService } from "./themeSwitcher";
import "/src/themeSwitcher";

/** @type NodeListOf<HTMLDivElement> */
const carousels = document.querySelectorAll(".carousel");
carousels.forEach((carousel) => setupCarouselAnimation(carousel));

const themeToggleButton = document.querySelector("#theme-toggle");
const body = document.querySelector("body");

const themeTogglerService = new ThemeTogglerService(
  themeToggleButton,
  body,
  new ThemePersistenceService()
);
themeTogglerService.applyUserPreferredThemeIfDefined();
