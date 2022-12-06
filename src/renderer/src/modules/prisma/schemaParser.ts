import { testSchema } from "./testschema";

const getPrismaModelName = (line: string): string => line.split(" ")[1];

const getPrismaModelFieldType = (str: string): PrismaFieldType => ({
  hasArrayModifier: str.endsWith("[]"),
  hasOptionalModifier: str.endsWith("?"),
  type: str.replace("[]", "").replace("?", ""),
});

const getPrismaModelFieldData = (line: string): [string, PrismaField] => {
  const cols = line.split(" ").filter(Boolean);
  const fieldName = cols[0];

  return [
    fieldName,
    {
      name: fieldName,
      type: getPrismaModelFieldType(cols[1]),
    },
  ];
};

export const schemaParser = (src: string): PrismaSchema => {
  const lines = src.trim().split("\n").filter(Boolean);

  const schema: PrismaSchema = {
    models: {},
    relations: {},
  };

  let currentWorkingModel: Partial<PrismaModel> | null = null;

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("model")) {
      currentWorkingModel = { name: getPrismaModelName(line) };
    } else if (!line.startsWith("}") && currentWorkingModel) {
      const [key, field] = getPrismaModelFieldData(line);

      const {
        type: { hasArrayModifier, type },
      } = field;
      const { name } = currentWorkingModel;

      currentWorkingModel.fields = { ...currentWorkingModel.fields };

      if (hasArrayModifier) {
        schema.relations[`${name}-${type}`] = { from: name!, to: type };
      }

      currentWorkingModel.fields[key] = field;
    } else if (line.startsWith("}") && currentWorkingModel) {
      schema.models[currentWorkingModel.name!] =
        currentWorkingModel as PrismaModel;
      currentWorkingModel = null;
    } else if (currentWorkingModel) {
      currentWorkingModel = null;
    }
  }

  return schema;
};

export interface PrismaSchema {
  models: Record<string, PrismaModel>;
  relations: Record<string, PrismaRelation>;
}

export interface PrismaModel {
  name: string;
  fields: Record<string, PrismaField>;
  relations: Record<string, PrismaRelation>;
}

export interface PrismaField {
  name: string;
  type: PrismaFieldType;
}

export interface PrismaRelation {
  from: string;
  to: string;
}

export interface PrismaFieldType {
  type: ScalarType | string;
  hasArrayModifier?: boolean;
  hasOptionalModifier?: boolean;
}

export enum ScalarType {
  STRING = "String",
  BOOLEAN = "Boolean",
  INT = "Int",
  BIG_INT = "BigInt",
  FLOAT = "Float",
  DECIMAL = "Decimal",
  DATE_TIME = "DateTime",
  JSON = "Json",
  BYTES = "Bytes",
}

enum RelationType {
  ONE_TO_ONE,
  MANY_TO_MANY,
}
