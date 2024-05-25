const mongoose = require('mongoose');
const User = require('./path/to/User'); // Đường dẫn đến file chứa mô hình User
const Point = require('./path/to/Point'); // Đường dẫn đến file chứa mô hình Point

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Hàm để lấy điểm của người dùng theo username
const getUserPoints = async (username) => {
    try {
        // Tìm người dùng theo username
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User not found");
            return;
        }

        // Tìm tất cả các điểm của người dùng bằng userId
        const points = await Point.find({ userId: user._id });

        console.log(`Points for user ${username}:`, points);
    } catch (err) {
        console.error("Error:", err);
    }
};

// Gọi hàm với username cụ thể
// getUserPoints('user123');
