require('dotenv').config(); // تحميل المتغيرات من ملف .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Task = require('./models/Task'); 

const app = express();

// --- 1. تحسين الـ CORS ليقبل الطلبات من أي مكان حالياً (وبعد الرفع نحدده) ---
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] // أضفنا Authorization احتياطاً للمستقبل
})); 

app.use(express.json());

// --- 2. استخدام المتغيرات من ملف .env بدل الروابط المباشرة ---
const mongoURI = process.env.MONGODB_URI; 
const JWT_SECRET = process.env.JWT_SECRET;

// --- 3. تسجيل مستخدم جديد ---
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body; 
    try {
        const userExists = await User.findOne({ email: email.trim().toLowerCase() });
        if (userExists) return res.status(400).json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });

        const newUser = new User({ name, email: email.trim().toLowerCase(), password });
        await newUser.save();
        res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التسجيل" });
    }
});

// --- 4. تسجيل الدخول ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }
        res.status(200).json({ 
            message: "تم الدخول بنجاح", 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ message: "خطأ في السيرفر" });
    }
});

// --- 5. جلب المهام ---
app.get('/api/tasks/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "خطأ في جلب المهام" });
    }
});

// --- 6. إضافة مهمة جديدة ---
app.post('/api/tasks', async (req, res) => {
    const { userId, title, status, priority, deadline } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "عذراً، يجب إرسال معرف المستخدم (userId)" });
    }

    try {
        const newTask = new Task({
            user: userId,
            title: title || "Untitled Task",
            status: status || 'todo', 
            priority: priority || 'medium',
            deadline: deadline || new Date().toISOString().split('T')[0]
        });

        const savedTask = await newTask.save();
        console.log("✅ Task saved successfully:", savedTask.title);
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("❌ MongoDB Save Error:", error.message);
        res.status(500).json({ message: "فشل حفظ المهمة في الداتابيز", error: error.message });
    }
});

// --- 7. تحديث حالة المهمة (Drag and Drop) ---
app.patch('/api/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "خطأ في تحديث المهمة" });
    }
});

// --- 8. حذف مهمة ---
app.delete('/api/tasks/:taskId', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
        if (!deletedTask) return res.status(404).json({ message: "المهمة غير موجودة" });
        res.status(200).json({ message: "تم حذف المهمة بنجاح" });
    } catch (error) {
        res.status(500).json({ message: "خطأ أثناء حذف المهمة" });
    }
});

// --- اتصال الداتابيز باستخدام المتغير المحمي ---
mongoose.connect(mongoURI)
  .then(() => console.log('✅ SaaS Database Connected Successfully!'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// --- استخدام البورت من الـ env أو 5000 كافتراضي ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));