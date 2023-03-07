import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useBoolean } from 'react-use'
import { Enum, Model } from 'prisma-state/_new/blocks'
import {
  $schemaState,
  $selectedNodeId,
  setPrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { ConfirmInput } from '@renderer/core/components'
import { Text } from '@mantine/core'

interface BlockNameInputProps {
  block: Model | Enum
}

const $store = combine({
  selectedNodeId: $selectedNodeId,
  schemaState: $schemaState
})

export const BlockNameInput: React.FC<BlockNameInputProps> = ({ block }) => {
  const { selectedNodeId, schemaState } = useStore($store)

  const [isOpen, setIsOpen] = useBoolean(false)
  const [name, setName] = useState(block?.name || '')

  useEffect(() => {
    setIsOpen(false)
  }, [selectedNodeId])

  const handleCloseEdit = () => {
    if (block) setName(block.name)

    setIsOpen(false)
  }

  const handleOpenEdit = () => setIsOpen(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleSaveChanges = () => {
    block.setName(name)
    setPrismaSchemaEvent(schemaState._clone())
  }

  if (isOpen)
    return (
      <ConfirmInput
        value={name}
        onChange={handleInputChange}
        onCancel={handleCloseEdit}
        onConfirm={handleSaveChanges}
        disableClose={!block}
        disableConfirm={!name}
        placeholder="Model name..."
        sx={{ flexGrow: 1 }}
      />
    )

  return (
    <Text
      fw={500}
      sx={{
        cursor: 'pointer'
      }}
      onClick={handleOpenEdit}
    >
      {block.name}
    </Text>
  )
}
