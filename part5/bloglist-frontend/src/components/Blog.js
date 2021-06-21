import React, { useState } from "react";
const Blog = ({ blog, user, handleLikes, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const id = blog.id;

  const [expanded, setExpanded] = useState(false);
  const hideWhenExpanded = { display: expanded ? "none" : "" };
  const showWhenExpanded = { display: expanded ? "" : "none" };

  return (
    <div>
      <div style={(blogStyle, hideWhenExpanded)}>
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(!expanded)}>view</button>
      </div>
      <div style={(blogStyle, showWhenExpanded)}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setExpanded(!expanded)}>hide</button>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes added by {user.name} - {id}
        <button type="button" value={id} onClick={handleLikes}>
          like
        </button>
        <br />
      </div>
    </div>
  );
};

export default Blog;
