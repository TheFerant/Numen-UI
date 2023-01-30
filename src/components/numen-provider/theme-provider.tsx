import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import Themes from '../themes'
import { numenUIThemes } from '../themes/presets'
import { ThemeContext } from '../use-theme/theme-context'
import { AllThemesConfig, AllThemesContext } from '../use-all-themes/all-themes-context'

export interface Props {
  themeType?: string
  themes?: Array<numenUIThemes>
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  themeType,
  themes = [],
}) => {
  const [allThemes, setAllThemes] = useState<AllThemesConfig>({
    themes: Themes.getPresets(),
  })

  const currentTheme = useMemo<numenUIThemes>(() => {
    const theme = allThemes.themes.find(item => item.type === themeType)
    if (theme) return theme
    return Themes.getPresetStaticTheme()
  }, [allThemes, themeType])

  useEffect(() => {
    if (!themes?.length) return
    setAllThemes(last => {
      const safeThemes = themes.filter(item => Themes.isAvailableThemeType(item.type))
      const nextThemes = Themes.getPresets().concat(safeThemes)
      return {
        ...last,
        themes: nextThemes,
      }
    })
  }, [themes])

  return (
    <AllThemesContext.Provider value={allThemes}>
      <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>
    </AllThemesContext.Provider>
  )
}

export default ThemeProvider
