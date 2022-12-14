import { Paper } from '@mantine/core'

interface SettingsSectionPaperProps {
  children: React.ReactNode
}

export const SettingsSectionPaper: React.FC<SettingsSectionPaperProps> = ({ children }) => (
  <Paper shadow="none" withBorder bg="gray.0" p="xs">
    {children}
  </Paper>
)
