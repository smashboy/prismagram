import { Stack } from '@mantine/core'
import { Command } from 'cmdk'

interface SpotlightListProps {
  children: React.ReactNode
}

export const SpotlightList: React.FC<SpotlightListProps> = ({ children }) => {
  return (
    <Command.List>
      <Stack spacing={0} sx={{ maxHeight: 450 }}>
        {children}
      </Stack>
    </Command.List>
  )
}
