import { useHotkeys } from '@mantine/hooks'
import { RelationType } from '@shared/common/configs/diagrams'
import { setSelectedRelationTypeEvent } from '../stores'

export const useEditorHotkeys = () => {
  useHotkeys([
    ['ctrl+O', () => setSelectedRelationTypeEvent(RelationType.ONE_TO_ONE)],
    ['ctrl+M', () => setSelectedRelationTypeEvent(RelationType.MANY_TO_MANY)],
    ['ctrl+N', () => setSelectedRelationTypeEvent(RelationType.ONE_TO_MANY)]
  ])
}
