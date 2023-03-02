import { useStore, useStoreMap } from 'effector-react'
import { $schemaModels, $schemaState } from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/_new/blocks'
import { ModelFieldForm } from './ModelFieldForm'
import { BlockBaseForm } from '../BlockBaseForm'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlugConnected, IconPlus } from '@tabler/icons'

interface ModelFormProps {
  modelId: string
}

export const ModelForm: React.FC<ModelFormProps> = ({ modelId }) => {
  const schemaState = useStore($schemaState)

  const data = useStoreMap({
    store: $schemaModels,
    keys: [modelId],
    fn: (models, [id]) => models.get(id)!
  })

  const model = new Model(data.name, schemaState, data)

  return (
    <BlockBaseForm
      block={model}
      actions={
        <>
          <Tooltip label="New relation">
            <ActionIcon size="sm">
              <IconPlugConnected />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="New field">
            <ActionIcon size="sm">
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </>
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
