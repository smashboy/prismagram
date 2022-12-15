import { Button, ScrollArea, Stack, TextInput } from '@mantine/core'
import {} from '@renderer/modules/projects'
import { IconPlus, IconSearch } from '@tabler/icons'
import { useList, useStore } from 'effector-react'
import { $isEditorEnabled, $modelsIds } from '../../stores'
import { ModelNavItem } from './ModelNavItem'

export const ModelsList = () => {
  const isEditorEnabled = useStore($isEditorEnabled)
  const models = useList($modelsIds, (id) => <ModelNavItem nodeId={id} />)

  return (
    <>
      <Stack pr="xs">
        <TextInput
          icon={<IconSearch size={14} />}
          placeholder="Search models..."
          disabled={!isEditorEnabled}
        />
        <Button variant="subtle" rightIcon={<IconPlus size={16} />} disabled={!isEditorEnabled}>
          New model
        </Button>
      </Stack>
      <ScrollArea offsetScrollbars h="100%">
        <Stack h="100%" spacing={5}>
          {models}
        </Stack>
      </ScrollArea>
    </>
  )
}
