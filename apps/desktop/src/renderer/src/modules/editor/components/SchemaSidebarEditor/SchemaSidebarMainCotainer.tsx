import { Stack } from '@mantine/core'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { $schemaState, $selectedNodeId, SelectedNodeData } from '../../stores'
import { EnumForm } from './forms/EnumForm'
import { ModelForm } from './forms/ModelForm'
import { PrismaDatasourceSettings } from './forms/PrismaDatasourceSettings'
import { PrismaGeneratorSettings } from './forms/PrismaGeneratorSettings'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  schemaState: $schemaState
})

const formSelector = (
  selectedNodeId: SelectedNodeData | null,
  state: PrismaSchemaStateInstance
) => {
  if (!selectedNodeId) return null

  const { nodeId } = selectedNodeId

  if (state.datasource?.name === nodeId) {
    return <PrismaDatasourceSettings settingsId={nodeId} />
  }

  if (state.generators.has(nodeId)) {
    return <PrismaGeneratorSettings settingsId={nodeId} />
  }

  if (state.isModel(nodeId)) {
    return <ModelForm modelId={nodeId} />
  }

  if (state.isEnum(nodeId)) {
    return <EnumForm enumId={nodeId} />
  }

  return null
}

export const SchemaSidebarMainCotainer = () => {
  const { selectedNodeId, schemaState } = useStore($store)

  const form = formSelector(selectedNodeId, schemaState)

  return (
    <Stack pl="xs" w="100%" h="100%">
      {form}
    </Stack>
  )
}
