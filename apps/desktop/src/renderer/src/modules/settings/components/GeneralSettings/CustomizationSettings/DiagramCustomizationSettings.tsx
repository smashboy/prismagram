import { Select, Slider, Stack, Switch } from '@mantine/core'
import { SettingsSectionPaper } from '../../SettingsSectionPaper'

export const DiagramCustomizationSettings = () => {
  return (
    <SettingsSectionPaper title="Diagram">
      <Stack>
        <Switch label="Show minimap" />
        <Select label="Background variant" data={[]} />
        <Stack spacing={0}>
          <Slider label="Snap size" disabled />
          <Switch label="Snap to grid" />
        </Stack>
      </Stack>
    </SettingsSectionPaper>
  )
}
