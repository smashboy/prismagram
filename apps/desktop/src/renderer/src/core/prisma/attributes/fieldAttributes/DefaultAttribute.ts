import {
  AttributeFunction,
  attributeFunctionsList,
  AttributeFunctionType
} from '../AttributeFunction'
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

  _parse(str: string) {
    const attributeFunc = attributeFunctionsList.find((func) => str.indexOf(func) > -1)

    if (attributeFunc) {
      this.value = new AttributeFunction(
        attributeFunc.replace('(', '').replace(')', '') as AttributeFunctionType
      )
    }
  }
}
