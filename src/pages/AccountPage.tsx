import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Crown, CreditCard, Settings, Shield, Bell, Download } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function AccountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const accountSections = [
    {
      title: 'Profile Information',
      icon: User,
      items: [
        { label: 'Name', value: currentUser.name },
        { label: 'Email', value: currentUser.email },
        { label: 'Member since', value: 'January 2023' },
      ]
    },
    {
      title: 'Subscription',
      icon: Crown,
      items: [
        { label: 'Plan', value: currentUser.subscription },
        { label: 'Status', value: 'Active' },
        { label: 'Next billing', value: 'Feb 15, 2024' },
        { label: 'Monthly cost', value: '$15.99' }
      ]
    },
    {
      title: 'Payment',
      icon: CreditCard,
      items: [
        { label: 'Payment method', value: '•••• •••• •••• 4532' },
        { label: 'Expiry', value: '12/26' },
        { label: 'Auto-renew', value: 'Enabled' }
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-black pt-24"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-6 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-red-600"
              />
              <div className="absolute -bottom-2 -right-2 bg-red-600 text-white rounded-full p-2">
                <Crown className="w-4 h-4" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-white">{currentUser.name}</h1>
              <p className="text-gray-400 text-lg">{currentUser.subscription} Member</p>
            </div>
          </div>
        </div>

        {/* Account Sections */}
        <div className="space-y-8">
          {accountSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
            >
              <div className="flex items-center space-x-3 mb-6">
                <section.icon className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-gray-400 text-sm font-medium">{item.label}</label>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors"
                >
                  Edit {section.title}
                </motion.button>
              </div>
            </motion.div>
          ))}

          {/* Quick Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white">Quick Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Bell, title: 'Notifications', subtitle: 'Manage alerts' },
                { icon: Shield, title: 'Privacy', subtitle: 'Security settings' },
                { icon: Download, title: 'Downloads', subtitle: 'Offline content' },
                { icon: User, title: 'Profiles', subtitle: 'Family accounts' }
              ].map((setting) => (
                <motion.button
                  key={setting.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/50 rounded-lg p-4 text-left hover:bg-gray-700/50 transition-colors"
                >
                  <setting.icon className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="text-white font-semibold mb-1">{setting.title}</h3>
                  <p className="text-gray-400 text-sm">{setting.subtitle}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex-1"
            >
              Upgrade Plan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex-1"
            >
              Download App
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800/50 border border-gray-700 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition-colors"
            >
              Sign Out
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}