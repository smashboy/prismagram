import { useState } from 'react'
import { Command } from 'cmdk'
import { Box, ScrollArea } from '@mantine/core'
import { SpotlightInput } from './SpotlightInput'
import { SpotlightList } from './SpotlightList'
import { removeLastSpotlightSubActionEvent } from '../stores'

interface SpotlightContainerProps {
  children: React.ReactNode
}

export const SpotlightContainer: React.FC<SpotlightContainerProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' || (event.key === 'Backspace' && !searchValue)) {
      event.preventDefault()
      removeLastSpotlightSubActionEvent()
    }
  }

  return (
    <Command onKeyDown={handleKeyDown} loop>
      <SpotlightInput value={searchValue} onChange={setSearchValue} />
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
            <Command.Empty>No results found.</Command.Empty>
            {children}
          </SpotlightList>
        </Box>
      </ScrollArea>
    </Command>
  )
}
