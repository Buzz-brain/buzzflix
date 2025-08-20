// ...existing code...
import { motion } from 'framer-motion';
import { Users, Film, MessageSquare, HardDrive, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { KPICard } from '@/components/admin/KPICard';
import { kpiMetrics, queryPerformanceData, storageMetrics } from '@/data/adminMockData';

export function AdminOverviewPage() {
  const storageData = [
    { name: 'Structured', value: storageMetrics.structured, color: '#3B82F6' },
    { name: 'Unstructured', value: storageMetrics.unstructured, color: '#EF4444' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Overview</h1>
        <p className="text-gray-400">Monitor your platform's performance and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard
          title="Total Users"
          value={kpiMetrics.totalUsers}
          change={12}
          icon={Users}
          color="blue"
          delay={0}
        />
        <KPICard
          title="Total Movies"
          value={kpiMetrics.totalMovies}
          change={8}
          icon={Film}
          color="red"
          delay={0.1}
        />
        <KPICard
          title="Total Reviews"
          value={kpiMetrics.totalReviews}
          change={15}
          icon={MessageSquare}
          color="green"
          delay={0.2}
        />
        <KPICard
          title="Storage Usage"
          value={kpiMetrics.storageUsage}
          unit="GB"
          change={5}
          icon={HardDrive}
          color="purple"
          delay={0.3}
        />
        <KPICard
          title="Avg Query Speed"
          value={kpiMetrics.avgQuerySpeed}
          unit="ms"
          change={-3}
          icon={Clock}
          color="yellow"
          delay={0.4}
        />
        <KPICard
          title="Active Users"
          value={kpiMetrics.activeUsers}
          change={18}
          icon={TrendingUp}
          color="indigo"
          delay={0.5}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Query Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
        >
          <h3 className="text-xl font-bold text-white mb-6">Query Execution Speed</h3>
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

        {/* Storage Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
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
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago', type: 'user' },
            { action: 'Movie added', user: 'admin', time: '15 minutes ago', type: 'movie' },
            { action: 'Review submitted', user: 'sarah.j@example.com', time: '1 hour ago', type: 'review' },
            { action: 'Hybrid query executed', user: 'admin', time: '2 hours ago', type: 'query' },
            { action: 'User subscription upgraded', user: 'mike.chen@example.com', time: '3 hours ago', type: 'user' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-400' :
                  activity.type === 'movie' ? 'bg-red-400' :
                  activity.type === 'review' ? 'bg-green-400' :
                  'bg-purple-400'
                }`} />
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.user}</p>
                </div>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}