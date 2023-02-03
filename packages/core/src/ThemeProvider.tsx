import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import defaultTheme from './theme';
import deepmerge from 'deepmerge';

const defaultColorMode = 'day';
const defaultDayScheme = 'light';
const defaultNightScheme = 'dark';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme = { [key: string]: any };
type ColorMode = 'day' | 'night' | 'light' | 'dark';
type ColorModeWithAuto = ColorMode | 'auto';

export type ThemeProviderProps = {
    theme?: Theme;
    colorMode?: ColorModeWithAuto;
    dayScheme?: string;
    nightScheme?: string;
    preventSSRMismatch?: boolean;
};

const ThemeContext = React.createContext<{
    theme?: Theme;
    colorScheme?: string;
    colorMode?: ColorModeWithAuto;
    resolvedColorMode?: ColorMode;
    resolvedColorScheme?: string;
    dayScheme?: string;
    nightScheme?: string;
    setColorMode: React.Dispatch<React.SetStateAction<ColorModeWithAuto>>;
}>({
    setColorMode: () => null,
});

const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = ({
    children,
    ...props
}) => {
    const {
        theme: fallbackTheme,
        colorMode: fallbackColorMode,
        dayScheme: fallbackDayScheme,
        nightScheme: fallbackNightScheme,
    } = useTheme();

    // Initialize state
    const theme = props.theme ?? fallbackTheme ?? defaultTheme;

    const [colorMode, setColorMode] = React.useState(
        props.colorMode ?? fallbackColorMode ?? defaultColorMode
    );
    const [dayScheme, setDayScheme] = React.useState(
        props.dayScheme ?? fallbackDayScheme ?? defaultDayScheme
    );
    const [nightScheme, setNightScheme] = React.useState(
        props.nightScheme ?? fallbackNightScheme ?? defaultNightScheme
    );
    // const systemColorMode = useSystemColorMode();
    // const resolvedColorMode =
    //     resolveColorMode(colorMode, systemColorMode);

    // const colorScheme = chooseColorScheme(
    //     resolvedColorMode,
    //     dayScheme,
    //     nightScheme
    // );

    return (
        <ThemeContext.Provider
            value={{
                theme: theme,
                setColorMode,
            }}
        >
            <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return React.useContext(ThemeContext);
};

export default ThemeProvider;
