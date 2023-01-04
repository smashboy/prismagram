import { AttributeFunction } from '../AttributeFunction'
import { FieldAttribute } from '../FieldAttribute'

type DefaultAttributePossibleValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | AttributeFunction

export class DefaultAttribute extends FieldAttribute {
  value!: DefaultAttributePossibleValue

  constructor(value: DefaultAttributePossibleValue) {
    super('default')

    this.setValue(value)
  }

  setValue(value: DefaultAttributePossibleValue) {
    this.value = value
  }
}
