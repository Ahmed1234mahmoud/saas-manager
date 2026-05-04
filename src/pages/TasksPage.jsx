import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Clock, Search, Trash2, X, Bell, Sun, 
  LayoutDashboard, CheckCircle2, AlertTriangle, ListTodo, Inbox 
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '', priority: 'medium', status: 'todo', 
    deadline: new Date().toISOString().split('T')[0]
  });

  const savedUser = JSON.parse(localStorage.getItem('user'));
  const userId = savedUser?.id || savedUser?._id || "12345";

  // 1. جلب المهام
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
        setTasks(response.data);
      } catch (err) { 
        toast.error("Failed to load tasks"); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [userId]);

  // 2. معالجة السحب والإفلات
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

    const newTasks = Array.from(tasks);
    const draggedTask = newTasks.find(t => t._id === draggableId);
    draggedTask.status = destination.droppableId;
    setTasks(newTasks);

    try {
      await axios.patch(`http://localhost:5000/api/tasks/${draggableId}`, { status: destination.droppableId });
      toast.success(`Moved to ${destination.droppableId.replace('-', ' ')}`, { icon: '🚀' });
    } catch (err) { 
      toast.error("Update failed");
    }
  };

  // 3. إضافة مهمة جديدة
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) return toast.error("Title is required");

    const loadToast = toast.loading("Creating task...");
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { userId, ...newTaskData });
      setTasks([...tasks, response.data]);
      setIsModalOpen(false);
      toast.success("Task created!", { id: loadToast });
      setNewTaskData({ title: '', priority: 'medium', status: 'todo', deadline: new Date().toISOString().split('T')[0] });
    } catch (err) { 
      toast.error("Failed to create", { id: loadToast }); 
    }
  };

  // 4. حذف مهمة (بالشكل الجديد المدمج مع التنبيهات)
  const handleDeleteTask = async (taskId) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Delete this task?</span>
        <button 
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-white text-xs transition-colors" 
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
              setTasks(tasks.filter(task => task._id !== taskId));
              toast.success("Deleted successfully");
            } catch { toast.error("Delete failed"); }
          }}
        >
          Confirm
        </button>
      </div>
    ), { duration: 4000 });
  };

  const columns = [
    { name: 'To Do', key: 'todo' },
    { name: 'In Progress', key: 'in-progress' },
    { name: 'Review', key: 'review' },
    { name: 'Done', key: 'done' }
  ];

  // إحصائيات الـ Dashboard
  const chartData = columns.map(col => ({
    name: col.name,
    value: tasks.filter(t => t.status === col.key).length
  }));

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: <ListTodo size={18}/>, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'done').length, icon: <CheckCircle2 size={18}/>, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Urgent', value: tasks.filter(t => t.priority === 'high').length, icon: <AlertTriangle size={18}/>, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b]/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-900/20 font-medium"
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      {/* Statistics Section (الرسم البياني رجع هنا) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              key={i} className="bg-[#1e293b]/40 border border-gray-800 p-4 rounded-2xl flex items-center gap-4 backdrop-blur-sm"
            >
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#1e293b]/20 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <LayoutDashboard size={16}/>
            <h4 className="text-xs font-bold uppercase tracking-widest">Performance Overview</h4>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '12px', fontSize: '10px' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#3b82f6'} fillOpacity={0.8} />
                  ))}
                </Bar>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Board Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col) => (
            <div key={col.key} className="flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">{col.name}</h3>
                <span className="bg-gray-800/50 text-blue-400 px-2 py-0.5 rounded-md text-[10px] border border-gray-700 font-bold">{tasks.filter(t => t.status === col.key).length}</span>
              </div>

              <Droppable droppableId={col.key}>
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} ref={provided.innerRef} 
                    className={`p-3 rounded-2xl border transition-all min-h-[450px] flex flex-col ${snapshot.isDraggingOver ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#1e293b]/30 border-gray-800/50'}`}
                  >
                    <div className="flex-grow">
                      {tasks.filter(t => t.status === col.key && t.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 opacity-20 italic text-[10px]">
                          <Inbox size={24} className="mb-2" />
                          <p>No tasks here</p>
                        </div>
                      ) : (
                        tasks
                          .filter(t => t.status === col.key && t.title.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(provided) => (
                                <motion.div 
                                  layout
                                  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                  className="bg-[#1e293b] p-4 rounded-xl mb-3 border border-gray-700 group hover:border-blue-500/40 shadow-sm relative transition-all"
                                >
                                  <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium text-gray-200">{task.title}</p>
                                    <button onClick={() => handleDeleteTask(task._id)} className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                  <div className="flex items-center justify-between mt-5">
                                    <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                      task.priority === 'high' ? 'bg-red-500/10 text-red-500' : 
                                      task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                                    }`}>
                                      {task.priority}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                                      <Clock size={12} className="text-gray-600" />
                                      {task.deadline}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </Draggable>
                          ))
                      )}
                    </div>
                    {provided.placeholder}
                    <button 
                      onClick={() => { setIsModalOpen(true); setNewTaskData({ ...newTaskData, status: col.key }); }}
                      className="w-full py-3 mt-3 border border-dashed border-gray-700/50 rounded-xl text-gray-500 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-xs flex items-center justify-center gap-2 group font-medium"
                    >
                      <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                      Add Task
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Modal Section */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative bg-[#1e293b] border border-gray-700 w-full max-w-md rounded-[24px] shadow-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-tight">Create Task</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
              </div>
              <form onSubmit={handleAddTask} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Title</label>
                  <input type="text" required autoFocus className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={newTaskData.title} onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Priority</label>
                    <select className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none text-sm" value={newTaskData.priority} onChange={(e) => setNewTaskData({...newTaskData, priority: e.target.value})}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Deadline</label>
                    <input type="date" className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 outline-none text-sm" value={newTaskData.deadline} onChange={(e) => setNewTaskData({...newTaskData, deadline: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-sm mt-4 transition-all active:scale-[0.98]">Confirm & Create</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;