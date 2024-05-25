const { score } = require('@mui/icons-material');
const mongoose = require('mongoose');
const pointSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    score: {
        type: Number,
        require: true,
    },
    questionId: {
        type: String, // Hoặc ObjectId nếu bạn có một mô hình cho câu hỏi
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Point = mongoose.model("Point", pointSchema)

module.exports = Point