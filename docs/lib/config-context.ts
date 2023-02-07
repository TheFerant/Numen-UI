import React from 'react'
import type { DeepPartial } from 'components/utils/types'
import { GeistUIThemes } from 'components'

export interface Configs {
  onThemeChange?: (themes: DeepPartial<GeistUIThemes>) => void
  sidebarScrollHeight: number
  updateSidebarScrollHeight: (height: number) => void

  customTheme: DeepPartial<GeistUIThemes>
  updateCustomTheme: (theme: DeepPartial<GeistUIThemes>) => void
  switchTheme: (type: string) => void
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},

  customTheme: {},
  updateCustomTheme: () => {},
  onThemeChange: () => {},
  switchTheme: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
