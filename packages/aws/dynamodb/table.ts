import { Construct } from "constructs";
import { dynamodb } from "@cdktf/provider-aws";
import { BillingMode } from "./billing-mode";
import { AttributeType } from "./attribute-type";

export interface TableConfig {
  /**
   * The name of the table, this needs to be unique within a region.
   */
  readonly name: string;
  /**
   * Controls how you are charged for read and write throughput and how you manage capacity.
   *
   * @default BillingMode.PAY_PER_REQUEST
   */
  readonly billingMode?: BillingMode;
  /**
   * The attribute to use as the hash (partition) key.
   *
   * @default hash_key
   */
  readonly hashKey?: string;
  /**
   * The attribute to use as the range (sort) key.
   *
   * @default range_key
   */
  readonly rangeKey?: string;
  /**
   * The number of read units for this table. If billingMode is set to BillingMode.PROVISIONED, this field is required.
   */
  readonly readCapacity?: number;
  /**
   * The number of write units for this table. If billingMode is set to BillingMode.PROVISIONED, this field is required.
   */
  readonly writeCapacity?: number;
}

/**
 * Table is a wrapper for dynamodb.DynamodbTable to assist with creating DynamoDB tables
 * that adhere to single table design patterns.
 */
export class Table extends Construct {
  public readonly table: dynamodb.DynamodbTable;

  constructor(scope: Construct, name: string, config: TableConfig) {
    super(scope, name);

    this.table = new dynamodb.DynamodbTable(scope, `${name}-resource`, {
      billingMode: config.billingMode ?? BillingMode.PAY_PER_REQUEST,
      hashKey: config.hashKey ?? "hash_key",
      name: config.name,
      rangeKey: config.rangeKey ?? "range_key",
      readCapacity: config.readCapacity,
      writeCapacity: config.writeCapacity,
      attribute: [
        {
          name: config.hashKey ?? "hash_key",
          type: AttributeType.STRING,
        },
        {
          name: config.rangeKey ?? "range_key",
          type: AttributeType.STRING,
        },
      ],
      serverSideEncryption: {
        enabled: true,
      },
    });
  }
}
