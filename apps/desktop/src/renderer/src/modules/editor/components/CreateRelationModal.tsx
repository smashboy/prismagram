import { useEffect, useState } from 'react'
import { PrismaSchemaState } from 'prisma-state'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Modal, Select, Stack, Transition } from '@mantine/core'
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
import { ReferentialActionSelect } from './inputs/ReferentialActionSelect'
import { uncapitalize } from 'prisma-state/utils/string'
import { RelationField } from 'prisma-state/fields'
import { RelationAttribute } from 'prisma-state/attributes'
import { ModelRelationFieldOptionalSwitch } from './inputs/ModelRelationFieldOptionalSwitch'

const $store = combine({
  isOpen: $isOpenCreateRelationModal,
  data: $createRelationModalData,
  schemaState: $schemaState,
  selectedRelationType: $selectedRelationType
})

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
  const [relation, setRelation] = useState<[string, string] | null>(null)
  const [hightligthLineIndexes, setHightligthLineIndexes] = useState<number[]>([])

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

      let relation: [RelationField, RelationField] | undefined

      if (selectedRelationType === '1-1') {
        relation = newState.relations.createOneToOneRelation(sourceModel, targetModel)
      } else if (selectedRelationType === '1-n') {
        relation = newState.relations.createOneToManyRelation(sourceModel, targetModel)
      } else {
        relation = newState.relations.createManyToManyRelation(sourceModel, targetModel)
      }

      if (!relation) return setRelation(null)

      const [sourceRelation, targetRelation] = relation

      setRelation([sourceRelation.name, targetRelation.name])
      setUpdatedState(newState)
    }

    handleFormatSchema()
  }, [data, selectedRelationType])

  useEffect(() => {
    const handleShowResult = async () => {
      if (!relation) return

      const [sourceRelationName, targetRelationName] = relation

      const sourceModel = updatedState.model(source)
      const targetModel = updatedState.model(target)

      const indexes: number[] = []

      const updatedModels = await invoke(
        EDITOR_FORMAT_SCHEMA,
        `
      ${targetModel._toString()}
      ${sourceModel._toString()}
      `
      )

      const targetFields = [...targetModel.fields.values()]
      const sourceFields = [...sourceModel.fields.values()]

      for (const index in targetFields) {
        const field = targetFields[index]

        if (field.name === targetRelationName) {
          indexes.push(Number(index) + 2)
        }
      }

      const sourceRelationFields: string[] = []

      // TODO: rework, super dumb way to hightlight line indexes
      for (const index in sourceFields) {
        const field = sourceFields[index] as RelationField

        if (field.name === sourceRelationName) {
          indexes.push(Number(index) + 2 + targetFields.length + 3)
          const relatinFields =
            (field.attributes.get('relation') as RelationAttribute)?.fields || []
          sourceRelationFields.push(...relatinFields)
        }

        if (sourceRelationFields.includes(field.name))
          indexes.push(Number(index) + 2 + targetFields.length + 3)
      }

      setHightligthLineIndexes(indexes)
      setResult(updatedModels)
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
        <Transition mounted={selectedRelationType !== 'n-m'} transition="fade">
          {(style) => (
            <Stack style={style}>
              <Group grow>
                <ReferentialActionSelect
                  name={uncapitalize(target)}
                  model={updatedState.model(source)}
                  state={updatedState}
                  onChange={setUpdatedState}
                  variant="onUpdate"
                />
                <ReferentialActionSelect
                  name={uncapitalize(target)}
                  model={updatedState.model(source)}
                  onChange={setUpdatedState}
                  state={updatedState}
                />
              </Group>
              <ModelRelationFieldOptionalSwitch
                name={relation?.[0] || ''}
                model={updatedState.model(source)}
                state={updatedState}
                onChange={setUpdatedState}
              />
            </Stack>
          )}
        </Transition>
        <Prism
          language="json"
          highlightLines={hightligthLineIndexes.reduce(
            (acc, index) => ({ ...acc, [index]: added }),
            {}
          )}
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
