import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Stack } from '@mantine/core'
import { LargeModal } from '@renderer/core/components'
import {
  $createRelationModalData,
  $isOpenCreateRelationModal,
  $schemaState,
  $selectedRelationType,
  resetCreateRelationModalDataEvent,
  setPrismaSchemaEvent,
  toggleCreateRelationModalEvent
} from '../../stores'
import { NewRelationForm } from './NewRelationForm'
import { PreviewSchemaChanges } from './PreviewSchemaChanges'
import { createPrismaSchemaState } from 'prisma-state/_new/state'

const $store = combine({
  isOpen: $isOpenCreateRelationModal,
  data: $createRelationModalData,
  schemaState: $schemaState,
  selectedRelationType: $selectedRelationType
})

export const CreateRelationModal = () => {
  const { isOpen, data, schemaState, selectedRelationType } = useStore($store)

  const [updatedState, setUpdatedState] = useState(createPrismaSchemaState())

  useEffect(() => {
    const { source, target, name, onDelete, onUpdate, isOptional } = data

    const clonedState = schemaState._clone()

    if (selectedRelationType === 'n-m') {
      clonedState.relations.createManyToManyRelation(source, target, { name })
    } else if (selectedRelationType === '1-1') {
      clonedState.relations.createOneToOneRelation(source, target, {
        name,
        onDelete,
        onUpdate,
        isOptional
      })
    } else {
      clonedState.relations.createOneToManyRelation(source, target, {
        name,
        onDelete,
        onUpdate,
        isOptional
      })
    }

    setUpdatedState(clonedState)
  }, [data, selectedRelationType])

  const handleCloseDialog = () => {
    toggleCreateRelationModalEvent(false)
    resetCreateRelationModalDataEvent()
  }

  const handleCreateNewRelation = () => {
    handleCloseDialog()
    setPrismaSchemaEvent(updatedState._clone())
  }

  return (
    <LargeModal title="Create relation" opened={isOpen} onClose={handleCloseDialog}>
      <Stack justify="space-between" h="100%">
        <Group h="100%" align="flex-start" noWrap>
          <NewRelationForm />
          <PreviewSchemaChanges state={updatedState} />
        </Group>
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleCreateNewRelation} variant="subtle">
            Create
          </Button>
        </Group>
      </Stack>
    </LargeModal>
  )
}
