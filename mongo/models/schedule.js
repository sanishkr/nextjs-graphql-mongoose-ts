import { models, model, Schema } from "mongoose";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const dayType = new Schema(
  {
    name: {
      type: String,
      enum: days,
    },
    start: String,
    end: String,
  },
  { _id: false }
);

const timeIntervalType = new Schema(
  {
    startts: Date,
    endts: Date,
  },
  { _id: false }
);

const overrideType = new Schema(
  {
    date: String,
    timeIntervals: [timeIntervalType],
  },
  { _id: false }
);

const scheduleSchema = new Schema({
  name: String,
  timezone: String,
  days: [dayType],
  overrides: [overrideType],
  eventTypeIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "eventTypes",
    },
  ],
});

const Schedule = models?.schedules || model("schedules", scheduleSchema);

export default Schedule;
