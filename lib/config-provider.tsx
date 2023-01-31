import React, { useMemo, useState } from 'react'
import { ConfigContext, Configs } from 'lib/config-context'
import { useRouter } from 'next/router'
import type { DeepPartial } from 'components/utils/types'
import { NumenUIThemes, Themes } from 'components'
import { useTheme } from 'components'
import { CUSTOM_THEME_TYPE } from './constants'

const defaultProps = {}

export type ConfigProviderProps = {
  onThemeChange?: (themes: DeepPartial<NumenUIThemes>) => void
  onThemeTypeChange?: (type: string) => void
}

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = React.memo(
  ({
    onThemeChange,
    onThemeTypeChange,
    children,
  }: React.PropsWithChildren<ConfigProviderProps> & typeof defaultProps) => {
    const theme = useTheme()
    const [scrollHeight, setScrollHeight] = useState<number>(0)
    const [customTheme, setCustomTheme] = useState<NumenUIThemes>(theme)

    const updateSidebarScrollHeight = (height: number) => setScrollHeight(height)
    const updateCustomTheme = (nextTheme: DeepPartial<NumenUIThemes>) => {
      const mergedTheme = Themes.create(theme, { ...nextTheme, type: CUSTOM_THEME_TYPE })
      setCustomTheme(mergedTheme)
      onThemeChange && onThemeChange(mergedTheme)
    }
    const switchTheme = (type: string) => {
      onThemeTypeChange && onThemeTypeChange(type)
    }

    const initialValue = useMemo<Configs>(
      () => ({
        onThemeChange,
        customTheme,
        switchTheme,
        updateCustomTheme,
        sidebarScrollHeight: scrollHeight,
        updateSidebarScrollHeight,
      }),
      [onThemeChange, scrollHeight],
    )

    return (
      <ConfigContext.Provider value={initialValue}>{children}</ConfigContext.Provider>
    )
  },
)

ConfigProvider.defaultProps = defaultProps
ConfigProvider.displayName = 'NumenConfigProvider'
export default ConfigProvider
