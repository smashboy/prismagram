import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  defaultRadius: 'md',
  globalStyles: (theme) => ({
    'html, body, #root': {
      width: '100%',
      height: '100%'
    },
    body: {
      background: `linear-gradient(6deg, ${theme.colors.blue[3]}, ${theme.colors.pink[3]})`,
      backdropFilter: 'blur(40px)'
    }
  }),
  components: {
    Button: {
      defaultProps: {
        variant: 'light'
      }
    },
    Modal: {
      defaultProps: (theme) => ({
        centered: true,
        overlayOpacity: 0.55,
        overlayBlur: 5,
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
      })
    },
    Input: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    }
  }
}
