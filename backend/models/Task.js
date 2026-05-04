const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // غيرنا النوع هنا من ObjectId لـ String عشان يقبل أي ID مبعوث
    user: { type: String, required: true }, 
    title: { type: String, required: true },
    status: { type: String, default: 'todo' },
    priority: { type: String, default: 'medium' },
    deadline: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);