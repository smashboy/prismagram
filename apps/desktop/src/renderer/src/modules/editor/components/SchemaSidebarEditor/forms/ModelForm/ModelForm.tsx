import { useStore, useStoreMap } from 'effector-react'
import { $schemaModels, $schemaState } from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/_new/blocks'
import { ModelFieldForm } from './ModelFieldForm'
import { BlockBaseForm } from '../BlockBaseForm'

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
    <BlockBaseForm block={model}>
      {model.fieldsArray.map((field) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ModelFieldForm key={field.name} field={field} model={model} />
      ))}
    </BlockBaseForm>
  )
}
