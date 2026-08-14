import { forwardRef, type ElementType, type ReactElement, type Ref } from 'react';
import MuiButton, { type ButtonProps as MuiButtonProps, type ButtonTypeMap } from '@mui/material/Button';
import { alpha, darken, useTheme } from '@mui/material/styles';

export type ButtonProps<C extends ElementType = ButtonTypeMap['defaultComponent']> = MuiButtonProps<C> & {
  component?: C;
};

const PALETTE_COLORS = ['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const;
type PaletteColorKey = (typeof PALETTE_COLORS)[number];

function isPaletteColor(color: MuiButtonProps['color']): color is PaletteColorKey {
  return !!color && (PALETTE_COLORS as readonly string[]).includes(color);
}

type ButtonComponent = (<C extends ElementType = ButtonTypeMap['defaultComponent']>(
  props: ButtonProps<C> & { ref?: Ref<HTMLButtonElement> },
) => ReactElement | null) & { displayName?: string };

/**
 * Wraps MUI's Button with complete, theme-derived interactive states
 * (hover / active / focus-visible) for every variant + color combo,
 * instead of relying on MUI's built-in defaults.
 */
export const Button = forwardRef(function Button(
  { variant = 'text', color = 'primary', sx, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const theme = useTheme();
  const tone = isPaletteColor(color) ? theme.palette[color] : undefined;
  // primary.main (brand orange) is ~2:1 against white/paper — fails WCAG AA for text and for
  // non-text UI contrast (borders, focus rings). primary.dark clears both (~5:1). Every other
  // palette color's `.main` already clears 4.5:1, so this only changes primary's foreground.
  const foreground = tone ? (color === 'primary' ? theme.palette.primary.dark : tone.main) : undefined;

  const interactiveStyles = (() => {
    if (variant === 'contained' && tone) {
      return {
        '&:hover': {
          backgroundColor: darken(tone.main, 0.1),
          boxShadow: `0 6px 16px ${alpha(tone.main, 0.35)}`,
        },
        '&:active': {
          backgroundColor: darken(tone.main, 0.18),
          boxShadow: 'none',
        },
      };
    }

    if (variant === 'outlined' && tone) {
      return {
        color: foreground,
        borderColor: foreground,
        '&:hover': {
          backgroundColor: alpha(tone.main, 0.08),
          borderColor: darken(foreground!, 0.12),
        },
        '&:active': {
          backgroundColor: alpha(tone.main, 0.16),
        },
      };
    }

    // outlined + color="inherit": used for CTAs on colored bands (e.g. banner
    // sections), where the button's color is whatever text color the band
    // sets via currentColor. State layer uses common.white, matching how
    // Material handles "on-color" surfaces regardless of the band's hue.
    if (variant === 'outlined' && !tone) {
      return {
        borderColor: 'currentColor',
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.16),
          borderColor: 'currentColor',
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.common.white, 0.24),
        },
      };
    }

    // text variant, including color="inherit" (used for the nav menu links)
    const base = tone?.main ?? theme.palette.text.primary;
    const hoverColor = foreground ? darken(foreground, 0.1) : theme.palette.primary.dark;
    return {
      color: foreground,
      '&:hover': {
        backgroundColor: alpha(base, 0.08),
        color: hoverColor,
      },
      '&:active': {
        backgroundColor: alpha(base, 0.14),
      },
    };
  })();

  return (
    <MuiButton
      ref={ref}
      variant={variant}
      color={color}
      sx={[
        {
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
            duration: theme.transitions.duration.short,
          }),
          '&:focus-visible': {
            // primary.dark (not .main) clears 3:1 non-text contrast against light page
            // backgrounds. `currentColor` when there's no palette tone (color="inherit", used
            // on colored CTA bands) matches whatever color the button's own text/border uses.
            outline: `2px solid ${tone ? theme.palette.primary.dark : 'currentColor'}`,
            outlineOffset: 2,
          },
          ...interactiveStyles,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}) as ButtonComponent;
