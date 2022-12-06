import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  uri: String,
  defaultTimezone: String,
  eventTypeIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "eventTypes",
    },
  ],
});

const User = models?.users || model("users", UserSchema);

export default User;
