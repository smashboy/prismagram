import Head from 'next/head'
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Paper,
  Anchor,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Timeline,
  Title,
  useMantineTheme
} from '@mantine/core'
import {
  IconSitemap,
  IconPlugConnected,
  IconBulb,
  IconDragDrop,
  IconBrain,
  IconMap
} from '@tabler/icons-react'
import { FeaturePreviewCard } from '@/components/FeaturePreviewCard'
import { FeatureCard } from '@/components/FeatureCard'
import { LandingSection } from '@/components/LandingSection'
import { RoadmapItem } from '@/components/RoadmapItem'
import { SupportButton } from '@/components/SupportButton'
import Link from 'next/link'

const PRIMARY_COL_HEIGHT = rem(500)

const title = 'Prismagram - visual prisma schema builder'
const description =
  'Build your prisma database schemas more efficiently with user interface capabilities.'

export default function Home() {
  const theme = useMantineTheme()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`

  return (
    <>
      <Head>
        <title>Prismagram - visual prisma schema builder</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      <Stack>
        <Container size="xl" pt={250}>
          <Title align="center" sx={{ fontSize: rem(65) }}>
            Prismagram,{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              inherit
            >
              visual
            </Text>{' '}
            prisma schema builder
          </Title>
        </Container>
        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" align="center" sx={{ fontSize: rem(25) }}>
            Build your prisma database schemas more efficiently with user interface capabilities.
          </Text>
        </Container>
        <Container>
          <Group>
            <SupportButton size="md" color="pink" />
            <Button href="/download" size="md" component={Link}>
              Download
            </Button>
          </Group>
        </Container>
        <Container p={0} mt={rem(70)} size="lg">
          <Paper
            radius="lg"
            sx={{ boxShadow: 'rgba(149, 157, 165, 0.4) 0px 8px 54px', overflow: 'hidden' }}
          >
            <video src="/videos/hero.mp4" width="100%" height="auto" muted loop autoPlay />
          </Paper>
        </Container>
        <LandingSection title="Features">
          <SimpleGrid cols={2} spacing="md" w="100%">
            <Grid gutter="md">
              <Grid.Col>
                <FeaturePreviewCard
                  title="Schema diagram"
                  color="blue"
                  icon={IconSitemap}
                  height={SECONDARY_COL_HEIGHT}
                  largeIcon
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <FeaturePreviewCard
                  title="Spotlight"
                  color="cyan"
                  icon={IconBulb}
                  height={SECONDARY_COL_HEIGHT}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <FeaturePreviewCard
                  title="Drag and drop"
                  color="grape"
                  icon={IconDragDrop}
                  height={SECONDARY_COL_HEIGHT}
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="md">
              <Grid.Col span={6}>
                <FeaturePreviewCard
                  title="Smart editor"
                  color="green"
                  icon={IconBrain}
                  height={SECONDARY_COL_HEIGHT}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <FeaturePreviewCard
                  title="Relations manager"
                  color="orange"
                  icon={IconPlugConnected}
                  height={SECONDARY_COL_HEIGHT}
                />
              </Grid.Col>
              <Grid.Col>
                <FeaturePreviewCard
                  title="And much more coming soon..."
                  color="pink"
                  icon={IconMap}
                  height={SECONDARY_COL_HEIGHT}
                  largeIcon
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
          <Stack w="100%" mt="xs" spacing="xl">
            <FeatureCard
              title="Schema diagram"
              icon={IconSitemap}
              color="blue"
              videoUrl="/videos/diagram.mp4"
              description="Prisma schema visualization is a powerful tool that simplifies the process of database schema design and enables users to easily visualize their database schema using diagrams. With its intuitive interface, users can quickly create and edit their schema, add relationships between tables, and visualize data types and constraints. The diagrams are fully customizable, allowing users to tailor them to their specific needs."
            />
            <FeatureCard
              title="Drag and drop"
              color="grape"
              icon={IconDragDrop}
              videoUrl="/videos/dnd.mp4"
              description="Drag-and-drop interface simplifies the process of creating schema models and enums. With an intuitive user interface, users can easily create and modify database schema models and enums by dragging and dropping components onto the diagram canvas."
            />
            <FeatureCard
              title="Relations manager"
              color="orange"
              icon={IconPlugConnected}
              videoUrl="/videos/relations.mp4"
              description="Diagram interface allows for easy creation of schema relations by simply dragging and connecting components on the diagram canvas. This feature simplifies the process of defining relationships between tables."
            />
            <FeatureCard
              title="Smart editor"
              color="green"
              icon={IconBrain}
              videoUrl="/videos/smarteditor.mp4"
              description="Schema editor automates routine tasks, such as removing relations of deleted models and auto renaming model, and enum references. With this feature, developers can quickly and easily modify the schema, reducing the likelihood of errors and increasing productivity. The editor's intelligent functionality simplifies the development process, enabling developers to focus on more complex tasks."
            />
            <FeatureCard
              title="Spotlight"
              color="cyan"
              icon={IconBulb}
              videoUrl="/videos/spotlight.mp4"
              description="Quickly search and navigate around app, your prisma schema and use most common actions like creating new models and enums."
            />
          </Stack>
        </LandingSection>
        <LandingSection title="Roadmap">
          <Stack spacing="xl" w="100%" align="center">
            <Timeline w="50%" active={1} lineWidth={5} bulletSize={24}>
              <Timeline.Item title="Demo release">
                <RoadmapItem
                  description="Create projects for prisma schema, diagram visualization, create model and enums, create relations between models."
                  releaseDate="24.02.2023"
                />
              </Timeline.Item>
              <Timeline.Item title="v0.1.0">
                <RoadmapItem
                  description="Enhanced spotlight, reworked models and enums editor, dark mode, explicit n-m relations."
                  releaseDate="07.03.2023"
                />
              </Timeline.Item>
              <Timeline.Item title="v0.2.0">
                <RoadmapItem
                  description="Diagrams customization, improved prisma schema support."
                  releaseDate="Coming soon..."
                />
              </Timeline.Item>
              <Timeline.Item title="v0.3.0">
                <RoadmapItem
                  description="Model field and block attributes editor."
                  releaseDate="Coming soon..."
                />
              </Timeline.Item>
              <Timeline.Item title="v0.4.0">
                <RoadmapItem
                  description="Custom prisma schema generators support."
                  releaseDate="Coming soon..."
                />
              </Timeline.Item>
              <Timeline.Item title="v1.0.0">
                <RoadmapItem releaseDate="Coming soon..." />
              </Timeline.Item>
            </Timeline>
            <Text color="dimmed">
              For a more detailed overview, please check out our{' '}
              <Anchor
                href="https://github.com/smashboy/prismagram/projects?query=is%3Aopen"
                target="_blank"
                rel="noopener noreferrer"
              >
                github projects
              </Anchor>
              {' and '}
              <Anchor
                href="https://github.com/smashboy/prismagram/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                releases.
              </Anchor>
            </Text>
          </Stack>
          <Card
            w="100%"
            h="60vh"
            p="xl"
            radius="xl"
            mt={rem(100)}
            sx={(theme) => ({
              backgroundImage: theme.fn.gradient({ from: 'blue', to: 'pink', deg: 45 })
            })}
          >
            <Stack w="100%" h="100%" justify="center" align="center">
              <Title color="white" order={4} size={rem(30)}>
                Prismagram is open sourced and completely free
              </Title>
              <Text color="gray.1">Try it out today.</Text>
              <Group pt="xl">
                <Button href="/download" component={Link} size="lg" variant="filled">
                  Download
                </Button>
                <SupportButton size="lg" variant="filled" color="pink" />
              </Group>
            </Stack>
          </Card>
        </LandingSection>
      </Stack>
    </>
  )
}
