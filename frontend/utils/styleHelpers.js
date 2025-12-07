import { StyleSheet } from "react-native";

/**
 * Utility function to create styles with theme support
 * @param {Function} stylesFactory - Function that receives theme and returns styles object
 * @param {Object} theme - Theme object
 * @returns {Object} StyleSheet object with performance optimization
 */
export const createThemedStyles = (stylesFactory, theme) => {
  const styles = stylesFactory(theme);
  // Always use StyleSheet.create for performance optimization
  return StyleSheet.create(styles);
};

/**
 * Utility to get color with opacity
 * @param {string} color - Base color (hex or rgb)
 * @param {number} opacity - Opacity value (0-1)
 * @returns {string} Color with opacity
 */
export const getColorWithOpacity = (color, opacity) => {
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (color.startsWith("rgba")) {
    return color.replace(/,\s*[\d.]+\)/, `, ${opacity})`);
  }

  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  return color;
};

/**
 * Utility to create responsive spacing
 * @param {Object} spacing - Theme spacing object
 * @param {number|Object} value - Spacing value or object with directional values
 * @returns {Object} Spacing styles
 */
export const createSpacing = (spacing, value) => {
  if (typeof value === "number") {
    return {
      margin: spacing[value] || value,
    };
  }

  const styles = {};
  if (value.top !== undefined) styles.marginTop = spacing[value.top] || value.top;
  if (value.bottom !== undefined) styles.marginBottom = spacing[value.bottom] || value.bottom;
  if (value.left !== undefined) styles.marginLeft = spacing[value.left] || value.left;
  if (value.right !== undefined) styles.marginRight = spacing[value.right] || value.right;
  if (value.horizontal !== undefined) {
    styles.marginHorizontal = spacing[value.horizontal] || value.horizontal;
  }
  if (value.vertical !== undefined) {
    styles.marginVertical = spacing[value.vertical] || value.vertical;
  }

  return styles;
};

/**
 * Utility to create responsive padding
 * @param {Object} spacing - Theme spacing object
 * @param {number|Object} value - Padding value or object with directional values
 * @returns {Object} Padding styles
 */
export const createPadding = (spacing, value) => {
  if (typeof value === "number") {
    return {
      padding: spacing[value] || value,
    };
  }

  const styles = {};
  if (value.top !== undefined) styles.paddingTop = spacing[value.top] || value.top;
  if (value.bottom !== undefined) styles.paddingBottom = spacing[value.bottom] || value.bottom;
  if (value.left !== undefined) styles.paddingLeft = spacing[value.left] || value.left;
  if (value.right !== undefined) styles.paddingRight = spacing[value.right] || value.right;
  if (value.horizontal !== undefined) {
    styles.paddingHorizontal = spacing[value.horizontal] || value.horizontal;
  }
  if (value.vertical !== undefined) {
    styles.paddingVertical = spacing[value.vertical] || value.vertical;
  }

  return styles;
};

/**
 * Utility to merge theme styles with custom styles
 * @param {Object} themeStyles - Styles from theme
 * @param {Object} customStyles - Custom styles to merge
 * @returns {Object} Merged styles
 */
export const mergeStyles = (themeStyles, customStyles = {}) => {
  return { ...themeStyles, ...customStyles };
};
