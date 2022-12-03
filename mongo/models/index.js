import { composeMongoose } from "graphql-compose-mongoose";
import { SchemaComposer } from "graphql-compose";
import Todo from "./todo";

const schemaComposer = new SchemaComposer();

const customizationOptions = {
  schemaComposer,
};

const TodoTC = composeMongoose(Todo, customizationOptions);

schemaComposer.Query.addFields({
  todoById: TodoTC.mongooseResolvers.findById(),
  todoOne: TodoTC.mongooseResolvers.findOne(),
  todoMany: TodoTC.mongooseResolvers.findMany(),
});

schemaComposer.Mutation.addFields({
  todoCreateOne: TodoTC.mongooseResolvers.createOne(),
  todoUpdateById: TodoTC.mongooseResolvers.updateById(),
  todoRemoveById: TodoTC.mongooseResolvers.removeById(),
});

const schema = schemaComposer.buildSchema();
export { schema };
