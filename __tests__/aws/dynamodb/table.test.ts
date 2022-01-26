import { Testing } from "cdktf";
import "cdktf/lib/testing/adapters/jest";
import * as aws from "@cdktf/provider-aws";
import * as dynamodb from "../../../packages/aws/dynamodb";
import { Stack, StackConfig } from "../../../packages/aws/stack";

describe("Test DynamoDB Table", () => {
  const tableConfig: dynamodb.TableConfig = {
    name: "test-table",
  };
  const stackConfig: StackConfig = {
    region: "ap-southeast-2",
  };

  it("should contain a dynamodb.DynamodbTable", () => {
    expect(
      Testing.synthScope((scope) => {
        new dynamodb.Table(scope, "table", tableConfig);
      })
    ).toHaveResource(aws.dynamodb.DynamodbTable);
  });

  it("should have encryption enabled", () => {
    expect(
      Testing.synthScope((scope) => {
        new dynamodb.Table(scope, "table", tableConfig);
      })
    ).toHaveResourceWithProperties(aws.dynamodb.DynamodbTable, {
      server_side_encryption: {
        enabled: true,
      },
    });
  });

  it("should output valid Terraform", () => {
    const app = Testing.app();
    const stack = new Stack(app, "stack", stackConfig);
    new dynamodb.Table(stack, "table", tableConfig);
    new dynamodb.Table(stack, "table1", tableConfig);

    expect(Testing.fullSynth(stack)).toBeValidTerraform();
  });

  it("should plan successfully", () => {
    const app = Testing.app();
    const stack = new Stack(app, "stack", stackConfig);
    new dynamodb.Table(stack, "table", tableConfig);

    expect(Testing.fullSynth(stack)).toPlanSuccessfully();
  });
});
