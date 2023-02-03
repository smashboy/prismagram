import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  defaultRadius: 'md',
  defaultGradient: {
    from: 'blue',
    to: 'pink',
    deg: 20
  },
  globalStyles: (theme) => ({
    'html, body, #root': {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    body: {
      background: theme.fn.gradient()
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
        overlayColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        overflow: 'inside'
      })
    },
    Input: {
      defaultProps: {
        radius: 'md',
        variant: 'filled'
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
    },
    Alert: {
      defaultProps: {
        variant: 'light'
      },
      styles: {
        root: {
          '& .mantine-Alert-icon': {
            height: 'inherit',
            alignItems: 'center'
          }
        }
      }
    }
  }
}
