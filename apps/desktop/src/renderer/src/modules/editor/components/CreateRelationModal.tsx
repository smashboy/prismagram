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
  resetCreateRelationModalData,
  setCreateRelationModalData,
  toggleCreateRelationModal
} from '../stores'
import { invoke } from '@renderer/core/electron'
import { EDITOR_FORMAT_SCHEMA } from '@shared/common/configs/api'
import { IconArrowRight } from '@tabler/icons'
import { RelationType } from 'prisma-state/constants'

const $store = combine({
  isOpen: $isOpenCreateRelationModal,
  data: $createRelationModalData,
  schemaState: $schemaState
})

// const deleted = { color: 'red', label: '-' }
const added = { color: 'blue' }

const relationTypeOptions = [
  RelationType.ONE_TO_ONE,
  RelationType.ONE_TO_MANY,
  RelationType.MANY_TO_MANY
]

export const CreateRelationModal = () => {
  const { isOpen, data, schemaState } = useStore($store)

  const { source, target, relation } = data

  const { modelIds } = schemaState

  const [result, setResult] = useState('')

  // const state = useMemo(() => {
  //   const state = new PrismaSchemaState()
  //   state.fromString(schema)
  //   return state
  // }, [schema])

  useEffect(() => {
    const handleFormatSchema = async () => {
      const prevSchemaString = schemaState.toString()

      const formatted = await invoke(EDITOR_FORMAT_SCHEMA, prevSchemaString)

      const newState = new PrismaSchemaState()
      newState.fromString(formatted)

      const sourceModel = newState.model(source)
      const targetModel = newState.model(target)

      if (!sourceModel || !targetModel) return

      console.log('TARGET:', { targetModel, prevSchemaString, newState })

      if (relation === '1-1') {
        newState.relations.createOneToOneRelation(sourceModel, targetModel)
      } else if (relation === '1-n') {
        newState.relations.createOneToManyRelation(sourceModel, targetModel)
      } else {
        newState.relations.createManyToManyRelation(sourceModel, targetModel)
      }

      // const oldState = new PrismaSchemaState()
      // oldState.fromString(prevSchema)

      // const sourceModel = state.model(source)
      // const targetModel = state.model(target)

      // const oldSourceModel = oldState.model(source)
      // const oldTargetModel = oldState.model(target)

      // if (!sourceModel || !targetModel || !oldSourceModel || !oldTargetModel) return

      const changes = `
      ${targetModel._toString()}
      ${sourceModel._toString()}
      `

      // const targetDiffIndexes = sourceModel.fieldNames.filter(
      //   (name) => !oldSourceModel.fieldNames.includes(name)
      // )
      // const sourceDiffIndexes = targetModel.fieldNames.filter(
      //   (name) => !oldTargetModel.fieldNames.includes(name)
      // )

      // console.log({
      //   targetDiffIndexes,
      //   sourceDiffIndexes
      // })

      const formattedChanges = await invoke(EDITOR_FORMAT_SCHEMA, changes)

      setResult(formattedChanges)
    }

    handleFormatSchema()
  }, [data])

  const handleCloseDialog = () => {
    toggleCreateRelationModal(false)
    resetCreateRelationModalData()
  }

  const handleConfirmCreateRelation = () => {
    handleCloseDialog()
    // setPrismaSchemaEvent(state.toString())
  }

  const handleSelectChange =
    (field: 'source' | 'target' | 'relation') => (value: string | null) => {
      if (!value) return
      setCreateRelationModalData({ ...data, [field]: value })
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
            value={relation}
            onChange={handleSelectChange('relation')}
            data={relationTypeOptions}
            sx={{ width: 100 }}
          />
        </Group>
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
