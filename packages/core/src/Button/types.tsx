import React from "react";
import styled from "styled-components";
import sx, { SxProp } from "../sx";
import getGlobalFocusStyles from "../_getGlobalFocusStyles";

export const StyledButton = styled.button<SxProp>`
  ${getGlobalFocusStyles("-2px")};
  ${sx};
`;

export const StyledDrip = styled.div<SxProp>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  @keyframes expand {
    0% {
      opacity: 0;
      transform: scale(1);
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      transform: scale(28);
      opacity: 0;
    }
  }
  ${sx};
`;

export const StyledDripG = styled.g<SxProp>`
  ${sx};
`;

export type VariantType =
  | "default"
  | "primary"
  | "invisible"
  | "danger"
  | "outline";

export type Size = "small" | "medium" | "large";

export type AlignContent = "start" | "center";

type ButtonA11yProps =
  | { "aria-label": string; "aria-labelledby"?: undefined }
  | { "aria-label"?: undefined; "aria-labelledby": string };

export type ButtonBaseProps = {
  /**
   * Determine's the styles on a button one of 'default' | 'primary' | 'invisible' | 'danger'
   */
  variant?: VariantType;
  /**
   * Size of button and fontSize of text in button
   */
  size?: Size;
  /**
   * Items that are disabled can not be clicked, selected, or navigated through.
   */
  disabled?: boolean;
  /**
   * Allow button width to fill its container.
   */
  block?: boolean;
} & SxProp &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  /**
   * The icon for the IconButton
   */
  icon?: React.ComponentType | null | undefined;
  /**
   * The leading icon comes before button content
   */
  leadingIcon?: React.ComponentType | null | undefined;
  /**
   * The trailing icon comes after button content
   */
  trailingIcon?: React.ComponentType | null | undefined;
  /**
   * Trailing action appears to the right of the trailing visual and is always locked to the end
   */
  trailingAction?: React.ComponentType | null | undefined;
  children: React.ReactNode;
  /**
   * Content alignment for when visuals are present
   */
  alignContent?: AlignContent;
  /**
   * Is the component loading.
   */
  loading?: boolean;
  /**
   * Whether to show shadow or not.
   */
  shadow?: boolean;
} & ButtonBaseProps;

export type IconButtonProps = ButtonA11yProps & {
  icon: React.ComponentType;
} & Omit<ButtonBaseProps, "aria-label" | "aria-labelledby">;

// adopted from React.AnchorHTMLAttributes
export type LinkButtonProps = {
  underline?: boolean;
  download?: string;
  href?: string;
  hrefLang?: string;
  media?: string;
  ping?: string;
  rel?: string;
  target?: string;
  type?: string;
  referrerPolicy?: React.AnchorHTMLAttributes<HTMLAnchorElement>["referrerPolicy"];
};
