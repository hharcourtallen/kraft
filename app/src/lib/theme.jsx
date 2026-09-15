// Theme = which primitives. Mode = which steps. Both are attributes on <html>,
// both persist in localStorage, and nothing else in the app needs to know.
// Mode is a preference — dark, light or system. <html data-mode> always gets
// the resolved dark or light, so System simply follows prefers-color-scheme.
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const THEMES = ['plum', 'graphite']
const MODES = ['dark', 'light', 'system']
const DARK_QUERY = '(prefers-color-scheme: dark)'

const read = (key, allowed, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return allowed.includes(v) ? v : fallback
  } catch {
    return fallback
  }
}

const systemPrefersDark = () => (typeof matchMedia === 'function' ? matchMedia(DARK_QUERY).matches : true)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => read('ofm.theme', THEMES, 'plum'))
  const [mode, setMode] = useState(() => read('ofm.mode', MODES, 'dark'))
  const [systemDark, setSystemDark] = useState(systemPrefersDark)
  const resolvedMode = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia(DARK_QUERY)
    const on = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('ofm.theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    try { localStorage.setItem('ofm.mode', mode) } catch {}
  }, [mode])

  useEffect(() => {
    document.documentElement.dataset.mode = resolvedMode
  }, [resolvedMode])

  const value = useMemo(
    () => ({ theme, mode, resolvedMode, themes: THEMES, modes: MODES, setTheme, setMode }),
    [theme, mode, resolvedMode],
  )
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
