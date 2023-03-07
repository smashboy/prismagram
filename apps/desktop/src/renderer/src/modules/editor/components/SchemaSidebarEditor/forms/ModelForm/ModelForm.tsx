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
import { useStableFieldIds } from '../hooks/useStableFieldIds'

interface ModelFormProps {
  modelId: string
}

export const ModelForm: React.FC<ModelFormProps> = ({ modelId }) => {
  const schemaState = useStore($schemaState)

  const model = useStoreMap({
    store: $schemaModels,
    keys: [modelId],
    fn: (models, [id]) => {
      const data = models.get(id)!
      return new Model(data.name, schemaState, data)
    }
  })

  const [fieldStableIds, setStableFieldName] = useStableFieldIds(model.fieldsArray)
  const [isNewFieldFormOpen, toggleOpenNewFieldForm] = useBoolean(false)

  const handleOpenCreateRelationModal = () => {
    toggleCreateRelationModalEvent(true)
    setCreateRelationModalDataEvent({
      source: model.name,
      target: '',
      name: '',
      onDelete: null,
      onUpdate: null,
      isOptional: false,
      isExplicit: false
    })
  }

  const handleOpenNewFieldForm = () => toggleOpenNewFieldForm(true)
  const handleCloseNewFieldForm = () => toggleOpenNewFieldForm(false)

  return (
    <BlockBaseForm
      block={model}
      fieldIds={fieldStableIds.map((id) => id[0])}
      actions={
        <>
          <Tooltip label="New relation">
            <ActionIcon onClick={handleOpenCreateRelationModal} size="sm">
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
      {fieldStableIds.map(([id, fieldName]) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ModelFieldForm
          key={id}
          stableId={id}
          field={model.field(fieldName)}
          model={model}
          setStableFieldName={setStableFieldName}
        />
      ))}
    </BlockBaseForm>
  )
}
