import { ScalarField } from '../../fields/types'
import {
  AttributeFunction,
  attributeFunctionsList,
  AttributeFunctionType
} from '../AttributeFunction'
import { FieldAttribute } from '../FieldAttribute'

export class DefaultAttribute extends FieldAttribute<string, ScalarField> {
  constructor(field: ScalarField) {
    super('default', field)
  }

  _parseArgs(args: string) {
    if (attributeFunctionsList.includes(args as `${AttributeFunctionType}()`)) {
      const type = args.replace('(', '').replace(')', '') as AttributeFunctionType
      const attrFunc = new AttributeFunction(type)
      return this.setArgument(type, attrFunc)
    }
  }
}
