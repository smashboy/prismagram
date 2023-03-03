import { useBoolean } from 'react-use'
import { useStore, useStoreMap } from 'effector-react'
import { $schemaEnums, $schemaState } from '@renderer/modules/editor/stores'
import { IconPlus } from '@tabler/icons'
import { Enum } from 'prisma-state/_new/blocks'
import { BlockBaseForm } from '../BlockBaseForm'
import { ActionIcon, Tooltip } from '@mantine/core'
import { EnumFieldForm } from './EnumFieldForm'

interface EnumFormProps {
  enumId: string
}

export const EnumForm: React.FC<EnumFormProps> = ({ enumId }) => {
  const schemaState = useStore($schemaState)

  const [isNewFieldFormOpen, toggleOpenNewFieldForm] = useBoolean(false)

  const data = useStoreMap({
    store: $schemaEnums,
    keys: [enumId],
    fn: (models, [id]) => models.get(id)!
  })

  const enumItem = new Enum(data.name, schemaState, data)

  const handleOpenNewFieldForm = () => toggleOpenNewFieldForm(true)
  const handleCloseNewFieldForm = () => toggleOpenNewFieldForm(false)

  return (
    <BlockBaseForm
      block={enumItem}
      actions={
        <>
          {/* <Tooltip label="New relation">
        <ActionIcon onClick={openCreateRelationModal} size="sm">
          <IconPlugConnected />
        </ActionIcon>
      </Tooltip> */}
          <Tooltip label="New field">
            <ActionIcon onClick={handleOpenNewFieldForm} size="sm">
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </>
      }
    >
      {enumItem.fieldsArray.map((field) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <EnumFieldForm key={field.name} field={field} enum={enumItem} />
      ))}
    </BlockBaseForm>
  )
}
