import { Paper, Stack, Text } from '@mantine/core'

interface SettingsSectionPaperProps {
  title: string
  children: React.ReactNode
}

export const SettingsSectionPaper: React.FC<SettingsSectionPaperProps> = ({ title, children }) => (
  <Stack>
    <Text fz="xl" fw="bold">
      {title}
    </Text>
    <Paper shadow="none" withBorder p="xs">
      {children}
    </Paper>
  </Stack>
)
