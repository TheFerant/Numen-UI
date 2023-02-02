import React from 'react'
import Themes from '../themes/themes'
import { NumenUIThemes } from '../themes/presets'

export type AllThemesConfig = {
  themes: Array<NumenUIThemes>
}

const defaultAllThemesConfig = {
  themes: Themes.getPresets(),
}

export const AllThemesContext: React.Context<AllThemesConfig> = React.createContext<AllThemesConfig>(
  defaultAllThemesConfig,
)

export const useAllThemes = (): AllThemesConfig =>
  React.useContext<AllThemesConfig>(AllThemesContext)
