import { Paper } from '@mantine/core'

interface SettingsSectionPaperProps {
  children: React.ReactNode
}

export const SettingsSectionPaper: React.FC<SettingsSectionPaperProps> = ({ children }) => (
  <Paper
    shadow="none"
    withBorder
    p="xs"
    sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
    })}
  >
    {children}
  </Paper>
)
