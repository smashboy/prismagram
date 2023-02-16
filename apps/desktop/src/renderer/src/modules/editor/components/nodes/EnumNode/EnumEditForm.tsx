import React, { useEffect, useState } from 'react'
import { Stack } from '@mantine/core'
import { ConfirmInput } from '@renderer/core/components'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { NodeDnDContext } from '../NodeDnDContext'
import { EnumNodeEditField } from './EnumNodeEditField'
import { Enum } from 'prisma-state/blocks'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

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
  const { fieldNames, fields } = block

  const [newOption, setNewOption] = useState('')

  useEffect(() => setNewOption(''), [isOpenNewOptionField])

  const handleNewOptionInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewOption(event.target.value)

  const handleAddNewOption = () => {
    block.addOption(newOption)
    onCloseNewOptionField()
    updatePrismaSchemaEvent()
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = fieldNames.indexOf(active.id as string)
    const newIndex = fieldNames.indexOf(over.id as string)

    block._setFromArray(arrayMove(fields, oldIndex, newIndex))

    updatePrismaSchemaEvent()
  }

  return (
    <Stack>
      <NodeDnDContext fieldNames={fieldNames} onDragEnd={onDragEnd}>
        {fields.map((field) => (
          <EnumNodeEditField key={field.name} block={block} field={field} />
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
