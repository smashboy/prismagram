import { useEffect, useState } from 'react'
import { PrismaSchemaState } from 'prisma-state'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Modal, Select, Stack } from '@mantine/core'
import { Prism } from '@mantine/prism'
import {
  $createRelationModalData,
  $isOpenCreateRelationModal,
  $schemaState,
  $selectedRelationType,
  resetCreateRelationModalData,
  setCreateRelationModalData,
  setPrismaSchemaEvent,
  setSelectedRelationTypeEvent,
  toggleCreateRelationModal
} from '../stores'
import { invoke } from '@renderer/core/electron'
import { EDITOR_FORMAT_SCHEMA } from '@shared/common/configs/api'
import { IconArrowRight } from '@tabler/icons'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { SelectReferentialAction } from './inputs/SelectReferentialAction'
import { uncapitalize } from 'prisma-state/utils/string'

const $store = combine({
  isOpen: $isOpenCreateRelationModal,
  data: $createRelationModalData,
  schemaState: $schemaState,
  selectedRelationType: $selectedRelationType
})

// const deleted = { color: 'red', label: '-' }
const added = { color: 'blue' }

const relationTypeOptions = [
  RelationType.ONE_TO_ONE,
  RelationType.ONE_TO_MANY,
  RelationType.MANY_TO_MANY
]

export const CreateRelationModal = () => {
  const { isOpen, data, schemaState, selectedRelationType } = useStore($store)

  const { source, target } = data

  const { modelIds } = schemaState

  const [updatedState, setUpdatedState] = useState(new PrismaSchemaState())
  const [result, setResult] = useState('')

  useEffect(() => {
    const handleFormatSchema = async () => {
      const prevSchemaString = schemaState.toString()

      const formatted = await invoke(EDITOR_FORMAT_SCHEMA, prevSchemaString)

      const newState = new PrismaSchemaState()
      newState.fromString(formatted)

      const sourceModel = newState.model(source)
      const targetModel = newState.model(target)

      if (!sourceModel || !targetModel) return

      if (selectedRelationType === '1-1') {
        newState.relations.createOneToOneRelation(sourceModel, targetModel)
      } else if (selectedRelationType === '1-n') {
        newState.relations.createOneToManyRelation(sourceModel, targetModel)
      } else {
        newState.relations.createManyToManyRelation(sourceModel, targetModel)
      }

      setUpdatedState(newState)
    }

    handleFormatSchema()
  }, [data, selectedRelationType])

  useEffect(() => {
    const handleShowResult = async () => {
      const sourceModel = updatedState.model(source)
      const targetModel = updatedState.model(target)

      const changes = `
      ${targetModel._toString()}
      ${sourceModel._toString()}
      `

      const formattedChanges = await invoke(EDITOR_FORMAT_SCHEMA, changes)
      setResult(formattedChanges)
    }

    handleShowResult()
  }, [updatedState])

  const handleCloseDialog = () => {
    toggleCreateRelationModal(false)
    resetCreateRelationModalData()
  }

  const handleConfirmCreateRelation = async () => {
    handleCloseDialog()
    const formatted = await invoke(EDITOR_FORMAT_SCHEMA, updatedState.toString())
    setPrismaSchemaEvent(formatted)
  }

  const handleSelectChange = (field: 'source' | 'target') => (value: string | null) => {
    if (!value) return
    setCreateRelationModalData({ ...data, [field]: value })
  }

  const handeRelationChange = (value: RelationTypeOption | null) => {
    if (!value) return
    setSelectedRelationTypeEvent(value)
  }

  return (
    <Modal title="Create relation" opened={isOpen} onClose={handleCloseDialog} size="xl">
      <Stack>
        <Group>
          <Select
            value={source}
            onChange={handleSelectChange('source')}
            data={modelIds}
            searchable
          />
          <IconArrowRight size={16} />
          <Select
            value={target}
            onChange={handleSelectChange('target')}
            data={modelIds}
            searchable
          />
          <Select
            value={selectedRelationType}
            onChange={handeRelationChange}
            data={relationTypeOptions}
            sx={{ width: 100 }}
          />
        </Group>
        {selectedRelationType !== 'n-m' && (
          <Group grow>
            <SelectReferentialAction
              name={uncapitalize(target)}
              model={updatedState.model(source)}
              state={updatedState}
              onChange={setUpdatedState}
              variant="onUpdate"
            />
            <SelectReferentialAction
              name={uncapitalize(target)}
              model={updatedState.model(source)}
              onChange={setUpdatedState}
              state={updatedState}
            />
          </Group>
        )}
        <Prism
          language="json"
          highlightLines={{
            6: added,
            11: added,
            12: added
          }}
          withLineNumbers
          noCopy
        >
          {result}
        </Prism>
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleConfirmCreateRelation} variant="filled">
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
