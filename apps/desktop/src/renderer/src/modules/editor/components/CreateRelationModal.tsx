import { useEffect, useState } from 'react'
import { PrismaSchemaState } from 'prisma-state'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Alert, Button, Group, Select, Stack, Text, Transition } from '@mantine/core'
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
  toggleCreateRelationModalEvent
} from '../stores'
import { invoke } from '@renderer/core/electron'
import { EDITOR_FORMAT_SCHEMA } from '@shared/common/configs/api'
import { IconArrowRight } from '@tabler/icons'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { ReferentialActionSelect } from './inputs/ReferentialActionSelect'
import { RelationField } from 'prisma-state/fields'
import { RelationAttribute } from 'prisma-state/attributes'
import { ModelRelationFieldOptionalSwitch } from './inputs/ModelRelationFieldOptionalSwitch'
import { RelationNameInput } from './inputs/RelationNameInput'
import { LargeModal } from '@renderer/core/components'

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

  const sourceModel = schemaState.model(source)
  const targetModel = schemaState.model(target)

  const sourceRelationFieldName = relation?.[0] || ''

  const updatedSourceModel = updatedState.model(source)

  const showWarningMessage =
    sourceModel && targetModel && schemaState.relations.relationExists(sourceModel, targetModel)

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        relation = newState.relations.createOneToOneRelation(sourceModel, targetModel)
      } else if (selectedRelationType === '1-n') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        relation = newState.relations.createOneToManyRelation(sourceModel, targetModel)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
    toggleCreateRelationModalEvent(false)
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
    <LargeModal title="Create relation" opened={isOpen} onClose={handleCloseDialog}>
      <Stack justify="space-between" h="100%">
        <Group h="100%" align="flex-start" noWrap>
          <Stack w="40%">
            <Group>
              <Select
                label="From"
                value={source}
                onChange={handleSelectChange('source')}
                data={modelIds}
                searchable
              />
              <IconArrowRight size={16} style={{ marginTop: 23 }} />
              <Select
                label="To"
                value={target}
                onChange={handleSelectChange('target')}
                data={modelIds}
                searchable
              />
              <Select
                label="Type"
                value={selectedRelationType}
                onChange={handeRelationChange}
                data={relationTypeOptions}
                sx={{ width: 100 }}
              />
            </Group>
            <RelationNameInput
              name={sourceRelationFieldName}
              model={updatedSourceModel}
              state={updatedState}
              onChange={setUpdatedState}
            />
            <Transition mounted={selectedRelationType !== 'n-m'} transition="fade">
              {(style) => (
                <Stack style={style}>
                  <Group grow>
                    <ReferentialActionSelect
                      name={sourceRelationFieldName}
                      model={updatedSourceModel}
                      state={updatedState}
                      onChange={setUpdatedState}
                      variant="onUpdate"
                    />
                    <ReferentialActionSelect
                      name={sourceRelationFieldName}
                      model={updatedSourceModel}
                      onChange={setUpdatedState}
                      state={updatedState}
                    />
                  </Group>
                  <ModelRelationFieldOptionalSwitch
                    name={sourceRelationFieldName}
                    model={updatedSourceModel}
                    state={updatedState}
                    onChange={setUpdatedState}
                  />
                </Stack>
              )}
            </Transition>
            {showWarningMessage && (
              <Alert title="Warning! This relation already exists" color="yellow">
                If you want to add another relation between this models, you have to add relation
                name or previous relation will be overwritten.
              </Alert>
            )}
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <Text>Preview</Text>
            <Prism
              language="json"
              highlightLines={hightligthLineIndexes.reduce(
                (acc, index) => ({ ...acc, [index]: added }),
                {}
              )}
              sx={{ maxHeight: '100%', overflowY: 'auto' }}
              withLineNumbers
              noCopy
            >
              {result}
            </Prism>
          </Stack>
        </Group>
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleConfirmCreateRelation} variant="subtle">
            Create
          </Button>
        </Group>
      </Stack>
    </LargeModal>
  )
}
