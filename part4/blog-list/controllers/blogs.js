const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async(request, response) => {
  const body = request.body;
 
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end()
    return
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
 
  const savedBlog = await blog.save()
  response.json(savedBlog)
});

module.exports = blogsRouter;