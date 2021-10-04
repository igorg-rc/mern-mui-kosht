const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || require('./config/keys').PORT
const mongoStart = require('./mongoose/db/start')
const path = require('path')
const app = express()

mongoStart()

app.use(cors({
  origin: [
    "http://localhost:3001", 
    "http://localhost:3000"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/posts', require('./mongoose/routes/postsRoutes'))
app.use('/api/tags', require('./mongoose/routes/tagsRoutes'))
app.use('/api/categories', require('./mongoose/routes/categoriesRoutes'))
app.use('/api/lists', require('./mongoose/routes/listsRoutes'))
app.use('/api/actions', require('./mongoose/routes/actionsRoutes'))
app.use('/api/users', require('./mongoose/routes/usersRoutes'))
app.use('/api/contacts', require('./mongoose/routes/contactsRoutes'))

app.use('/downloads/images/posts', express.static(path.join(__dirname, 'downloads', 'images', 'posts')))


app.use(express.static(path.join(__dirname, "site", "build")))
app.use(express.static(path.join(__dirname, "admin", "build")))

app.get("/",      (req, res) => res.sendFile(path.join(__dirname, "site", "build", "index.html")))
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin", "build", "index.html")))

app.listen(PORT, () => console.log(`Application is running on port ${PORT}...`))