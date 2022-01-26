import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws";

export interface StackConfig {
  readonly region: string;
}

export class Stack extends TerraformStack {
  constructor(scope: Construct, id: string, config: StackConfig) {
    super(scope, id);

    new AwsProvider(this, "aws", {
      region: config.region,
    });
  }
}
