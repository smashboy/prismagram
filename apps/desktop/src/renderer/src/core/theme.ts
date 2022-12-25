import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  defaultRadius: 'md',
  globalStyles: (theme) => ({
    'html, body, #root': {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    body: {
      background:
        theme.colorScheme === 'dark'
          ? `linear-gradient(277deg, rgba(33, 0, 75, 0.24) 3.65%, rgba(60, 0, 136, 0) 40.32%),linear-gradient(44deg, rgba(209, 21, 111, 0.16) 0%, rgba(209, 25, 80, 0) 36.63%),linear-gradient(201deg, rgba(58, 19, 255, 0) 29.79%, rgba(98, 19, 255, 0.01) 85.72%),#13111C`
          : `linear-gradient(6deg, ${theme.colors.blue[3]}, ${theme.colors.pink[3]})`
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
    },
    Stack: {
      defaultProps: {
        spacing: 'xs'
      }
    },
    Switch: {
      defaultProps: {
        labelPosition: 'left',
        size: 'md'
      },
      styles: {
        root: {
          '& .mantine-Switch-body': {
            width: '100%',
            alignItems: 'center'
          },
          '& .mantine-Switch-labelWrapper': {
            flex: 1
          }
        }
      }
    },
    SimpleGrid: {
      defaultProps: {
        spacing: 'xs'
      }
    },
    Group: {
      defaultProps: {
        spacing: 'xs'
      }
    },
    LoadingOverlay: {
      defaultProps: {
        overlayBlur: 2
      }
    },
    Accordion: {
      defaultProps: {
        variant: 'separated',
        radius: 'md',
        chevronPosition: 'left'
      }
    },
    MultiSelect: {
      defaultProps: {
        dropdownPosition: 'flip'
      }
    }
  }
}
