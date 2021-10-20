import { entities_schema_table, entities_schema } from './entities.schema';
import { tableIfc } from '../modules/DbModule';

export const sysTables: tableIfc[] = [
  {
    name: entities_schema_table,
    schema: entities_schema
  }
];
