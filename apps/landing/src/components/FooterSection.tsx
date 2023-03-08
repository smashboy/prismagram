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
      {options.map(({ label, url, disabled, newWindow }) => (
        <Anchor
          key={label}
          href={url}
          color="dark.5"
          fw={500}
          size="sm"
          sx={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : void 0 }}
          {...(newWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </Anchor>
      ))}
    </Stack>
  </Stack>
)
