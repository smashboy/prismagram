import { Stack } from '@mantine/core'

export const SettingsSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack w="45%" h="100%">
    {children}
  </Stack>
)
