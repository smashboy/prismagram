import { Center, createStyles, Group, Highlight, UnstyledButton } from '@mantine/core'
import { SpotlightAction } from '@mantine/spotlight'
import { Command } from 'cmdk'
import { toggleOpenSpotlightEvent } from '../stores'

interface SpotlightItemProps {
  action: SpotlightAction
}

const useStyles = createStyles((theme) => ({
  action: {
    position: 'relative',
    display: 'block',
    width: '100%',
    padding: '10px 12px',
    borderRadius: theme.fn.radius(theme.defaultRadius),
    "&[aria-selected='true']": {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }
  },

  actionIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]
  },

  actionBody: {}
}))

export const SpotlightItem: React.FC<SpotlightItemProps> = ({ action }) => {
  const { icon, title, onTrigger } = action

  const { classes } = useStyles()

  const handleActionSelect = () => {
    toggleOpenSpotlightEvent()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onTrigger()
  }

  return (
    <UnstyledButton
      value={title}
      onSelect={handleActionSelect}
      className={classes.action}
      component={Command.Item}
    >
      <Group noWrap>
        {icon && <Center className={classes.actionIcon}>{icon}</Center>}
        <div className={classes.actionBody}>
          <Highlight highlight="">{title}</Highlight>
        </div>
      </Group>
    </UnstyledButton>
  )
}
