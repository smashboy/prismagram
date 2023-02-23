import { Button, Group, Modal, Select, Stack, TextInput } from '@mantine/core'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Model } from 'prisma-state/_new/blocks'
import { EnumModelField } from 'prisma-state/_new/fields'
import {
  $createEnumFieldModalData,
  $isOpenCreateEnumFieldModal,
  $schemaModelIds,
  $schemaState,
  resetCreateEnumFieldModalDataEvent,
  setCreateEnumFieldModalDataEvent,
  setPrismaSchemaEvent,
  toggleCreateEnumFieldModalEvent
} from '../stores'

const $store = combine({
  isOpen: $isOpenCreateEnumFieldModal,
  modelIds: $schemaModelIds,
  data: $createEnumFieldModalData,
  schemaState: $schemaState
})

export const CreateEnumFieldModal = () => {
  const { isOpen, modelIds, data, schemaState } = useStore($store)

  const { fieldName, model: modelName, enum: enumName } = data

  const disableCreateBtn = !fieldName || !modelName

  const handleCloseDialog = () => {
    toggleCreateEnumFieldModalEvent(false)
    resetCreateEnumFieldModalDataEvent()
  }

  const handleModelSelect = (value: string | null) => {
    if (!value) return

    setCreateEnumFieldModalDataEvent({
      ...data,
      model: value
    })
  }

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCreateEnumFieldModalDataEvent({
      ...data,
      fieldName: event.currentTarget.value
    })

  const handleCreateNewEnumField = () => {
    handleCloseDialog()

    const model = new Model(modelName, schemaState, schemaState.model(modelName))
    model.addField(fieldName, new EnumModelField(fieldName, enumName, modelName)._data())

    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Modal opened={isOpen} onClose={handleCloseDialog} title="New enum field">
      <Stack>
        <Select label="Model" value={modelName} onChange={handleModelSelect} data={modelIds} />
        <TextInput label="Field name" value={fieldName} onChange={handleNameInput} />
        <Group position="right">
          <Button variant="subtle" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleCreateNewEnumField} disabled={disableCreateBtn} variant="subtle">
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
