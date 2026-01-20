import Blog from "../model/Blog.js"
import {genrativeContent} from "../services/geminiservices.js";
export const getBlogs =  async ( req , res , next ) => {
    try {
        const blogs = await Blog.find() ;
        res.status(200).json(blogs) ;


    }
    catch(err){
        res.status(500).json({message : err.message})
    }

}
export const postBlog = async ( req , res , next ) => {
    
  console.log("REQ BODY = ", req.body);
    console.log("FILE:", req.file);  
      const {title, content , author} = req.body ;
      if(!content){
         content : {"please write something"} ;
      }
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const user = req.user.id 

    try {
        const blog = new Blog( { title , content , author , image  , user }) ;
        await blog.save() ;
        res.status(201).json({status : "success" , blog }) ;

         


    }
    catch(err){
        res.status(500).json({message : err.message}) ;
    }
}
export const deleteBlog = async (req , res , next ) => {

    const BlogId = req.params.id ;
    try {
        await Blog.findByIdAndDelete(BlogId) ;
        res.status(200).json({ status : "success" , BlogId}) ;
    }catch(err){
        res.status(500).json({message : err.message}) ;
    }
}
export const likedBlog = async(req , res , next  ) => {
      const Blogid = req.params.id ;
       try {
           const blog = await Blog.findById(Blogid);
          blog.likes+=1 ;
          await blog.save() ;
          res.status(200).json({status : "success" , blog});



       }catch(err){
           res.status(500).json({message : err.message});

       }
}
export const commentonBlog = async (req , res , next ) => {
    const Blogid = req.params.id ;
    const { username , content } = req.body ;
    try {
        const blog = await Blog.findById(Blogid) ;
        blog.comments.push({ username , content });
        await blog.save() ;
        res.status(200).json({ status : "success" , comment : {
            username , content , Blogid
        } }) ;

    }catch(err){
        res.status(500).json({message : err.message }) ;

    }

}
export const newConversation = async(req , res , next ) => {
    const {prompt} = req.body ;
     if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }
    console.log("HIT /blogs/generate");
  console.log("BODY:", req.body);
  res.json({ content: "test success" });

    const content = await genrativeContent(prompt);
    res.json({content});


}
export const blogdetail = async(req , res )=> {
    const blog = await Blog.findById(req.params.id);
    res.json(blog) ;

}
export const DislikedBlog = async(req , res , next  ) => {
      const Blogid = req.params.id ;
       try {
           const blog = await Blog.findById(Blogid);
           
          blog.dislikes+=1 ;
        
          await blog.save() ;
          res.status(200).json({status : "success" , blog});



       }catch(err){
           res.status(500).json({message : err.message});

       }
}
