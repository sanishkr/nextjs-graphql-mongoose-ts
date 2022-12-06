import { models, model, Schema } from "mongoose";

const IntegrationName = [
  "GoogleMeet",
  "GoogleCalendar",
  "Zoom",
  "MSTeams",
  "MSOutlook",
];

const IntegrationCategory = ["Meeting", "Calendar"];

const integrationSchema = new Schema({
  name: {
    type: String,
    enum: IntegrationName,
    required: true,
  },
  category: {
    type: String,
    enum: IntegrationCategory,
    required: true,
  },
  token: String,
  expiresAt: Date,
  meta: Schema.Types.Mixed,
});

const Integration =
  models?.integrations || model("integrations", integrationSchema);

export default Integration;
