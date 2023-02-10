// Produces a union of dot-delimited keypaths to the string values in a nested object:
export type KeyPaths<O> = {
    [K in keyof O]: K extends string
        ? O[K] extends Record<string, unknown>
            ? `${K}.${KeyPaths<O[K]>}`
            : `${K}`
        : never;
}[keyof O];

/**
 * Extract a component's props
 *
 * Source: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-component
 *
 * @example ComponentProps<typeof MyComponent>
 */
export type ComponentProps<T> = T extends React.ComponentType<
    React.PropsWithChildren<infer Props>
>
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      Props extends object
        ? Props
        : never
    : never;
