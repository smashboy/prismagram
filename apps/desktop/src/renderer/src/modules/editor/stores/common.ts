import { $diagram } from './diagram'

export const $modelsIds = $diagram.map((diagram) => (diagram ? Object.keys(diagram.nodes) : []))
