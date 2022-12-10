import { Box, Button, ScrollArea, Stack, TextInput } from '@mantine/core'
import { $selectedProjectId } from '@renderer/modules/projects'
import { IconPlus, IconSearch } from '@tabler/icons'
import { useList, useStore } from 'effector-react'
import { $nodesIds } from '../../stores'
import { ModelNavItem } from './ModelNavItem'

export const ModelsList = () => {
  const projectId = useStore($selectedProjectId)
  const models = useList($nodesIds, (id) => <ModelNavItem nodeId={id} />)

  return (
    <Stack h="calc(100% - 40px)">
      <Stack pr="xs">
        <TextInput
          icon={<IconSearch size={14} />}
          placeholder="Search models..."
          disabled={!projectId}
        />
        <Button variant="subtle" rightIcon={<IconPlus size={16} />} disabled={!projectId}>
          New model
        </Button>
      </Stack>

      <ScrollArea offsetScrollbars>
        <Stack h="100%" spacing={5}>
          {models}
        </Stack>
      </ScrollArea>
    </Stack>
  )
}
