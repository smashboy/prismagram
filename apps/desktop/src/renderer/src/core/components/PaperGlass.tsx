import { Paper, PaperProps } from '@mantine/core'

export const PaperGlass: React.FC<Omit<PaperProps, 'sx' | 'shadow' | 'radius'>> = ({
  children,
  ...props
}) => (
  <Paper
    {...props}
    shadow="sm"
    sx={(theme) => ({
      backgroundColor:
        theme.colorScheme === 'light'
          ? theme.fn.rgba(theme.colors.gray[3], 0.75)
          : theme.fn.rgba(theme.colors.dark[6], 0.75),
      backdropFilter: 'blur(2px)'
    })}
  >
    {children}
  </Paper>
)
