import { Box, Paper, Stack } from '@mantine/core'

import { ModelsList } from './ModelsList'
import { SidebarFooter } from './SidebarFooter'

export const Sidebar = () => {
  return (
    <Paper
      w={300}
      h="100%"
      shadow="md"
      sx={{ backgroundColor: 'rgba(255, 255, 255, .35)', backdropFilter: 'blur(5px)' }}
    >
      <Stack h="100%" py="xs" pl="xs">
        <Box h="calc(100% - 40px)" sx={{ overflow: 'hidden' }}>
          <ModelsList />
        </Box>
        <SidebarFooter />
      </Stack>
    </Paper>
  )
}
