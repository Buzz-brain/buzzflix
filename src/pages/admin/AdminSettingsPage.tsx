import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

export function AdminSettingsPage() {
  const { adminProfile } = useAdmin();
  const [settings, setSettings] = useState({
    profile: {
      name: adminProfile.name,
      email: adminProfile.email,
      role: adminProfile.role,
      avatar: adminProfile.avatar
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      queryAlerts: false,
      systemUpdates: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipWhitelist: '',
      auditLogging: true
    },
    database: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      compressionEnabled: true
    },
    appearance: {
      theme: 'dark',
      sidebarCollapsed: false,
      compactMode: false,
      animations: true
    },
    system: {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      autoRefresh: 30
    }
  });

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your account information and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure alert and notification preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Security settings and access controls'
    },
    {
      id: 'database',
      title: 'Database',
      icon: Database,
      description: 'Database backup and maintenance settings'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the admin interface appearance'
    },
    {
      id: 'system',
      title: 'System',
      icon: Globe,
      description: 'System-wide configuration options'
    }
  ];

  const [activeSection, setActiveSection] = useState('profile');

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={settings.profile.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-red-600"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors"
          >
            <User className="w-4 h-4" />
          </motion.button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{settings.profile.name}</h3>
          <p className="text-gray-400">{settings.profile.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => updateSetting('profile', 'name', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => updateSetting('profile', 'email', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h4>
            <p className="text-gray-400 text-sm">
              {key === 'emailAlerts' && 'Receive email notifications for important events'}
              {key === 'pushNotifications' && 'Browser push notifications'}
              {key === 'queryAlerts' && 'Alerts for slow or failed queries'}
              {key === 'systemUpdates' && 'System maintenance and update notifications'}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateSetting('notifications', key, !value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? 'bg-red-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </motion.button>
        </div>
      ))}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Two-Factor Authentication</h4>
          <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => updateSetting('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.security.twoFactorAuth ? 'bg-red-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </motion.button>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Session Timeout (minutes)</label>
        <select
          value={settings.security.sessionTimeout}
          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={120}>2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">IP Whitelist</label>
        <textarea
          value={settings.security.ipWhitelist}
          onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          rows={3}
          placeholder="Enter IP addresses, one per line"
        />
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Automatic Backup</h4>
          <p className="text-gray-400 text-sm">Automatically backup database at regular intervals</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => updateSetting('database', 'autoBackup', !settings.database.autoBackup)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.database.autoBackup ? 'bg-red-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.database.autoBackup ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Backup Frequency</label>
          <select
            value={settings.database.backupFrequency}
            onChange={(e) => updateSetting('database', 'backupFrequency', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.database.retentionPeriod}
            onChange={(e) => updateSetting('database', 'retentionPeriod', parseInt(e.target.value))}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
            min="1"
            max="365"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Theme</label>
        <div className="flex space-x-4">
          {['dark', 'light'].map(theme => (
            <motion.button
              key={theme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateSetting('appearance', 'theme', theme)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.appearance.theme === theme
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {Object.entries(settings.appearance).filter(([key]) => key !== 'theme').map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h4>
            <p className="text-gray-400 text-sm">
              {key === 'sidebarCollapsed' && 'Start with sidebar collapsed'}
              {key === 'compactMode' && 'Use compact layout for better space utilization'}
              {key === 'animations' && 'Enable smooth animations and transitions'}
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateSetting('appearance', key, !value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? 'bg-red-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </motion.button>
        </div>
      ))}
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Language</label>
          <select
            value={settings.system.language}
            onChange={(e) => updateSetting('system', 'language', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Timezone</label>
          <select
            value={settings.system.timezone}
            onChange={(e) => updateSetting('system', 'timezone', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Date Format</label>
          <select
            value={settings.system.dateFormat}
            onChange={(e) => updateSetting('system', 'dateFormat', e.target.value)}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Auto Refresh (seconds)</label>
          <input
            type="number"
            value={settings.system.autoRefresh}
            onChange={(e) => updateSetting('system', 'autoRefresh', parseInt(e.target.value))}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
            min="10"
            max="300"
          />
        </div>
      </div>
    </div>
  );

  const renderSettingContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'database': return renderDatabaseSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'system': return renderSystemSettings();
      default: return renderProfileSettings();
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
        <h1 className="text-3xl font-bold text-white mb-2">Admin Settings</h1>
        <p className="text-gray-400">Configure your admin dashboard preferences and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                    activeSection === section.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <section.icon className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{section.title}</p>
                    <p className="text-xs opacity-75 truncate">{section.description}</p>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {settingSections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-gray-400">
                {settingSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderSettingContent()}

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}