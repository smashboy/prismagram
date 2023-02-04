import { ActionIcon, Group, TextInput } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons'
import { useEffect, useRef } from 'react'

export const ModelNameInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => inputRef.current?.focus(), [])

  return (
    <Group>
      <TextInput ref={inputRef} placeholder="Model name..." />
      <ActionIcon color="red">
        <IconX />
      </ActionIcon>
      <ActionIcon color="green">
        <IconCheck />
      </ActionIcon>
    </Group>
  )
}
