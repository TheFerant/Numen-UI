import React, { Component, forwardRef } from 'react';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
import { SxProp } from '../sx'

export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNumber = <T extends number[]>(...args: T) => args;

const buttonTypes = tuple(
    'default',
    'secondary',
    'success',
    'warning',
    'error',
    'abort',
    'secondary-light',
    'success-light',
    'warning-light',
    'error-light'
);
export type ButtonTypes = typeof buttonTypes[number];

interface Props {
    type?: ButtonTypes;
    ghost?: boolean;
    loading?: boolean;
    shadow?: boolean;
    auto?: boolean;
    effect?: boolean;
    disabled?: boolean;
    htmlType?: React.ButtonHTMLAttributes<any>['type'];
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const defaultProps = {
    type: 'default' as ButtonTypes,
    htmlType: 'button' as React.ButtonHTMLAttributes<any>['type'],
    ghost: false,
    loading: false,
    shadow: false,
    auto: false,
    effect: true,
    disabled: false,
    className: '',
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;
export type ButtonProps = Props & SxProp & NativeAttrs;

const ButtonComponent = React.forwardRef(
    (
        { children, as: Component = 'button', sx: sxProp, ...props },
        forwardRef
    ): JSX.Element => {
        const {
            disabled,
            type,
            loading,
            shadow,
            ghost,
            effect,
            onClick,
            auto,
            icon,
            htmlType,
            iconRight,
            className,
            ...rest
        } = props;
        return <button>{children} sdd</button>;
    }
) as PolymorphicForwardRefComponent<'button' | 'a', ButtonProps>;

export default ButtonComponent;
