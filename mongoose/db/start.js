const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || require('../../config/keys').MONGO_URI

const mongoStart = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }, () => console.log(`Connected to MongoDB...`))
  } catch (error) {
    process.disconnect(() => (`Unable to connect. Errors: ${error}`))
  }
}

module.exports = mongoStart