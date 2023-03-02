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
      <Group sx={{ flex: 1 }}>
        <Image src="/logo.svg" alt="Prismagram logo" width={32} height={32} priority />
        <Text fw="bold" size="lg">
          Prismagram
        </Text>
      </Group>
      <Button size="md" variant="filled">
        Download
      </Button>
    </Group>
  </PaperGlass>
)
