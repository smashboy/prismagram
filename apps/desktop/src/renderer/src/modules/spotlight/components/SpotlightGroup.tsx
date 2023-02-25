import { createStyles, Stack } from '@mantine/core'
import { Command } from 'cmdk'

interface SpotlightGroup {
  label: string
  children: React.ReactNode
}

const useStyles = createStyles((theme) => ({
  root: {
    '[cmdk-group-heading]': {
      textTransform: 'uppercase',
      fontSize: theme.spacing.xs,
      fontWeight: 700,
      padding: '10px 12px',
      paddingBottom: 0,
      paddingTop: 15,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]
    }
  }
}))

export const SpotlightGroup: React.FC<SpotlightGroup> = ({ label, children }) => {
  const { classes } = useStyles()

  return (
    <Command.Group className={classes.root} heading={label}>
      <Stack spacing={0}>{children}</Stack>
    </Command.Group>
  )
}
