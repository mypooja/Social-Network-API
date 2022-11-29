const { Schema, Types,model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
      trim:true,
      
    },
    email: {
      type: string,
      required: true,
      unique:true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts:[ 
    {
      type: Schema.Types.OpjectId,
      ref:"Thought",
    },
],
    friends:[
     {
        type: Schema.Types.OpjectId,
        ref: User,
      },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  // create the User model using the UserSchema
  const User = model('User', userSchema);
  // export the User model
  module.exports = User;
