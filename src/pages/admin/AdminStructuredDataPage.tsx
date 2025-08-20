import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { useAdmin } from '@/contexts/AdminContext';

export function AdminStructuredDataPage() {
  const { users, movies, addUser, updateUser, deleteUser, addMovie, updateMovie, deleteMovie } = useAdmin();
  const [activeTab, setActiveTab] = useState<'users' | 'movies'>('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const userColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subscription', label: 'Subscription', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-green-600/20 text-green-400' :
        value === 'inactive' ? 'bg-gray-600/20 text-gray-400' :
        'bg-red-600/20 text-red-400'
      }`}>
        {value}
      </span>
    )},
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true }
  ];

  const movieColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'genre', label: 'Genre', render: (value: string[]) => value.join(', ') },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'published' ? 'bg-green-600/20 text-green-400' :
        value === 'draft' ? 'bg-yellow-600/20 text-yellow-400' :
        'bg-gray-600/20 text-gray-400'
      }`}>
        {value}
      </span>
    )},
    { key: 'views', label: 'Views', sortable: true, render: (value: number) => value.toLocaleString() },
    { key: 'revenue', label: 'Revenue', sortable: true, render: (value: number) => `$${value.toLocaleString()}` }
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedItem(null);
    setFormData(activeTab === 'users' ? {
      name: '',
      email: '',
      subscription: 'Basic',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    } : {
      title: '',
      genre: [],
      year: new Date().getFullYear(),
      rating: 0,
      duration: '',
      status: 'draft',
      views: 0,
      revenue: 0
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setSelectedItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: any) => {
    if (confirm(`Are you sure you want to delete ${activeTab === 'users' ? item.name : item.title}?`)) {
      if (activeTab === 'users') {
        deleteUser(item.id);
      } else {
        deleteMovie(item.id);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'users') {
      if (modalType === 'add') {
        addUser(formData);
      } else {
        updateUser(selectedItem.id, formData);
      }
    } else {
      if (modalType === 'add') {
        addMovie(formData);
      } else {
        updateMovie(selectedItem.id, formData);
      }
    }
    
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Structured Data Management</h1>
        <p className="text-gray-400">Manage users and movies with SQL-like operations</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {['users', 'movies'].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab as 'users' | 'movies')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        data={activeTab === 'users' ? users : movies}
        columns={activeTab === 'users' ? userColumns : movieColumns}
        title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg border border-gray-800 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {modalType === 'add' ? 'Add' : 'Edit'} {activeTab === 'users' ? 'User' : 'Movie'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'users' ? (
                  <>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Subscription</label>
                      <select
                        value={formData.subscription || 'Basic'}
                        onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                      <select
                        value={formData.status || 'active'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Genre (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(formData.genre) ? formData.genre.join(', ') : ''}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value.split(', ').filter(g => g.trim()) })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        placeholder="Action, Drama, Sci-Fi"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Year</label>
                      <input
                        type="number"
                        value={formData.year || new Date().getFullYear()}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.rating || 0}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        min="0"
                        max="10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        placeholder="2h 30m"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
                      <select
                        value={formData.status || 'draft'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    {modalType === 'add' ? 'Add' : 'Update'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}