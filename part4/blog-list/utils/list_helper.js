const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs[0].likes;
};

const favoriteblog = (blogs) => {
  const topBlog = blogs.reduce((a, c) => (c.likes > a.likes ? c : a));
  const { _id, url, __v, ...topBlog2 } = topBlog;
  return topBlog2;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteblog,
};
