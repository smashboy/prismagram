import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  defaultRadius: 'md',
  globalStyles: () => ({
    'html, body, #root': {
      width: '100%',
      height: '100%'
    },
    body: {
      // background:
      //   "linear-gradient(220deg, rgb(115, 125, 254), rgb(255, 202, 201))",
      // backdropFilter: "blur(40px)",
    }
  })
}
