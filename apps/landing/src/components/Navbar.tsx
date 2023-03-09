import { Button, Group, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Group href="/" sx={{ flex: 1, userSelect: 'none', textDecoration: 'none' }} component={Link}>
        <Image
          src="/logo.svg"
          alt="Prismagram logo"
          width={32}
          height={32}
          priority
          style={{ pointerEvents: 'none' }}
        />
        <Text fw="bold" color="dark" size="lg">
          Prismagram
          <Text color="dimmed" size="xs" component="span" ml={3}>
            v0.1.1
          </Text>
        </Text>
      </Group>
      <Button href="/download" component={Link} size="md" variant="filled">
        Download
      </Button>
    </Group>
  </PaperGlass>
)
