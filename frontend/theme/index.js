import { tokens } from "./tokens";

export const theme = {
  tokens,

  colors: {
    background: {
      primary: tokens.colors.neutral[950],
      secondary: tokens.colors.neutral[800],
      tertiary: tokens.colors.neutral[850],
      gradient: tokens.gradients.primary,
    },

    text: {
      primary: tokens.colors.white,
      secondary: tokens.colors.neutral[500],
      tertiary: `rgba(255, 255, 255, ${tokens.opacity[30]})`,
      placeholder: `rgba(255, 255, 255, ${tokens.opacity[40]})`,
      onPrimary: tokens.colors.white,
    },

    interactive: {
      primary: tokens.colors.primary[500],
      primaryHover: tokens.colors.primary[600],
      secondary: tokens.colors.secondary[500],
      secondaryHover: tokens.colors.secondary[600],
      border: tokens.colors.white,
      borderSelected: tokens.colors.white,
    },

    status: {
      success: tokens.colors.success,
      warning: tokens.colors.warning,
      error: tokens.colors.error,
      info: tokens.colors.info,
    },
  },

  spacing: tokens.spacing,

  typography: {
    h1: {
      fontSize: tokens.typography.fontSize.xl,
      fontWeight: tokens.typography.fontWeight.extrabold,
      color: tokens.colors.white,
    },
    h2: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.white,
    },

    body: {
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.normal,
      color: tokens.colors.white,
    },
    bodySecondary: {
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.normal,
      color: tokens.colors.neutral[500],
    },

    caption: {
      fontSize: tokens.typography.fontSize.xs,
      fontWeight: tokens.typography.fontWeight.normal,
      color: `rgba(255, 255, 255, ${tokens.opacity[30]})`,
    },
    small: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.thin,
      color: tokens.colors.white,
    },

    button: {
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.bold,
      color: tokens.colors.white,
    },
  },

  borderRadius: tokens.borderRadius,

  components: {
    button: {
      primary: {
        height: tokens.dimensions.button.height,
        borderRadius: tokens.borderRadius.full,
        background: tokens.gradients.primary,
        padding: {
          horizontal: tokens.spacing[6],
          vertical: tokens.spacing[3],
        },
      },
    },

    input: {
      default: {
        borderRadius: tokens.borderRadius.lg,
        padding: tokens.spacing[4],
        minHeight: tokens.dimensions.input.minHeight,
        backgroundColor: tokens.colors.neutral[800],
        borderWidth: 1,
        borderColor: "transparent",
        focusedBorderColor: tokens.colors.white,
      },
    },

    card: {
      default: {
        borderRadius: tokens.borderRadius.card,
        padding: tokens.spacing[4],
        width: tokens.dimensions.card.width,
        height: tokens.dimensions.card.height,
      },
      selected: {
        borderWidth: 2,
        borderColor: tokens.colors.white,
      },
    },

    statusChip: {
      container: {
        width: "100%",
        height: tokens.dimensions.statusChip.height,
        borderRadius: tokens.borderRadius.lg,
        flexDirection: "row",
        marginTop: tokens.spacing[2],
        marginBottom: tokens.spacing[2],
      },
      visual: {
        width: tokens.dimensions.statusChip.width,
        height: tokens.dimensions.statusChip.height,
        borderTopLeftRadius: tokens.borderRadius.card,
        borderBottomLeftRadius: tokens.borderRadius.card,
      },
    },
  },

  layout: {
    container: {
      paddingHorizontal: tokens.spacing[6],
      height: "95%",
    },
    absoluteBottom: {
      position: "absolute",
      bottom: tokens.spacing[2],
      width: "100%",
      left: tokens.spacing[6],
    },
  },
};

export default theme;
