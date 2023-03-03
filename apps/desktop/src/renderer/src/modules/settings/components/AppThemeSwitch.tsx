import { useStore } from 'effector-react'
import { ColorScheme, SegmentedControl } from '@mantine/core'
import { $appTheme, APP_THEME_STORE_KEY, setAppThemeEvent } from '@renderer/stores/ui/theme'

const options: Array<{ label: string; value: ColorScheme }> = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]

export const AppThemeSwitch = () => {
  const appTheme = useStore($appTheme)

  const handleChange = (value: ColorScheme) => {
    localStorage.setItem(APP_THEME_STORE_KEY, value)
    setAppThemeEvent(value)
  }

  return <SegmentedControl value={appTheme} onChange={handleChange} data={options} />
}
