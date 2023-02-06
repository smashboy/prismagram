import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Enum, Model } from 'prisma-state/blocks'
import { ActionIcon, Group, Text, TextInput, ThemeIcon } from '@mantine/core'
import { IconBorderAll, IconCheck, IconLayoutList, IconX } from '@tabler/icons'
import { $nodesColors, $selectedNodeId } from '../../stores'

interface BlockNameInputProps {
  block?: Model | Enum
  onSave: (name: string) => void
}

const $store = combine({
  nodesColors: $nodesColors,
  selectedNodeId: $selectedNodeId
})

export const BlockNameInput: React.FC<BlockNameInputProps> = ({ block, onSave }) => {
  const { nodesColors, selectedNodeId } = useStore($store)

  const color = nodesColors[block?.name || '']
  const Icon = block instanceof Model ? IconBorderAll : IconLayoutList

  const [isOpen, setIsOpen] = useState(!block?.name)
  const [name, setName] = useState(block?.name || '')

  useEffect(() => {
    if (block && block.name !== selectedNodeId) handleCloseEdit()
  }, [selectedNodeId])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleCloseEdit = () => {
    if (block) setName(block.name)

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
        <ActionIcon onClick={handleCloseEdit} disabled={!block} color="red">
          <IconX />
        </ActionIcon>
        <ActionIcon onClick={handleSaveChanges} disabled={!name} color="green">
          <IconCheck />
        </ActionIcon>
      </Group>
    )

  return (
    <Group>
      <ThemeIcon variant="light" color="gray">
        <Icon />
      </ThemeIcon>
      <Text
        onClick={handleOpenEdit}
        size="xl"
        color={color}
        sx={{ cursor: 'pointer', pointerEvents: selectedNodeId !== block?.name ? 'none' : void 0 }}
      >
        {name}
      </Text>
    </Group>
  )
}
