import React, { useEffect, useState } from 'react'
import { Stack } from '@mantine/core'
import { ConfirmInput } from '@renderer/core/components'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { NodeDnDContext } from '../NodeDnDContext'
import { EnumNodeEditField } from './EnumNodeEditField'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Enum } from 'prisma-state/_new/blocks'
import { EnumFieldData } from 'prisma-state/_new/types'
import { useStore } from 'effector-react'

interface EnumEditFormProps {
  block: Enum
  isOpenNewOptionField: boolean
  onCloseNewOptionField: () => void
}

export const EnumEditForm: React.FC<EnumEditFormProps> = ({
  block,
  isOpenNewOptionField,
  onCloseNewOptionField
}) => {
  const state = useStore($schemaState)

  const [newOption, setNewOption] = useState('')

  useEffect(() => setNewOption(''), [isOpenNewOptionField])

  const handleNewOptionInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewOption(event.target.value)

  const handleAddNewOption = () => {
    block.addOption(newOption)
    onCloseNewOptionField()
    setPrismaSchemaEvent(state._clone())
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = block.fieldNames.indexOf(active.id as string)
    const newIndex = block.fieldNames.indexOf(over.id as string)

    block._setFromArray(arrayMove(block.fieldsArray as EnumFieldData[], oldIndex, newIndex))

    setPrismaSchemaEvent(state._clone())
  }

  return (
    <Stack>
      <NodeDnDContext fieldNames={block.fieldNames} onDragEnd={onDragEnd}>
        {block.fieldsArray.map((field) => (
          <EnumNodeEditField key={field.name} block={block} field={field as EnumFieldData} />
        ))}
        {isOpenNewOptionField && (
          <ConfirmInput
            value={newOption}
            onChange={handleNewOptionInput}
            onConfirm={handleAddNewOption}
            onCancel={onCloseNewOptionField}
            disableConfirm={!newOption}
          />
        )}
      </NodeDnDContext>
    </Stack>
  )
}
