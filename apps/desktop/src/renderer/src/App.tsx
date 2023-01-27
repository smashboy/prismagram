import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { combine } from 'effector'
import { IconBorderAll, IconBriefcase, IconSearch } from '@tabler/icons'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { Group, Paper, Stack } from '@mantine/core'
import { $schemaModels, Editor, EditorToolbar, selectModelEvent, Sidebar } from './modules/editor'
import {
  $projects,
  $selectedProjectId,
  CreateProjectModal,
  ProjectSelectorModal,
  selectProjectEvent
} from './modules/projects'
import { loadGlobalSettingsEffect, SettingsModal } from './modules/settings'
import { $isOpenDetailsView, toggleModelNodeSidebarEvent } from './stores/ui/modals'
import { RightSidebar } from './modules/editor/components/RightSidebar'
import {
  editorShortcuts,
  generalShortcuts,
  shortcut2SpotlightAction,
  useGeneralShortcuts
} from './modules/spotlight'
import 'reactflow/dist/style.css'
import './transports'
import 'prisma-state/PrismaSchemaState'
import { string2Color } from './core/utils'

const $store = combine({
  isOpenDetailsView: $isOpenDetailsView,
  projects: $projects,
  schemaModels: $schemaModels,
  selectedProjectId: $selectedProjectId
})

function App() {
  const {
    isOpenDetailsView: { isOpen, isOpenDebounced },
    projects,
    schemaModels,
    selectedProjectId
  } = useStore($store)

  useGeneralShortcuts()

  const isRighSidebarOpen = isOpen ? isOpenDebounced : isOpen

  useEffect(() => {
    loadGlobalSettingsEffect()
  }, [])

  const generalSpotlightAction = generalShortcuts
    .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
    .map((shortcut) => shortcut2SpotlightAction(shortcut, 'General'))

  const modelActions: SpotlightAction[] = [...schemaModels.values()].map(({ name }) => ({
    title: name,
    group: 'Models',
    icon: <IconBorderAll size={18} color={string2Color(name)} />,
    onTrigger: () => {
      toggleModelNodeSidebarEvent(true)
      selectModelEvent(name)
    }
  }))

  const editorActions = selectedProjectId
    ? editorShortcuts.map((shortcut) => shortcut2SpotlightAction(shortcut, 'Editor'))
    : []

  const projectActions: SpotlightAction[] = [...projects.values()].map(({ name, id }) => ({
    title: name,
    group: 'Projects',
    icon: <IconBriefcase size={18} color={string2Color(name)} />,
    onTrigger: () => selectProjectEvent(id)
  }))

  const sportlightActions = [
    ...generalSpotlightAction,
    ...editorActions,
    ...modelActions,
    ...projectActions
  ]

  return (
    <SpotlightProvider
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      actions={sportlightActions}
      centered
      // limit={1000000}
    >
      <Group w="100%" h="100%" p="xs" noWrap>
        <Sidebar />
        <Stack w="100%" h="100%" sx={{ flex: 1 }}>
          <EditorToolbar />
          <Paper
            w={isRighSidebarOpen ? 'calc(100vw - 690px)' : 'calc(100vw - 330px)'}
            // w="100%"
            h="100%"
            shadow="md"
            sx={{ transition: 'width 400ms ease', overflow: 'hidden' }}
          >
            <Editor />
          </Paper>
        </Stack>
        <RightSidebar />
        <SettingsModal />
        <CreateProjectModal />
        <ProjectSelectorModal />
      </Group>
    </SpotlightProvider>
  )
}

export default App
