import { Background } from 'reactflow'

import '../css/editor.css'
import { NodesToolbar } from './NodesToolbar'
import { EditorToolbar } from './EditorToolbar'

import { CreateRelationModal } from './CreateRelationModal'
import { CreateEnumFieldModal } from './CreateEnumFieldModal'
import { SchemaSidebarEditor } from './SchemaSidebarEditor'
import { DiagramEditorProvider } from './DiagramEditorProvider'

export const DiagramEditor = () => {
  return (
    <>
      <DiagramEditorProvider>
        <Background />
        <EditorToolbar />
        <NodesToolbar />
        <SchemaSidebarEditor />
      </DiagramEditorProvider>
      <CreateEnumFieldModal />
      <CreateRelationModal />
    </>
  )
}
