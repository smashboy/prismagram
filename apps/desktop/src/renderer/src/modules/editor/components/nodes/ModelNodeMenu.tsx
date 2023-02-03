import { ActionIcon, Menu } from '@mantine/core'
import { IconDotsVertical, IconPlugConnected, IconRowInsertBottom } from '@tabler/icons'

export const ModelNodeMenu = () => {
  return (
    <Menu width={200}>
      <Menu.Target>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconRowInsertBottom size={14} />}>New field</Menu.Item>
        <Menu.Item icon={<IconPlugConnected size={14} />}>New relation</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
