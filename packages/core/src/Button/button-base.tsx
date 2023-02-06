import React, { ComponentPropsWithRef, forwardRef, useMemo } from "react";
import { ForwardRefComponent as PolymorphicForwardRefComponent } from "../utils/polymorphic";
import Box from "../Box";
import { BetterSystemStyleObject, merge } from "../sx";
import { useTheme } from "../ThemeProvider";
import { ButtonProps, StyledButton } from "./types";
import {
  getVariantStyles,
  getButtonStyles,
  getAlignContentSize,
} from "./styles";
import { useRefObjectAsForwardedRef } from "../hooks/useRefObjectAsForwardedRef";
import { defaultSxProp } from "../utils/defaultSxProp";

const ButtonBase = forwardRef(
  (
    {
      children,
      as: Component = "button",
      sx: sxProp = defaultSxProp,
      ...props
    },
    forwardedRef
  ): JSX.Element => {
    const {
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      trailingAction: TrailingAction,
      icon: Icon,
      variant = "default",
      size = "medium",
      alignContent = "center",
      block = false,
      ...rest
    } = props;

    const innerRef = React.useRef<HTMLButtonElement>(null);
    useRefObjectAsForwardedRef(forwardedRef, innerRef);

    const [dripShow, setDripShow] = useState<boolean>(false);
    const [dripX, setDripX] = useState<number>(0);
    const [dripY, setDripY] = useState<number>(0);

    const { theme } = useTheme();
    const baseStyles = useMemo(() => {
      return merge.all([
        getButtonStyles(theme),
        getVariantStyles(variant, theme),
      ]);
    }, [theme, variant]);
    const sxStyles = useMemo(() => {
      return merge<BetterSystemStyleObject>(baseStyles, sxProp);
    }, [baseStyles, sxProp]);
    const iconWrapStyles = {
      display: "flex",
      pointerEvents: "none",
    };

    const dripColor = useMemo(
      () => getButtonDripColor(theme.palette, filteredProps),
      [theme.palette, filteredProps]
    );

    /* istanbul ignore next */
    const dripCompletedHandle = () => {
      setDripShow(false);
      setDripX(0);
      setDripY(0);
    };

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      const showDrip = !shadow && !ghost && effect;
      /* istanbul ignore next */
      if (showDrip && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDripShow(true);
        setDripX(event.clientX - rect.left);
        setDripY(event.clientY - rect.top);
      }

      onClick && onClick(event);
    };

    return (
      <StyledButton
        as={Component}
        sx={sxStyles}
        {...rest}
        ref={innerRef}
        data-block={block ? "block" : null}
        data-size={size === "small" || size === "large" ? size : undefined}
        data-no-visuals={
          !LeadingIcon && !TrailingIcon && !TrailingAction ? true : undefined
        }
      >
        {dripShow && (
          <ButtonDrip
            x={dripX}
            y={dripY}
            color={dripColor}
            onCompleted={dripCompletedHandle}
          />
        )}
        {Icon ? (
          <Icon />
        ) : (
          <>
            <Box
              as="span"
              data-component="buttonContent"
              sx={getAlignContentSize(alignContent)}
            >
              {LeadingIcon && (
                <Box
                  as="span"
                  data-component="leadingVisual"
                  sx={{ ...iconWrapStyles }}
                >
                  <LeadingIcon />
                </Box>
              )}
              {children && <span data-component="text">{children}</span>}
              {TrailingIcon && (
                <Box
                  as="span"
                  data-component="trailingVisual"
                  sx={{ ...iconWrapStyles }}
                >
                  <TrailingIcon />
                </Box>
              )}
            </Box>
            {TrailingAction && (
              <Box
                as="span"
                data-component="trailingAction"
                sx={{ ...iconWrapStyles }}
              >
                <TrailingAction />
              </Box>
            )}
          </>
        )}
      </StyledButton>
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", ButtonProps>;

export type ButtonBaseProps = ComponentPropsWithRef<typeof ButtonBase>;

export { ButtonBase };
