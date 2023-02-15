import {
  defaultAttribute,
  idAttribute,
  idBlockAttribute,
  ignoreAttribute,
  ignoreBlockAttribute,
  indexBlockAttribute,
  mapAttribute,
  mapBlockAttribute,
  relationAttribute,
  uniqueAttribute,
  uniqueBlockAttribute,
  updatedAtAttribute
} from '../attributes'

export const EOL = '\r\n'

export const datasourceEnvFields = ['url', 'shadowDatabaseUrl']
export const generatorEnvFields = ['provider', 'output']

export const fieldAttributeMap = {
  id: idAttribute,
  default: defaultAttribute,
  updatedAt: updatedAtAttribute,
  ignore: ignoreAttribute,
  relation: relationAttribute,
  unique: uniqueAttribute,
  map: mapAttribute
}

export const blockAttributesMap = {
  id: idBlockAttribute,
  ignore: ignoreBlockAttribute,
  unique: uniqueBlockAttribute,
  map: mapBlockAttribute,
  index: indexBlockAttribute
}
