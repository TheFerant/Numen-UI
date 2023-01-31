import React, { PropsWithChildren, useMemo, useState } from 'react'
import {
  NumenUIContent,
  defaultToastLayout,
  NumenUIContextParams,
  UpdateToastsFunction,
  UpdateToastsIDFunction,
  UpdateToastsLayoutFunction,
} from '../utils/use-numen-ui-context'
import ThemeProvider from './theme-provider'
import useCurrentState from '../utils/use-current-state'
import ToastContainer from '../use-toasts/toast-container'
import { NumenUIThemes } from '../themes/presets'

export type NumenProviderProps = {
  themes?: Array<NumenUIThemes>
  themeType?: string | 'dark' | 'light'
}

const NumenProvider: React.FC<PropsWithChildren<NumenProviderProps>> = ({
  themes,
  themeType,
  children,
}) => {
  const [lastUpdateToastId, setLastUpdateToastId] =
    useState<NumenUIContextParams['lastUpdateToastId']>(null)
  const [toasts, setToasts, toastsRef] = useCurrentState<NumenUIContextParams['toasts']>(
    [],
  )
  const [toastLayout, setToastLayout, toastLayoutRef] =
    useCurrentState<NumenUIContextParams['toastLayout']>(defaultToastLayout)
  const updateToasts: UpdateToastsFunction = fn => {
    const nextToasts = fn(toastsRef.current)
    setToasts(nextToasts)
  }
  const updateToastLayout: UpdateToastsLayoutFunction = fn => {
    const nextLayout = fn(toastLayoutRef.current)
    setToastLayout(nextLayout)
  }
  const updateLastToastId: UpdateToastsIDFunction = fn => {
    setLastUpdateToastId(fn())
  }

  const initialValue = useMemo<NumenUIContextParams>(
    () => ({
      toasts,
      toastLayout,
      updateToasts,
      lastUpdateToastId,
      updateToastLayout,
      updateLastToastId,
    }),
    [toasts, toastLayout, lastUpdateToastId],
  )

  return (
    <NumenUIContent.Provider value={initialValue}>
      <ThemeProvider themes={themes} themeType={themeType}>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </NumenUIContent.Provider>
  )
}

export default NumenProvider
