import { Container, rem, Stack, Title } from '@mantine/core'

interface LandingSectionProps {
  title: string
  children: React.ReactNode
}

export const LandingSection: React.FC<LandingSectionProps> = ({ title, children }) => (
  <Container size="xl" mt="xl" w="100%">
    <Title order={2} align="center" fz={rem(50)} my={rem(70)}>
      {title}
    </Title>
    <Stack w="100%">{children}</Stack>
  </Container>
)
