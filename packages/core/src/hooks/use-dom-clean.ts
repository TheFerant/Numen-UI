import { useEffect } from 'react'

export const useDomClean = (): void => {
  useEffect(() => {
    document.documentElement.removeAttribute('style')
    document.body.removeAttribute('style')
  }, [])
}
