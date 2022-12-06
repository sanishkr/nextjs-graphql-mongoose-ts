import { composeMongoose } from "graphql-compose-mongoose";
import { SchemaComposer } from "graphql-compose";
import Todo from "./todo";
import EventType from "./eventType";
import User from "./user";
import Schedule from "./schedule";
import Integration from "./integration";
import Event from "./event";

const schemaComposer = new SchemaComposer();

const customizationOptions = {
  schemaComposer,
};

const TodoTC = composeMongoose(Todo, customizationOptions);
const EventTypeTC = composeMongoose(EventType, customizationOptions);
const UserTC = composeMongoose(User, customizationOptions);
const ScheduleTC = composeMongoose(Schedule, customizationOptions);
const IntegrationTC = composeMongoose(Integration, customizationOptions);
const EventTC = composeMongoose(Event, customizationOptions);

UserTC.addRelation("eventTypes", {
  resolver: () => EventTypeTC.mongooseResolvers.findByIds(),
  prepareArgs: {
    _ids: (source) => source.eventTypeIds || [],
  },
  projection: {
    eventTypeIds: 1,
  },
});
ScheduleTC.addRelation("eventTypes", {
  resolver: () => EventTypeTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.eventTypeIds || [],
  },
  projection: {
    eventTypeIds: 1,
  },
});
// EventTypeTC.addRelation("organiser", {
//   resolver: () => UserTC.mongooseResolvers.findById),
//   prepareArgs: {
//     _id: (source) => source.eventTypeId,
//   },
//   projection: {
//     eventType: 1,
//   },
// });
EventTC.addRelation("eventType", {
  resolver: () => EventTypeTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.eventTypeId,
  },
  projection: {
    eventType: 1,
  },
});
EventTC.addRelation("integration", {
  resolver: () => IntegrationTC.mongooseResolvers.dataLoader(),
  prepareArgs: {
    _id: (source) => source.integration,
  },
  projection: {
    eventMeta: {
      integration: 1,
    },
  },
});

schemaComposer.Query.addFields({
  todoById: TodoTC.mongooseResolvers.findById(),
  todoOne: TodoTC.mongooseResolvers.findOne(),
  todoMany: TodoTC.mongooseResolvers.findMany({ lean: true }),
});
schemaComposer.Query.addFields({
  eventTypeById: EventTypeTC.mongooseResolvers.findById(),
  eventTypeByIds: EventTypeTC.mongooseResolvers.findByIds({ lean: true }),
  eventTypeOne: EventTypeTC.mongooseResolvers.findOne(),
  eventTypeMany: EventTypeTC.mongooseResolvers.findMany({ lean: true }),
});
schemaComposer.Query.addFields({
  userById: UserTC.mongooseResolvers.findById(),
  userOne: UserTC.mongooseResolvers.findOne(),
});
schemaComposer.Query.addFields({
  scheduleById: ScheduleTC.mongooseResolvers.findById(),
  scheduleOne: ScheduleTC.mongooseResolvers.findOne(),
  scheduleMany: ScheduleTC.mongooseResolvers.findMany({ lean: true }),
});
schemaComposer.Query.addFields({
  integrationById: IntegrationTC.mongooseResolvers.findById(),
  integrationOne: IntegrationTC.mongooseResolvers.findOne(),
  integrationMany: IntegrationTC.mongooseResolvers.findMany({ lean: true }),
});
schemaComposer.Query.addFields({
  eventById: EventTC.mongooseResolvers.findById(),
  eventByIds: EventTC.mongooseResolvers.findByIds({ lean: true }),
  eventOne: EventTC.mongooseResolvers.findOne(),
  eventMany: EventTC.mongooseResolvers.findMany({ lean: true }),
});

schemaComposer.Mutation.addFields({
  todoCreateOne: TodoTC.mongooseResolvers.createOne(),
  todoUpdateById: TodoTC.mongooseResolvers.updateById(),
  todoRemoveById: TodoTC.mongooseResolvers.removeById(),
});
schemaComposer.Mutation.addFields({
  eventTypeCreateOne: EventTypeTC.mongooseResolvers.createOne(),
  eventTypeUpdateById: EventTypeTC.mongooseResolvers.updateById(),
  eventTypeRemoveById: EventTypeTC.mongooseResolvers.removeById(),
});
schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
});
schemaComposer.Mutation.addFields({
  scheduleCreateOne: ScheduleTC.mongooseResolvers.createOne(),
  scheduleUpdateById: ScheduleTC.mongooseResolvers.updateById(),
  scheduleRemoveById: ScheduleTC.mongooseResolvers.removeById(),
});
schemaComposer.Mutation.addFields({
  integrationCreateOne: IntegrationTC.mongooseResolvers.createOne(),
  integrationUpdateById: IntegrationTC.mongooseResolvers.updateById(),
  integrationRemoveById: IntegrationTC.mongooseResolvers.removeById(),
});
schemaComposer.Mutation.addFields({
  eventCreateOne: EventTC.mongooseResolvers.createOne(),
  eventCreateMany: EventTC.mongooseResolvers.createMany(),
  eventUpdateById: EventTC.mongooseResolvers.updateById(),
  eventRemoveById: EventTC.mongooseResolvers.removeById(),
});

const schema = schemaComposer.buildSchema();
export { schema };
