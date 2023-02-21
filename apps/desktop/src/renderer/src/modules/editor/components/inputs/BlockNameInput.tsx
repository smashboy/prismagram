import { useEffect, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Group, Text, ThemeIcon } from '@mantine/core'
import { IconBorderAll, IconLayoutList } from '@tabler/icons'
import { $nodesColors, $schemaState, $selectedNodeId, setPrismaSchemaEvent } from '../../stores'
import { ConfirmInput } from '@renderer/core/components'
import { Enum, Model } from 'prisma-state/_new/blocks'

interface BlockNameInputProps {
  block: Model | Enum
}

const $store = combine({
  nodesColors: $nodesColors,
  selectedNodeId: $selectedNodeId,
  state: $schemaState
})

export const BlockNameInput: React.FC<BlockNameInputProps> = ({ block }) => {
  const { nodesColors, selectedNodeId, state } = useStore($store)

  const color = nodesColors[block?.name || '']
  const Icon = block.type === 'model' ? IconBorderAll : IconLayoutList

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

  const handleSaveChanges = () => {
    block.setName(name)
    setPrismaSchemaEvent(state._clone())
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
