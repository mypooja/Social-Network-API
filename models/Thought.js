const { Schema, Types,model } = require('mongoose');
const moment = require('moment')
//reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
           },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
          
        },
        
        createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       
        },
        username: {
          type: String,
          required:true,
        },
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false,
        }
    )

//thought schema
const thoughtSchema = new Schema(
  {
    
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
        
      },
      
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),

      },
      username: {
        type: String,
        required:true,
      },
      reactions: [reactionSchema],
      
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//get total count of friends
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  // create the Thought model using the thoughtSchema
  const Thought = model('Thought', thoughtSchema);
  // export the Thought model
  module.exports = Thought;

