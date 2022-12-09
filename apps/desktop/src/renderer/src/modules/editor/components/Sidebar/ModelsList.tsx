import { NavLink, Stack, TextInput } from '@mantine/core'
import { IconBorderAll, IconSearch } from '@tabler/icons'
import { useList } from 'effector-react'
import { $nodesArray } from '../../stores'

export const ModelsList = () => {
  const models = useList($nodesArray, ({ data: { name } }, index) => (
    <NavLink
      label={name}
      variant="filled"
      active={index === 4}
      icon={<IconBorderAll size={16} stroke={1.5} />}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: index === 4 ? theme.shadows.xs : void 0
      })}
    />
  ))

  return (
    <Stack h="100%">
      <TextInput icon={<IconSearch size={14} />} placeholder="Search models..." />
      <Stack h="100%" spacing={5}>
        {models}
      </Stack>
    </Stack>
  )
}
