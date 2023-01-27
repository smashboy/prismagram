import { Paper, Text } from '@mantine/core'

export const Logo = () => (
  <Paper
    sx={(theme) => ({
      background: theme.fn.gradient({
        from: theme.colors.dark[6],
        to: theme.colors.dark[4],
        deg: 20
      }),
      width: 512,
      height: 512,
      margin: '0 auto',
      marginTop: '10%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })}
    radius="xl"
  >
    <Text
      variant="gradient"
      fw={700}
      gradient={{ from: 'blue', to: 'pink', deg: 45 }}
      sx={{ fontSize: 150 }}
    >
      PIDE
    </Text>
  </Paper>
)
