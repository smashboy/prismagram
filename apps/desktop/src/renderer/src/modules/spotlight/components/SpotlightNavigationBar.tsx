import { Badge, Group } from '@mantine/core'
import { useStore } from 'effector-react'
import { $spotlightSubActionNames } from '../stores'

export const SpotlightNavigationBar = () => {
  const items = useStore($spotlightSubActionNames)

  return (
    <Group sx={{ top: -30, position: 'absolute', zIndex: 10 }}>
      {items.map((item) => (
        <Badge key={item} color="gray" radius="sm" variant="filled">
          {item}
        </Badge>
      ))}
    </Group>
  )
}
