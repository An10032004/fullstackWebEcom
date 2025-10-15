const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    phone: {
      type: String,
      required: true,
           unique:true

    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      
    },
     avatar: { type: String, default: '' },
   isAdmin: {
    type: Boolean,
    default: false, // mặc định user thường
  },
  })

  userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});



module.exports = mongoose.model("User", userSchema);
