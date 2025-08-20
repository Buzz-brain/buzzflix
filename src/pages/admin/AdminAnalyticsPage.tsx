import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Database, Clock, Users } from 'lucide-react';
import { KPICard } from '@/components/admin/KPICard';
import { recordCounts, queryTypePerformance, queryPerformanceData, storageMetrics } from '@/data/adminMockData';

export function AdminAnalyticsPage() {
  const storageData = [
    { name: 'Structured', value: storageMetrics.structured, color: '#3B82F6' },
    { name: 'Unstructured', value: storageMetrics.unstructured, color: '#EF4444' }
  ];

  const performanceData = queryTypePerformance.map(item => ({
    ...item,
    efficiency: Math.round((1000 / item.avgSpeed) * 10) / 10
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-gray-400">Comprehensive insights into your data and query performance</p>
      </div>

      {/* Performance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Avg Query Speed"
          value={85}
          unit="ms"
          change={-12}
          icon={Clock}
          color="green"
          delay={0}
        />
        <KPICard
          title="Query Efficiency"
          value={94}
          unit="%"
          change={8}
          icon={TrendingUp}
          color="blue"
          delay={0.1}
        />
        <KPICard
          title="Data Throughput"
          value={2.4}
          unit="GB/s"
          change={15}
          icon={Database}
          color="purple"
          delay={0.2}
        />
        <KPICard
          title="Active Connections"
          value={156}
          change={22}
          icon={Users}
          color="yellow"
          delay={0.3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Record Counts Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Records by Entity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recordCounts}>
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
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {recordCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Query Performance Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Query Speed Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={queryPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Line
                type="monotone"
                dataKey="structuredQuery"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Structured (ms)"
              />
              <Line
                type="monotone"
                dataKey="unstructuredQuery"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                name="Unstructured (ms)"
              />
              <Line
                type="monotone"
                dataKey="hybridQuery"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Hybrid (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Storage Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Storage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
                formatter={(value: number) => [`${value} GB`, 'Storage']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {storageData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-300 text-sm">
                  {entry.name}: {entry.value} GB
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Query Type Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Query Type Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="type" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#FFFFFF'
                }}
              />
              <Bar dataKey="avgSpeed" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Avg Speed (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Query Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Query Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Avg Speed (ms)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Total Queries</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Efficiency</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {queryTypePerformance.map((item, index) => (
                <motion.tr
                  key={item.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">{item.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.avgSpeed}ms</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.count.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min((1000 / item.avgSpeed) * 10, 100)}%` }}
                        />
                      </div>
                      <span className="text-gray-300 text-xs">
                        {Math.round((1000 / item.avgSpeed) * 10)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.avgSpeed < 50 ? 'bg-green-600/20 text-green-400' :
                      item.avgSpeed < 100 ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {item.avgSpeed < 50 ? 'Excellent' : item.avgSpeed < 100 ? 'Good' : 'Needs Optimization'}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Query Optimization',
              description: 'Hybrid queries are 15% slower but provide richer data insights',
              status: 'info',
              icon: '📊'
            },
            {
              title: 'Storage Efficiency',
              description: 'Unstructured data accounts for 78% of total storage usage',
              status: 'warning',
              icon: '💾'
            },
            {
              title: 'Performance Trend',
              description: 'Overall query speed improved by 12% this week',
              status: 'success',
              icon: '⚡'
            }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className={`p-4 rounded-lg border ${
                insight.status === 'success' ? 'bg-green-600/10 border-green-600/30' :
                insight.status === 'warning' ? 'bg-yellow-600/10 border-yellow-600/30' :
                'bg-blue-600/10 border-blue-600/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                  <p className="text-gray-400 text-sm">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}