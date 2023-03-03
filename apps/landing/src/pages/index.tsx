import Image from 'next/image'
import Head from 'next/head'
import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
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
import appuiImage from '../../public/app-ui.png'
import { FeaturePreviewCard } from '@/components/FeaturePreviewCard'
import { FeatureCard } from '@/components/FeatureCard'
import { LandingSection } from '@/components/LandingSection'
import { RoadmapItem } from '@/components/RoadmapItem'

const PRIMARY_COL_HEIGHT = rem(500)

export default function Home() {
  const theme = useMantineTheme()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Container size={1400} pt={250}>
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
            <Button size="md" color="pink">
              Support project
            </Button>
            <Button size="md">Download</Button>
          </Group>
        </Container>
        <Container p={0} mt={rem(70)} size={1400}>
          <Paper
            radius="lg"
            sx={{ boxShadow: 'rgba(149, 157, 165, 0.4) 0px 8px 54px', overflow: 'hidden' }}
          >
            <Image src={appuiImage} alt="App user interface" width={1080} />
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
                  title="Dran and drop"
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
          <Stack w="100%" spacing="xl">
            <FeatureCard
              title="Schema diagram"
              imageUrl="/app-ui.png"
              icon={IconSitemap}
              color="blue"
              description=""
            />
            <FeatureCard
              title="Dran and drop"
              color="grape"
              icon={IconDragDrop}
              imageUrl="/app-ui.png"
              description=""
            />
            <FeatureCard
              title="Relations manager"
              color="orange"
              icon={IconPlugConnected}
              imageUrl="/app-ui.png"
              description=""
            />
            <FeatureCard
              title="Smart editor"
              color="green"
              icon={IconBrain}
              imageUrl="/app-ui.png"
              description=""
            />
            <FeatureCard
              title="Spotlight"
              color="cyan"
              icon={IconBulb}
              imageUrl="/app-ui.png"
              description=""
            />
          </Stack>
        </LandingSection>
        <LandingSection title="Roadmap">
          <Timeline w="100%" active={1} lineWidth={5} bulletSize={24}>
            <RoadmapItem />
            <RoadmapItem />
            <RoadmapItem />
            <RoadmapItem />
            <RoadmapItem />
          </Timeline>
        </LandingSection>
      </Stack>
    </>
  )
}
