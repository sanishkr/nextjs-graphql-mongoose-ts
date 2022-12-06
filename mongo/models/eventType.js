import { models, model, Schema } from "mongoose";

const eventCategory = ["OneToOne", "Group", "Collective", "RoundRobin"];

const EventTypeSchema = new Schema({
  name: String,
  location: String,
  uri: String,
  description: String,
  color: String,
  duration: String,
  defaultTimezone: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: eventCategory,
    default: eventCategory[0],
  },
});

const EventType = models?.eventTypes || model("eventTypes", EventTypeSchema);

export default EventType;
