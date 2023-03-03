import { ColorScheme } from '@mantine/core'
import { createEvent, createStore } from 'effector'

export const APP_THEME_STORE_KEY = 'app-theme'

export const setAppThemeEvent = createEvent<ColorScheme>()

export const $appTheme = createStore<ColorScheme>(
  (localStorage.getItem(APP_THEME_STORE_KEY) as ColorScheme) || 'light'
).on(setAppThemeEvent, (_, theme) => theme)
