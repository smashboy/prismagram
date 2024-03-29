import { Card, Container, Group, rem, SimpleGrid, Stack, Text } from '@mantine/core'
import Image from 'next/image'
import { FooterSection, FooterSectionProps } from './FooterSection'

const downloadSection: FooterSectionProps = {
  title: 'Download',
  options: [
    {
      label: 'Windows',
      url: 'https://github.com/smashboy/prismagram/releases/download/v0.1.1/prismagram-0.1.1-setup.exe'
    },
    { label: 'macOS', url: '', disabled: true },
    { label: 'Linux', url: '', disabled: true }
  ]
}

const resourcesSection: FooterSectionProps = {
  title: 'Resources',
  options: [
    { label: 'Changelog', url: 'https://github.com/smashboy/prismagram/releases', newWindow: true },
    {
      label: 'Report a bug',
      url: 'https://github.com/smashboy/prismagram/issues/new?assignees=&labels=bug&template=bug_report.md&title=',
      newWindow: true
    },
    {
      label: 'Suggest a feautre',
      url: 'https://github.com/smashboy/prismagram/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=',
      newWindow: true
    },
    { label: 'Documentation', url: '', disabled: true },
    { label: 'Blog', url: '', disabled: true }
  ]
}

const contactSection: FooterSectionProps = {
  title: 'Contact',
  options: [
    { label: 'GitHub', url: 'https://github.com/smashboy/prismagram', newWindow: true },
    { label: 'Discord', url: '', newWindow: true, disabled: true },
    { label: 'Twitter', url: '', newWindow: true, disabled: true }
  ]
}

export const Footer = () => (
  <Container size="xl" mt="xl" w="100%">
    <Card w="100%" h="40vh" p="xl" radius="xl" mt={rem(150)} mb="xl" bg="gray.0">
      <Group w="100%" h="100%">
        <Stack sx={{ flex: 1 }}>
          <Image
            src="/logo.svg"
            alt="Prismagram logo"
            width={48}
            height={48}
            priority
            style={{ pointerEvents: 'none' }}
          />
          <Text fw="bold" size="xl" sx={{ userSelect: 'none' }}>
            Prismagram
          </Text>
        </Stack>
        <SimpleGrid spacing={rem(100)} cols={3}>
          <FooterSection {...resourcesSection} />
          <FooterSection {...downloadSection} />
          <FooterSection {...contactSection} />
        </SimpleGrid>
      </Group>
    </Card>
  </Container>
)
