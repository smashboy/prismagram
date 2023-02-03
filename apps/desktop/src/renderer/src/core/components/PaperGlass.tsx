import { Paper, PaperProps } from '@mantine/core'

export const PaperGlass: React.FC<Omit<PaperProps, 'sx' | 'shadow' | 'radis'>> = ({
  children,
  ...props
}) => (
  <Paper
    {...props}
    sx={{
      borderRadius: 0
      // backgroundColor: theme.fn.rgba(theme.colors.gray[3], 0.85),
      // backdropFilter: 'blur(5px)'
    }}
  >
    {children}
  </Paper>
)
