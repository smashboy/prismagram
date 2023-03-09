import { Button, ButtonProps } from '@mantine/core'

export const SupportButton: React.FC<ButtonProps> = (props) => (
  <Button
    {...props}
    href="https://www.buymeacoffee.com/smashboy"
    target="_blank"
    rel="noopener noreferrer"
    component="a"
  >
    Support project
  </Button>
)
