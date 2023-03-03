import {
  Card,
  createStyles,
  Flex,
  Group,
  Image,
  MantineColor,
  rem,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import type { Icon } from '@tabler/icons-react'

interface FeatureCardProps {
  title: string
  description: string
  imageUrl: string
  icon: Icon
  color: MantineColor
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  imageUrl,
  color
}) => {
  return (
    <Card
      w="100%"
      h="60vh"
      p="xl"
      radius="xl"
      sx={(theme) => ({ backgroundColor: theme.colors[color][0] })}
    >
      <SimpleGrid cols={2} h="100%">
        <Stack h="100%">
          <Stack>
            <ThemeIcon color={color} size={rem(60)}>
              <Icon size={rem(30)} />
            </ThemeIcon>
            <Title fw={500} order={3} size={rem(30)}>
              {title}
            </Title>
          </Stack>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
          </Text>
        </Stack>
        <Flex h="100%" align="center">
          <Image src={imageUrl} alt={title} radius="xl" />
        </Flex>
      </SimpleGrid>
    </Card>
  )
}