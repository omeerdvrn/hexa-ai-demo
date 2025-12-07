import abstract from "@/assets/images/logo-styles/abstract.png";
import mascot from "@/assets/images/logo-styles/mascot.png";
import monogram from "@/assets/images/logo-styles/monogram.png";

/**
 * Logo style names mapping
 */
export const LogoStyleName = Object.freeze({
  [0]: "No Style",
  [1]: "Monogram",
  [2]: "Abstract",
  [3]: "Mascot",
});

/**
 * Complete logo style configuration with images and metadata
 */
export const LOGO_STYLE_OPTIONS = Object.freeze([
  {
    id: 0,
    name: LogoStyleName[0],
    image: null,
    imageUrl: "",
  },
  {
    id: 1,
    name: LogoStyleName[1],
    image: monogram,
    imageUrl: "",
  },
  {
    id: 2,
    name: LogoStyleName[2],
    image: abstract,
    imageUrl: "",
  },
  {
    id: 3,
    name: LogoStyleName[3],
    image: mascot,
    imageUrl: "",
  },
]);
