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
  </Stack>
)
