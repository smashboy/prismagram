import { Paper, PaperProps } from '@mantine/core'

export const PaperGlass: React.FC<Omit<PaperProps, 'shadow' | 'radius'>> = ({
  children,
  ...props
}) => (
  <Paper
    {...props}
    shadow="sm"
    sx={(theme) => ({
      backgroundColor: theme.fn.rgba(theme.colors.gray[3], 0.35),
      backdropFilter: 'blur(5px)'
    })}
  >
    {children}
  </Paper>
)
