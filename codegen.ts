
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "graphql/schema.graphql",
  generates: {
    "graphql/types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"]
    }
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"]
  }
};

export default config;
