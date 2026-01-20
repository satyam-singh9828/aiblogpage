import express from "express" ;
import  {getBlogs , postBlog , deleteBlog  , likedBlog , commentonBlog, newConversation , blogdetail , DislikedBlog } from "../controller/blogcontroller.js" ;
import { authenticate , postproduct } from "../controller/postlogin.js";
import { upload } from "../middleware/upload.js";
const blogrouter = express.Router() ;
blogrouter.get( "/blogs" , getBlogs ) ;
blogrouter.post( "/blogs" , authenticate  , upload.single("image")  , postBlog ) ;
blogrouter.delete("/blogs/:id"  ,  deleteBlog ) ;
blogrouter.put( "/blogs/like/:id"  , likedBlog ) ;
blogrouter.post( "/blogs/comment/:id" , commentonBlog ) ;
blogrouter.post("/login" ,  authenticate , postproduct) ; 
blogrouter.post("/blogs/generate"  ,newConversation ) ;
blogrouter.get("/blogs/:id" , blogdetail ) ;
blogrouter.put( "/blogs/dislike/:id"  , DislikedBlog ) ;

export default blogrouter ;
