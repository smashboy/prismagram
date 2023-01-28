import { ScrollArea, Stack } from '@mantine/core'
import { useList } from 'effector-react'
import { $modelIds } from '../../stores'
import { CreateModelForm } from '../forms/CreateModelForm'
import { ModelNavItem } from './ModelNavItem'

export const ModelsList = () => {
  const models = useList($modelIds, (id) => <ModelNavItem modelId={id} />)

  return (
    <Stack>
      <Stack pr="xs">
        {/* <TextInput
          icon={<IconSearch size={14} />}
          placeholder="Search models..."
          disabled={!isEditorEnabled}
        /> */}
        <CreateModelForm />
      </Stack>
      <ScrollArea offsetScrollbars h="100%">
        <Stack h="100%" spacing={5}>
          {models}
        </Stack>
      </ScrollArea>
    </Stack>
  )
}
