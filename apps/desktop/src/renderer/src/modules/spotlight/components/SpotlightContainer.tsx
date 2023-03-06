import { Command } from 'cmdk'
import { Box, ScrollArea } from '@mantine/core'
import { SpotlightInput } from './SpotlightInput'
import { SpotlightList } from './SpotlightList'
import { $spotlightSearchInput, removeLastSpotlightSubActionEvent } from '../stores'
import { useStore } from 'effector-react'
import { SpotlightNotFound } from './SpotlightNotFound'

interface SpotlightContainerProps {
  children: React.ReactNode
}

export const SpotlightContainer: React.FC<SpotlightContainerProps> = ({ children }) => {
  const search = useStore($spotlightSearchInput)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' || (event.key === 'Backspace' && !search)) {
      event.preventDefault()
      removeLastSpotlightSubActionEvent()
    }
  }

  return (
    <Command onKeyDown={handleKeyDown} loop>
      <SpotlightInput />
      <ScrollArea
        type="scroll"
        sx={(theme) => ({
          borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`
        })}
        px="xs"
        pb="xs"
      >
        <Box sx={{ maxHeight: 450 }}>
          <SpotlightList>
            <SpotlightNotFound />
            {children}
          </SpotlightList>
        </Box>
      </ScrollArea>
    </Command>
  )
}
