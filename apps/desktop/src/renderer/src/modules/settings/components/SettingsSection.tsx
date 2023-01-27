import { ScrollArea, Stack } from '@mantine/core'

export const SettingsSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ScrollArea h="100%">
    <Stack
      h="100%"
      sx={{
        width: '45%',
        '@media (max-width: 1200px)': {
          width: '100%'
        }
      }}
    >
      {children}
    </Stack>
  </ScrollArea>
)
