import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Model } from 'prisma-state/blocks'
import { ActionIcon, Group, Text, TextInput } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { $nodesColors, $selectedNodeId } from '../../stores'
import { NEW_MODEL_NODE_ID } from '../../config'

interface ModelNameInputProps {
  model?: Model
  onSave: (name: string) => void
  onCloseWithoutCreation?: () => void
}

const $store = combine({
  nodesColors: $nodesColors,
  selectedNodeId: $selectedNodeId
})

export const ModelNameInput: React.FC<ModelNameInputProps> = ({
  model,
  onSave,
  onCloseWithoutCreation
}) => {
  const { nodesColors, selectedNodeId } = useStore($store)

  const [isOpen, setIsOpen] = useState(!model?.name)
  const [name, setName] = useState(model?.name || '')

  useEffect(() => {
    if (!model && selectedNodeId !== NEW_MODEL_NODE_ID) return onCloseWithoutCreation?.()
    if (model && model.name !== selectedNodeId) handleCloseEdit(true)
  }, [selectedNodeId])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleCloseEdit = (forceReset?: boolean) => {
    if ((!name && model) || (model && forceReset)) setName(model.name)

    setIsOpen(false)
  }

  const handleOpenEdit = () => setIsOpen(true)

  const handleSaveChanges = () => onSave(name)

  if (isOpen)
    return (
      <Group>
        <TextInput
          value={name}
          onChange={handleInputChange}
          placeholder="Model name..."
          sx={{ flex: 1 }}
        />
        <ActionIcon onClick={() => handleCloseEdit()} disabled={!model} color="red">
          <IconX />
        </ActionIcon>
        <ActionIcon onClick={handleSaveChanges} disabled={!name} color="green">
          <IconCheck />
        </ActionIcon>
      </Group>
    )

  return (
    <Text
      onClick={handleOpenEdit}
      size="xl"
      color={nodesColors[name]}
      sx={{ cursor: 'pointer', pointerEvents: selectedNodeId !== model?.name ? 'none' : void 0 }}
    >
      {name}
    </Text>
  )
}
