const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default:''
  },
  price: {
    type: Number,
    default:0
  },
  oldPrice:{
    type:Number,
    default:0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Tham chiếu tới _id trong collection Category
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: String,
  required: true
  },
  countInStock: {
    type: Number,
    required: true,
   
  },
  images: [{
    type: String, // URL hoặc đường dẫn hình ảnh
    required: true
  }],
  rating: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  discount : {
    type:Number,
    default:0,
  },
  productRAMS:[{
    type:String
  }],
  productSIZE:[{
    type:String
  }],
  productWeight:[{
    type:String
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);
