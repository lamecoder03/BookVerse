const Book = require('../Model/book');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req,res)=>{
    const books = await Book.find({});
    res.render('./books/index',{books})
} 

module.exports.newForm =(req,res)=>{ //note that the order of get requests in the code matters
    res.render('books/new');     // if this was below id get request, then the server treats 'new' as an id
} 

module.exports.searchBooks = async (req, res) => {
  const { query } = req.query; 
  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { writer: { $regex: query, $options: 'i' } },
      { genre: { $regex: query, $options: 'i' } }
    ]
  });

  res.render('books/searchResults', { books, searchQuery: query });
};

module.exports.addBook = async (req,res,next)=>{ 
    // if(!req.body.campground) throw new ExpressError(400,'Invalid CampGround Data')
    
    const book = new Book(req.body.book);
    book.author = req.user._id;
    book.images = req.files.map(f=>({url: f.path, filename:f.filename}));
    console.log(book);
    await book.save();
    req.flash('success','Successfully Created a new Book');
    res.redirect(`/books/${book._id}`)
   
} 

module.exports.showBook = async (req,res)=>{
    const book = await Book.findById(req.params.id).populate({path:'reviews' , populate:{ path: 'author' }}).populate('author');
    if(!book){
        req.flash('error','Cannot Find that Book');
        return res.redirect(`/books`)
    }
    res.render('books/show',{book});
}

module.exports.renderEditForm = async (req,res)=>{
 
    const book = await Book.findById(req.params.id);
    if(!book){
        req.flash('error','Cannot Find that Book');
        return res.redirect(`/books`)
    }
    res.render('./books/edit',{book});
} 

module.exports.updateBook = async (req,res)=>{
    const {id} = req.params;
    const book =await Book.findByIdAndUpdate(id,{...req.body.book});
    
    const images = req.files.map(f=>({url: f.path, filename:f.filename}));
    book.images.push(...images);
    await book.save();

    if(req.body.deleteImages){

        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }

        await book.updateOne({$pull: {images: { filename:{$in: req.body.deleteImages} } } } );
        console.log(book);
    }

    req.flash('success','Successfully Updated Book');
    res.redirect(`/books/${book._id}`)
}

module.exports.deleteBook = async(req,res)=>{
    const {id}=req.params;
    await Book.findByIdAndDelete(id);
    req.flash('success','Successfully Deleted Your Book');
    res.redirect(`/books`)
}