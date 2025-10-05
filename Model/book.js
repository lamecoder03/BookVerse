const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String
});

imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload' , '/upload/w_200');
})

const bookSchema = new Schema({
  title: String,
  images: [imageSchema],
  year: Number,
  description: String,
  genre: String,
  writer: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

bookSchema.post('findOneAndDelete', async function (doc) {
  if(doc && doc.reviews && doc.reviews.length){
    await Review.deleteMany({
      _id: {
        $in: doc.reviews 
      }
    })
  }
})

module.exports = mongoose.model('Book', bookSchema);
