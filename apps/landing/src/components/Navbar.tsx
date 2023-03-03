import { Button, Group, Text } from '@mantine/core'
import Image from 'next/image'
import { PaperGlass } from './PaperGlass'

export const Navbar = () => (
  <PaperGlass
    p="md"
    w="50%"
    pos="fixed"
    top={20}
    left="50%"
    style={{ transform: 'translateX(-50%)', zIndex: 1 }}
  >
    <Group>
      <Group sx={{ flex: 1, userSelect: 'none' }}>
        <Image
          src="/logo.svg"
          alt="Prismagram logo"
          width={32}
          height={32}
          priority
          style={{ pointerEvents: 'none' }}
        />
        <Text fw="bold" size="lg">
          Prismagram
          <Text color="dimmed" size="xs" component="span" ml={3}>
            v0.1.0
          </Text>
        </Text>
      </Group>
      <Button size="md" variant="filled">
        Download
      </Button>
    </Group>
  </PaperGlass>
)
