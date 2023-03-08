import Image from 'next/image'
import { Alert, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  IconAlertCircle,
  IconBrandApple,
  IconBrandUbuntu,
  IconBrandWindows
} from '@tabler/icons-react'

export default function DownloadPage() {
  return (
    <>
      <Container size="xl" pt={250}>
        <Stack spacing="xl" align="center">
          <Image
            src="/logo.svg"
            alt="Prismagram logo"
            width={128}
            height={128}
            priority
            style={{ pointerEvents: 'none' }}
          />
          <Title>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              inherit
            >
              Download{' '}
            </Text>
            Prismagram
          </Title>

          <Group>
            <Button
              href="https://github.com/smashboy/prismagram/releases/download/v0.1.1/prismagram-0.1.1-setup.exe"
              leftIcon={<IconBrandWindows />}
              variant="filled"
              size="lg"
              component="a"
            >
              Windows
            </Button>
            <Button leftIcon={<IconBrandApple />} variant="filled" size="lg" disabled>
              macOs
            </Button>
            <Button leftIcon={<IconBrandUbuntu />} variant="filled" size="lg" disabled>
              Ubuntu
            </Button>
          </Group>
          <Container size="sm">
            <Alert icon={<IconAlertCircle size="5rem" />} title="Warning!" radius="md">
              {
                'This project is still at a very early stage of development and does not support many features of the prisma schema. You can view the detailed changelog of the latest version to see a list of supported features.'
              }
            </Alert>
          </Container>
        </Stack>
      </Container>
    </>
  )
}
