import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import Cors from "micro-cors";
import "graphql-import-node";
import dbConnect from "../../mongo";
import { schema } from "../../mongo/models";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await dbConnect();
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
