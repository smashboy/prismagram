import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Group, Select, Stack, Switch, TextInput, Transition } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons'
import { ReferentialActionOption, RelationType, RelationTypeOption } from 'prisma-state/constants'
import {
  $createRelationModalData,
  $schemaModelIds,
  $selectedRelationType,
  setCreateRelationModalDataEvent,
  setSelectedRelationTypeEvent
} from '../../stores'
import { ReferentialActionSelect } from './ReferentialActionSelect'

const $store = combine({
  data: $createRelationModalData,
  modelIds: $schemaModelIds,
  selectedRelationType: $selectedRelationType
})

const relationTypeOptions = [
  RelationType.ONE_TO_ONE,
  RelationType.ONE_TO_MANY,
  RelationType.MANY_TO_MANY
]

export const NewRelationForm = () => {
  const { data, modelIds, selectedRelationType } = useStore($store)

  const { source, target, name: relationName, onDelete, onUpdate, isOptional } = data

  const disableNonNMActions = !target || selectedRelationType === 'n-m'

  const handeRelationChange = (value: RelationTypeOption | null) => {
    if (!value) return
    setSelectedRelationTypeEvent(value)
  }

  const handleSelectChange = (field: 'source' | 'target') => (value: string | null) => {
    if (!value) return
    setCreateRelationModalDataEvent({ ...data, [field]: value })
  }

  const handleReferentialActionSelect =
    (field: 'onUpdate' | 'onDelete') => (value: ReferentialActionOption | null) =>
      setCreateRelationModalDataEvent({ ...data, [field]: value })

  const handleRelationNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCreateRelationModalDataEvent({ ...data, name: event.target.value })

  const handleOptionalRelationSwitch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCreateRelationModalDataEvent({ ...data, isOptional: event.currentTarget.checked })

  return (
    <Stack w="40%">
      <Group>
        <Select
          label="From"
          value={source}
          onChange={handleSelectChange('source')}
          data={modelIds}
          searchable
        />
        <IconArrowRight size={16} style={{ marginTop: 23 }} />
        <Select
          label="To"
          value={target}
          onChange={handleSelectChange('target')}
          data={modelIds}
          searchable
        />
        <Select
          label="Type"
          value={selectedRelationType}
          onChange={handeRelationChange}
          data={relationTypeOptions}
          sx={{ width: 100 }}
        />
      </Group>
      <TextInput
        label="Relation name"
        description="Defines the name of the relationship. In an m-n-relation, it also determines the name of the underlying relation table."
        name={relationName}
        onChange={handleRelationNameInput}
        disabled={!target}
      />

      <Stack>
        <Group grow>
          <ReferentialActionSelect
            label="On update"
            value={onUpdate}
            onChange={handleReferentialActionSelect('onUpdate')}
            disabled={disableNonNMActions}
          />
          <ReferentialActionSelect
            label="On delete"
            value={onDelete}
            onChange={handleReferentialActionSelect('onDelete')}
            disabled={disableNonNMActions}
          />
        </Group>
        <Switch
          label="Optional"
          checked={isOptional}
          onChange={handleOptionalRelationSwitch}
          disabled={disableNonNMActions}
        />
      </Stack>
    </Stack>
  )
}
