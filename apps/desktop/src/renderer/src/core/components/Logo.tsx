import { Box, Paper } from '@mantine/core'

export const Logo = ({ size = 512 }) => (
  <Paper
    sx={(theme) => ({
      background: theme.fn.gradient({
        from: theme.colors.dark[6],
        to: theme.colors.dark[4],
        deg: 20
      }),
      width: size,
      height: size,
      margin: '0 auto',
      marginTop: '10%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    })}
  >
    <Box
      sx={(theme) => ({
        width: 0,
        height: 0,
        borderLeft: `${size / 4}px solid transparent`,
        borderRight: `${size / 4}px solid transparent`,
        borderBottom: `${size / 2}px solid ${theme.colors.blue[6]}`,
        filter: `drop-shadow(25px 20px 0px ${theme.colors.pink[6]})`
      })}
    />
  </Paper>
)
