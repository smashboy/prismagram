import { useBoolean } from 'react-use'
import { useStore, useStoreMap } from 'effector-react'
import {
  $schemaEnums,
  $schemaState,
  setCreateEnumFieldModalDataEvent,
  toggleCreateEnumFieldModalEvent
} from '@renderer/modules/editor/stores'
import { IconPlus, IconRowInsertBottom } from '@tabler/icons'
import { Enum } from 'prisma-state/_new/blocks'
import { BlockBaseForm } from '../BlockBaseForm'
import { ActionIcon, Tooltip } from '@mantine/core'
import { EnumFieldForm } from './EnumFieldForm'
import { useStableFieldIds } from '../hooks/useStableFieldIds'

interface EnumFormProps {
  enumId: string
}

export const EnumForm: React.FC<EnumFormProps> = ({ enumId }) => {
  const schemaState = useStore($schemaState)

  const [, toggleOpenNewFieldForm] = useBoolean(false)

  const enumItem = useStoreMap({
    store: $schemaEnums,
    keys: [enumId],
    fn: (models, [id]) => {
      const data = models.get(id)!
      return new Enum(data.name, schemaState, data)
    }
  })

  const [fieldStableIds, setStableFieldName] = useStableFieldIds(enumItem.fieldsArray)

  const handleOpenNewFieldForm = () => toggleOpenNewFieldForm(true)
  // const handleCloseNewFieldForm = () => toggleOpenNewFieldForm(false)

  const handleOpenNewModelEnumFieldModal = () => {
    toggleCreateEnumFieldModalEvent(true)
    setCreateEnumFieldModalDataEvent({
      model: '',
      fieldName: '',
      enum: enumItem.name
    })
  }

  return (
    <BlockBaseForm
      block={enumItem}
      fieldIds={fieldStableIds.map((id) => id[0])}
      actions={
        <>
          <Tooltip label="New model enum field">
            <ActionIcon onClick={handleOpenNewModelEnumFieldModal} size="sm">
              <IconRowInsertBottom />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="New field">
            <ActionIcon onClick={handleOpenNewFieldForm} size="sm">
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </>
      }
    >
      {fieldStableIds.map(([id, fieldName]) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <EnumFieldForm
          key={id}
          stableId={id}
          field={enumItem.field(fieldName)}
          setStableFieldName={setStableFieldName}
          enum={enumItem}
        />
      ))}
    </BlockBaseForm>
  )
}
