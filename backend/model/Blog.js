import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  image: {
    type: String,   // image ka path store hoga
    default: null,
  },

  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type : Number , 
    default : 0 ,

  },
  

  comments: [
    {
      username: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
  }
});

export default mongoose.model("Blog", blogSchema);
