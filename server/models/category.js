const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // URL hoặc đường dẫn hình ảnh
    required: true
  }],
  color: {
    type: String, // Mã màu hex, ví dụ: #FF5733
    required: true
  }
}
);
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});


exports.Category = mongoose.model('Category', categorySchema);

exports.categorySchema = this.categorySchema;