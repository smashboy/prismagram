import { createStyles, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { Command } from 'cmdk'

const useStyles = createStyles((theme) => ({
  input: {
    border: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white
  }
}))

export const SpotlightInput = () => {
  const { classes } = useStyles()

  return (
    <Input
      classNames={{ input: classes.input }}
      placeholder="Search..."
      icon={<IconSearch size={18} />}
      size="lg"
      sx={{ position: 'sticky', top: 0 }}
      component={Command.Input}
    />
  )
}
