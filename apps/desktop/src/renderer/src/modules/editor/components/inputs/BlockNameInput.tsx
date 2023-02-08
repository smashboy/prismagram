import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Enum, Model } from 'prisma-state/blocks'
import { Group, Text, ThemeIcon } from '@mantine/core'
import { IconBorderAll, IconLayoutList } from '@tabler/icons'
import { $nodesColors, $selectedNodeId } from '../../stores'
import { ConfirmInput } from '@renderer/core/components'

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
    if (block && block.name !== selectedNodeId?.nodeId) handleCloseEdit()
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
      <ConfirmInput
        value={name}
        onChange={handleInputChange}
        onCancel={handleCloseEdit}
        onConfirm={handleSaveChanges}
        disableClose={!block}
        disableConfirm={!name}
        placeholder="Model name..."
        sx={{ flex: 1 }}
      />
    )

  return (
    <Group
      onClick={handleOpenEdit}
      sx={{
        cursor: 'pointer',
        pointerEvents: selectedNodeId?.nodeId !== block?.name ? 'none' : void 0
      }}
    >
      <ThemeIcon variant="light" color="gray">
        <Icon />
      </ThemeIcon>
      <Text size="xl" color={color}>
        {name}
      </Text>
    </Group>
  )
}
