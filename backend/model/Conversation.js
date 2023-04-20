const { Schema, model } = require("mongoose");

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
      required:true
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Conversation", ConversationSchema);
