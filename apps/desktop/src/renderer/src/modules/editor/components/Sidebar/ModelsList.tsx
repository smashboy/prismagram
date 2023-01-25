import { ScrollArea, Stack, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useList, useStore } from 'effector-react'
import { $isEditorEnabled, $modelIds } from '../../stores'
import { CreateModelForm } from '../forms/CreateModelForm'
import { ModelNavItem } from './ModelNavItem'

export const ModelsList = () => {
  const isEditorEnabled = useStore($isEditorEnabled)
  const models = useList($modelIds, (id) => <ModelNavItem modelId={id} />)

  return (
    <>
      <Stack pr="xs">
        <TextInput
          icon={<IconSearch size={14} />}
          placeholder="Search models..."
          disabled={!isEditorEnabled}
        />
        <CreateModelForm />
      </Stack>
      <ScrollArea offsetScrollbars h="100%">
        <Stack h="100%" spacing={5}>
          {models}
        </Stack>
      </ScrollArea>
    </>
  )
}
