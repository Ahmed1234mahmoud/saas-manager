const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // إضافة حقل الاسم
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // اختياري: إضافة تاريخ إنشاء الحساب
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);