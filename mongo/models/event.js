import { models, model, Schema } from "mongoose";

const EventSchema = new Schema({
  // organiser: {
  //   name: String,
  //   email: String,
  // },
  guest: {
    name: String,
    email: String,
  },
  cc: [String],
  duration: String,
  description: String,
  timestamp: Date,
  eventTypeId: {
    type: Schema.Types.ObjectId,
    ref: "eventTypes",
    required: true,
  },
  eventMeta: {
    integration: {
      type: Schema.Types.ObjectId,
      ref: "integration",
    },
    meetingId: String,
    meetingLink: String,
    calendarLink: String,
  },
});

const Event = models?.events || model("events", EventSchema);

export default Event;
