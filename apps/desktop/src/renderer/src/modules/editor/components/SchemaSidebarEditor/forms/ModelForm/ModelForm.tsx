import { useStore, useStoreMap } from 'effector-react'
import { useBoolean } from 'react-use'
import {
  $schemaModels,
  $schemaState,
  setCreateRelationModalDataEvent,
  toggleCreateRelationModalEvent
} from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/_new/blocks'
import { ModelFieldForm } from './ModelFieldForm'
import { BlockBaseForm } from '../BlockBaseForm'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlugConnected, IconPlus } from '@tabler/icons'
import { NewModelFieldForm } from './NewModelFieldForm'

interface ModelFormProps {
  modelId: string
}

export const ModelForm: React.FC<ModelFormProps> = ({ modelId }) => {
  const schemaState = useStore($schemaState)

  const [isNewFieldFormOpen, toggleOpenNewFieldForm] = useBoolean(false)

  const data = useStoreMap({
    store: $schemaModels,
    keys: [modelId],
    fn: (models, [id]) => models.get(id)!
  })

  const model = new Model(data.name, schemaState, data)

  const openCreateRelationModal = () => {
    toggleCreateRelationModalEvent(true)
    setCreateRelationModalDataEvent({
      source: model.name,
      target: '',
      name: '',
      onDelete: null,
      onUpdate: null,
      isOptional: false
    })
  }

  const handleOpenNewFieldForm = () => toggleOpenNewFieldForm(true)
  const handleCloseNewFieldForm = () => toggleOpenNewFieldForm(false)

  return (
    <BlockBaseForm
      block={model}
      actions={
        <>
          <Tooltip label="New relation">
            <ActionIcon onClick={openCreateRelationModal} size="sm">
              <IconPlugConnected />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="New field">
            <ActionIcon onClick={handleOpenNewFieldForm} size="sm">
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </>
      }
      form={
        <NewModelFieldForm
          isOpen={isNewFieldFormOpen}
          model={model}
          onClose={handleCloseNewFieldForm}
        />
      }
    >
      {model.fieldsArray.map((field) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ModelFieldForm key={field.name} field={field} model={model} />
      ))}
    </BlockBaseForm>
  )
}
