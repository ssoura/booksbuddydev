const mongoose = require("mongoose");
const { Schema } = mongoose;

const WishListSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The user id is required"],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList };
