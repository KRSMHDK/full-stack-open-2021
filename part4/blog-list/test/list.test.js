const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require('../test/test_helper')
const app = require("../app");
const Blog = require('../models/blog')
const api = supertest(app);
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});


test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'TDD harms architecture'
  )
})

test('property named id is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body.map(r => r.id)
  expect(id).toBeDefined()
})

test('sucessfuly creates a new blog post', async () => {
  blogTest =  {
    title: 'leo',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 33
  }

  await api
  .post('/api/blogs')
  .send(blogTest)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('leo')
})

test('if the likes property is missing, it will default to the value 0', async () =>{
  blogTest = {
    title: 'test',
    author: 'test2',
    url: 'https://aaaa.com/'
  }

  await api
  .post('/api/blogs')
  .send(blogTest)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd[blogsAtEnd.length - 1].likes
  
  expect(likes).toBe(0)
})

test('if the title and url missing expect 400', async () =>{
  blogTest = {
    author: 'test2',
    likes: '1'
  }

  await api
  .post('/api/blogs')
  .send(blogTest)
  .expect(400)
 
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () =>{
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'leo',
      name: 'mati leo',
      password: 'legolas',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close();
});
