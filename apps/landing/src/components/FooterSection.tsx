import { Anchor, Stack, Text } from '@mantine/core'

export interface FooterSectionProps {
  title: string
  options: Array<{ label: string; url: string; disabled?: boolean; newWindow?: boolean }>
}

export const FooterSection: React.FC<FooterSectionProps> = ({ title, options }) => (
  <Stack>
    <Text fw={500} size="lg">
      {title}
    </Text>
    <Stack>
      {options.map(({ label, newWindow }) => (
        <Anchor key={label} color="dark.5" fw={500} size="sm">
          {label}
        </Anchor>
      ))}
    </Stack>
  </Stack>
)
