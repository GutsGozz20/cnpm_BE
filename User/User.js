const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//đoạn 1 nè
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
// tạo như vầy nè

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

// đoạn 2 nè
const User = mongoose.model('User', userSchema);

module.exports = User;
