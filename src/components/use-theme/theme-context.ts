import React from 'react'
import Themes from '../themes'
import { numenUIThemes } from '../themes/presets'

const defaultTheme = Themes.getPresetStaticTheme()

export const ThemeContext: React.Context<numenUIThemes> =
  React.createContext<numenUIThemes>(defaultTheme)
export const useTheme = (): numenUIThemes => React.useContext<numenUIThemes>(ThemeContext)
