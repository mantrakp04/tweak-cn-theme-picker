"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import type { Theme } from "./lib/tweakcn"


export function useTweakCNThemes() {
  const [currentTheme, setCurrentTheme] = React.useState<Theme | null>(null)

  const applyTheme = React.useCallback((theme: Theme | null) => {
    if (typeof window === 'undefined') return

    if (theme) {
      applyThemeStyles(theme)
      localStorage.setItem("theme-config", JSON.stringify(theme))
      setCurrentTheme(theme)
    } else {
      clearThemeStyles()
      localStorage.removeItem("theme-config")
      setCurrentTheme(null)
    }
  }, [])

  React.useEffect(() => {
    const stored = localStorage.getItem("theme-config")
    if (stored) {
      try {
        const theme = JSON.parse(stored) as Theme
        setCurrentTheme(theme)
        applyThemeStyles(theme)
      } catch (error) {
        console.error("Failed to parse stored theme:", error)
      }
    }
  }, [])

  return {
    currentTheme,
    applyTheme,
    setTheme: applyTheme,
  }
}

const THEME_STYLE_ID = "tweakcn-theme-styles"

function generateThemeCSS(theme: Theme): string {
  const cssLines: string[] = []

  const getCSSVariables = (vars: Record<string, string>) => {
    return Object.entries(vars)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n")
  }

  if (theme.cssVars.theme) {
    const themeVars = getCSSVariables(theme.cssVars.theme)
    cssLines.push(`:root {\n${themeVars}\n}`)
  }

  const lightVars = getCSSVariables(theme.cssVars.light)
  cssLines.push(`:root {\n${lightVars}\n}`)

  const darkVars = getCSSVariables(theme.cssVars.dark)
  cssLines.push(`.dark {\n${darkVars}\n}`)

  return cssLines.join("\n\n")
}

function applyThemeStyles(theme: Theme) {
  const existingStyle = document.getElementById(THEME_STYLE_ID)
  if (existingStyle) {
    existingStyle.remove()
  }

  const styleTag = document.createElement("style")
  styleTag.id = THEME_STYLE_ID
  styleTag.textContent = generateThemeCSS(theme)
  document.head.appendChild(styleTag)
}

function clearThemeStyles() {
  const existingStyle = document.getElementById(THEME_STYLE_ID)
  if (existingStyle) {
    existingStyle.remove()
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
