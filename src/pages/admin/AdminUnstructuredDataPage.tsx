import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, FileText, Eye } from 'lucide-react';
import { DataTable } from '@/components/admin/DataTable';
import { useAdmin } from '@/contexts/AdminContext';

export function AdminUnstructuredDataPage() {
  const { reviews, addReview, updateReview, deleteReview } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');

  const reviewColumns = [
    { key: 'userName', label: 'User', sortable: true },
    { key: 'movieTitle', label: 'Movie', sortable: true },
    { key: 'rating', label: 'Rating', sortable: true, render: (value: number) => (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < value ? 'text-yellow-400' : 'text-gray-600'}`}>
            ★
          </span>
        ))}
        <span className="text-gray-300 ml-2">{value}</span>
      </div>
    )},
    { key: 'comment', label: 'Comment', render: (value: string) => (
      <span className="line-clamp-2 max-w-xs">{value}</span>
    )},
    { key: 'hasImage', label: 'Image', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
      }`}>
        {value ? 'Yes' : 'No'}
      </span>
    )},
    { key: 'sentiment', label: 'Sentiment', sortable: true, render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'positive' ? 'bg-green-600/20 text-green-400' :
        value === 'negative' ? 'bg-red-600/20 text-red-400' :
        'bg-yellow-600/20 text-yellow-400'
      }`}>
        {value}
      </span>
    )},
    { key: 'date', label: 'Date', sortable: true }
  ];

  const handleAdd = () => {
    setModalType('add');
    setSelectedItem(null);
    setFormData({
      userId: '',
      movieId: '',
      userName: '',
      movieTitle: '',
      rating: 5,
      comment: '',
      date: new Date().toISOString().split('T')[0],
      hasImage: false,
      imageUrl: '',
      sentiment: 'positive'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setSelectedItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleView = (item: any) => {
    setModalType('view');
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: any) => {
    if (confirm(`Are you sure you want to delete this review?`)) {
      deleteReview(item.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      addReview(formData);
    } else {
      updateReview(selectedItem.id, formData);
    }
    
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For demo purposes, we'll use a placeholder URL
      const mockUrl = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=400`;
      setFormData({ ...formData, hasImage: true, imageUrl: mockUrl });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Unstructured Data Management</h1>
        <p className="text-gray-400">Manage reviews and media files with NoSQL-like operations</p>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
          {['table', 'json'].map((mode) => (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode(mode as 'table' | 'json')}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {mode === 'table' ? 'Table View' : 'JSON View'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <DataTable
          data={reviews}
          columns={[
            ...reviewColumns,
            {
              key: 'actions',
              label: 'Actions',
              render: (_, item) => (
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleView(item)}
                    className="p-2 text-purple-400 hover:bg-purple-400/20 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
              )
            }
          ]}
          title="Reviews Management"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">JSON Document View</h3>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(reviews, null, 2)}
            </pre>
          </div>
        </motion.div>
      )}

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
              className="bg-gray-900 rounded-lg border border-gray-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {modalType === 'add' ? 'Add Review' : 
                   modalType === 'edit' ? 'Edit Review' : 'View Review'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {modalType === 'view' ? (
                <div className="space-y-6">
                  {/* JSON View */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2 flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Raw Document</span>
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {JSON.stringify(selectedItem, null, 2)}
                    </pre>
                  </div>

                  {/* Image Preview */}
                  {selectedItem?.hasImage && selectedItem?.imageUrl && (
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2 flex items-center space-x-2">
                        <Image className="w-4 h-4" />
                        <span>Attached Image</span>
                      </h3>
                      <img
                        src={selectedItem.imageUrl}
                        alt="Review attachment"
                        className="w-full max-w-sm rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">User Name</label>
                      <input
                        type="text"
                        value={formData.userName || ''}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Movie Title</label>
                      <input
                        type="text"
                        value={formData.movieTitle || ''}
                        onChange={(e) => setFormData({ ...formData, movieTitle: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Rating</label>
                      <select
                        value={formData.rating || 5}
                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Sentiment</label>
                      <select
                        value={formData.sentiment || 'positive'}
                        onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
                        className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      >
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Comment</label>
                    <textarea
                      value={formData.comment || ''}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Image Upload</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {formData.hasImage && (
                        <span className="text-green-400 text-sm">Image attached</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      {modalType === 'add' ? 'Add Review' : 'Update Review'}
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
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}