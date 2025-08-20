import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Trash2, Database, FileText, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAdmin } from '@/contexts/AdminContext';

interface QueryFilter {
  field: string;
  operator: string;
  value: any;
}

interface HybridQuery {
  id: string;
  name: string;
  entity: string;
  joinWith: string;
  filters: QueryFilter[];
  createdAt: string;
}

export function AdminHybridQueriesPage() {
  const { executeHybridQuery } = useAdmin();
  const [queries, setQueries] = useState<HybridQuery[]>([
    {
      id: '1',
      name: 'High-rated Users with Reviews',
      entity: 'users',
      joinWith: 'reviews',
      filters: [
        { field: 'avgRating', operator: '>=', value: 4 },
        { field: 'reviewCount', operator: '>', value: 0 }
      ],
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Popular Movies with Images',
      entity: 'movies',
      joinWith: 'reviews',
      filters: [
        { field: 'views', operator: '>', value: 500000 },
        { field: 'hasImage', operator: '=', value: true }
      ],
      createdAt: '2024-01-10'
    }
  ]);

  const [currentQuery, setCurrentQuery] = useState<Partial<HybridQuery>>({
    name: '',
    entity: 'users',
    joinWith: 'reviews',
    filters: []
  });

  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);

  const entityOptions = [
    { value: 'users', label: 'Users (Structured)', icon: Database },
    { value: 'movies', label: 'Movies (Structured)', icon: Database }
  ];

  const joinOptions = [
    { value: 'reviews', label: 'Reviews (Unstructured)', icon: FileText }
  ];

  const operatorOptions = [
    { value: '=', label: 'Equals' },
    { value: '>', label: 'Greater than' },
    { value: '<', label: 'Less than' },
    { value: '>=', label: 'Greater or equal' },
    { value: '<=', label: 'Less or equal' },
    { value: 'contains', label: 'Contains' }
  ];

  const getFieldOptions = (entity: string) => {
    if (entity === 'users') {
      return ['name', 'email', 'subscription', 'status', 'reviewCount', 'avgRating'];
    } else if (entity === 'movies') {
      return ['title', 'genre', 'year', 'rating', 'status', 'views', 'revenue', 'reviewCount', 'avgUserRating'];
    }
    return [];
  };

  const handleExecuteQuery = async (query: HybridQuery) => {
    setIsExecuting(true);
    try {
      const results = await executeHybridQuery(query);
      setQueryResults(results);
    } catch (error) {
      console.error('Query execution failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSaveQuery = () => {
    if (currentQuery.name && currentQuery.entity && currentQuery.joinWith) {
      const newQuery: HybridQuery = {
        id: Date.now().toString(),
        name: currentQuery.name,
        entity: currentQuery.entity,
        joinWith: currentQuery.joinWith,
        filters: currentQuery.filters || [],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQueries([...queries, newQuery]);
      setCurrentQuery({ name: '', entity: 'users', joinWith: 'reviews', filters: [] });
      setShowQueryBuilder(false);
    }
  };

  const handleDeleteQuery = (id: string) => {
    setQueries(queries.filter(q => q.id !== id));
  };

  const addFilter = () => {
    const newFilter: QueryFilter = {
      field: getFieldOptions(currentQuery.entity || 'users')[0],
      operator: '=',
      value: ''
    };
    setCurrentQuery({
      ...currentQuery,
      filters: [...(currentQuery.filters || []), newFilter]
    });
  };

  const updateFilter = (index: number, field: keyof QueryFilter, value: any) => {
    const updatedFilters = [...(currentQuery.filters || [])];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    setCurrentQuery({ ...currentQuery, filters: updatedFilters });
  };

  const removeFilter = (index: number) => {
    const updatedFilters = (currentQuery.filters || []).filter((_, i) => i !== index);
    setCurrentQuery({ ...currentQuery, filters: updatedFilters });
  };

  const chartData = queryResults.slice(0, 10).map((item, index) => ({
    name: item.name || item.title || `Item ${index + 1}`,
    value: item.reviewCount || item.views || item.avgRating || 0
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hybrid Query Builder</h1>
        <p className="text-gray-400">Combine structured and unstructured data with visual queries</p>
      </div>

      {/* Query Builder Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Saved Queries</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQueryBuilder(!showQueryBuilder)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Query</span>
        </motion.button>
      </div>

      {/* Query Builder */}
      <AnimatePresence>
        {showQueryBuilder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Build New Query</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Query Name</label>
                <input
                  type="text"
                  value={currentQuery.name || ''}
                  onChange={(e) => setCurrentQuery({ ...currentQuery, name: e.target.value })}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                  placeholder="Enter query name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Primary Entity</label>
                  <select
                    value={currentQuery.entity || 'users'}
                    onChange={(e) => setCurrentQuery({ ...currentQuery, entity: e.target.value })}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                  >
                    {entityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Join With</label>
                  <select
                    value={currentQuery.joinWith || 'reviews'}
                    onChange={(e) => setCurrentQuery({ ...currentQuery, joinWith: e.target.value })}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                  >
                    {joinOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filters */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-300 text-sm font-medium">Filters</label>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addFilter}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Add Filter
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {(currentQuery.filters || []).map((filter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-4">
                        <select
                          value={filter.field}
                          onChange={(e) => updateFilter(index, 'field', e.target.value)}
                          className="w-full bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-sm"
                        >
                          {getFieldOptions(currentQuery.entity || 'users').map(field => (
                            <option key={field} value={field}>{field}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <select
                          value={filter.operator}
                          onChange={(e) => updateFilter(index, 'operator', e.target.value)}
                          className="w-full bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-sm"
                        >
                          {operatorOptions.map(op => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => updateFilter(index, 'value', e.target.value)}
                          className="w-full bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 text-sm"
                          placeholder="Value"
                        />
                      </div>
                      <div className="col-span-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFilter(index)}
                          className="p-1 text-red-400 hover:bg-red-400/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveQuery}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Save Query
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowQueryBuilder(false)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {queries.map((query, index) => (
          <motion.div
            key={query.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{query.name}</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExecuteQuery(query)}
                  disabled={isExecuting}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteQuery(query.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Primary: {query.entity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Join: {query.joinWith}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Filters: {query.filters.length}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-xs">Created: {query.createdAt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Query Results */}
      {queryResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Query Results ({queryResults.length} records)</h3>
          
          {/* Chart View */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Visual Results</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }}
                />
                <Bar dataKey="value" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  {Object.keys(queryResults[0] || {}).slice(0, 6).map(key => (
                    <th key={key} className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {queryResults.slice(0, 10).map((result, index) => (
                  <tr key={index} className="hover:bg-gray-800/30">
                    {Object.entries(result).slice(0, 6).map(([key, value]) => (
                      <td key={key} className="px-4 py-3 text-sm text-gray-300">
                        {typeof value === 'object' ? JSON.stringify(value).slice(0, 50) + '...' : String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isExecuting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-12 text-center"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
            <span className="text-white text-lg">Executing hybrid query...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}