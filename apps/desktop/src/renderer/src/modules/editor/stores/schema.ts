import { createEvent, createStore } from 'effector'

export const setPrismaSchema = createEvent<string>()

export const $schema = createStore<string>('').on(setPrismaSchema, (_, schema) => schema)
