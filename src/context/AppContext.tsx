import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppItem, User, ClaimActivity, TelegramConfig, AppNotification } from '../types';
import { INITIAL_APPS, INITIAL_USERS, INITIAL_ACTIVITIES, INITIAL_TELEGRAM_CONFIG, INITIAL_NOTIFICATIONS } from '../data/initialData';
import { db } from '../lib/firebase';
import { ref, onValue, set, update, remove } from 'firebase/database';

interface AppContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  apps: AppItem[];
  users: User[];
  activities: ClaimActivity[];
  telegramConfig: TelegramConfig;
  showTelegramModal: boolean;
  selectedAppForClaim: AppItem | null;
  notifications: AppNotification[];
  viewMode: 'user' | 'admin';
  activeTab: string;
  searchQuery: string;
  selectedCategory: string;
  adminPassword: string;
  isLoadingFirebase: boolean;
  
  // Actions
  login: (email: string, role?: 'admin' | 'user') => boolean;
  logout: () => void;
  register: (name: string, email: string) => void;
  toggleTelegramModal: (open?: boolean) => void;
  setSelectedAppForClaim: (app: AppItem | null) => void;
  claimApp: (app: AppItem) => void;
  addApp: (newApp: Omit<AppItem, 'id' | 'createdAt' | 'totalClaims'>) => void;
  updateApp: (id: string, updated: Partial<AppItem>) => void;
  deleteApp: (id: string) => void;
  deleteAllApps: () => void;
  toggleAppStatus: (id: string) => void;
  updateUserStatus: (id: string, status: 'active' | 'inactive' | 'blocked') => void;
  deleteUser: (id: string) => void;
  updateTelegramConfig: (config: Partial<TelegramConfig>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  setViewMode: (mode: 'user' | 'admin') => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetToDefaults: () => void;
  saveAdminPassword: (pass: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<ClaimActivity[]>([]);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(INITIAL_TELEGRAM_CONFIG);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [adminPassword, setAdminPassword] = useState<string>('adminrohit@123123');
  const [isLoadingFirebase, setIsLoadingFirebase] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'public-user-1',
    name: 'Loot Member',
    email: 'user@rohitloots.com',
    role: 'user',
    status: 'active',
    registeredDate: new Date().toISOString().split('T')[0],
    claimsCount: 0,
    totalEarned: 0,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [showTelegramModal, setShowTelegramModal] = useState<boolean>(false);
  const [selectedAppForClaim, setSelectedAppForClaim] = useState<AppItem | null>(null);
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Auto show Telegram popup on site open
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTelegramModal(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------
  // FIREBASE REALTIME DATABASE REAL-TIME SUBSCRIBERS
  // ----------------------------------------------------
  useEffect(() => {
    // 1. Apps Listener
    const appsRef = ref(db, 'apps');
    const unsubscribeApps = onValue(appsRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const appsList: AppItem[] = Array.isArray(val)
          ? val.filter(Boolean)
          : Object.values(val);
        setApps(appsList);
      } else {
        setApps([]);
      }
      setIsLoadingFirebase(false);
    }, (error) => {
      console.error('Firebase apps listener error:', error);
      setIsLoadingFirebase(false);
    });

    // 2. Users Listener
    const usersRef = ref(db, 'users');
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const usersList: User[] = Array.isArray(val)
          ? val.filter(Boolean)
          : Object.values(val);
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    });

    // 3. Activities Listener
    const actRef = ref(db, 'activities');
    const unsubscribeAct = onValue(actRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const actList: ClaimActivity[] = Array.isArray(val)
          ? val.filter(Boolean)
          : Object.values(val);
        // Sort newest first
        actList.sort((a, b) => (b.id > a.id ? 1 : -1));
        setActivities(actList);
      } else {
        setActivities([]);
      }
    });

    // 4. Telegram Config Listener
    const tgRef = ref(db, 'telegramConfig');
    const unsubscribeTg = onValue(tgRef, (snapshot) => {
      if (snapshot.exists()) {
        setTelegramConfig(snapshot.val());
      } else {
        set(ref(db, 'telegramConfig'), INITIAL_TELEGRAM_CONFIG);
        setTelegramConfig(INITIAL_TELEGRAM_CONFIG);
      }
    });

    // 5. Notifications Listener
    const notifRef = ref(db, 'notifications');
    const unsubscribeNotif = onValue(notifRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const notifList: AppNotification[] = Array.isArray(val)
          ? val.filter(Boolean)
          : Object.values(val);
        notifList.sort((a, b) => (b.id > a.id ? 1 : -1));
        setNotifications(notifList);
      } else {
        setNotifications([]);
      }
    });

    // 6. Admin Settings Password Listener
    const adminRef = ref(db, 'adminSettings/password');
    const unsubscribeAdmin = onValue(adminRef, (snapshot) => {
      if (snapshot.exists()) {
        setAdminPassword(snapshot.val());
      } else {
        set(ref(db, 'adminSettings/password'), 'adminrohit@123123');
        setAdminPassword('adminrohit@123123');
      }
    });

    return () => {
      unsubscribeApps();
      unsubscribeUsers();
      unsubscribeAct();
      unsubscribeTg();
      unsubscribeNotif();
      unsubscribeAdmin();
    };
  }, []);

  // Auth actions
  const login = (email: string, role: 'admin' | 'user' = 'user') => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      if (foundUser.status === 'blocked') {
        alert('Your account has been suspended by Admin. Please contact support.');
        return false;
      }
      setCurrentUser(foundUser);
      setIsLoggedIn(true);
      setViewMode(foundUser.role === 'admin' ? 'admin' : 'user');
      setShowTelegramModal(telegramConfig.enabled);
      return true;
    } else {
      // Create quick user if not found
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: role,
        status: 'active',
        registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Just Now',
        totalEarned: 0,
        claimsCount: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      };
      set(ref(db, `users/${newUser.id}`), newUser);
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setViewMode(role);
      setShowTelegramModal(telegramConfig.enabled);
      return true;
    }
  };

  const logout = () => {
    setCurrentUser({
      id: 'public-user-1',
      name: 'Loot Member',
      email: 'user@rohitloots.com',
      role: 'user',
      status: 'active',
      registeredDate: new Date().toISOString().split('T')[0],
      claimsCount: 0,
      totalEarned: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    });
    setIsLoggedIn(true);
    setViewMode('user');
    setActiveTab('home');
  };

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role: 'user',
      status: 'active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Just Now',
      totalEarned: 0,
      claimsCount: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    };
    set(ref(db, `users/${newUser.id}`), newUser);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setViewMode('user');
    setShowTelegramModal(telegramConfig.enabled);

    // Add notification to admin in Firebase
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New User Registered',
      message: `${name} (${email}) joined Rohit Loots.`,
      type: 'user',
      timestamp: 'Just now',
      read: false
    };
    set(ref(db, `notifications/${notif.id}`), notif);
  };

  const toggleTelegramModal = (open?: boolean) => {
    setShowTelegramModal(prev => (open !== undefined ? open : !prev));
  };

  const claimApp = (app: AppItem) => {
    // 1. Increment app totalClaims in Firebase
    const updatedClaims = (app.totalClaims || 0) + 1;
    update(ref(db, `apps/${app.id}`), { totalClaims: updatedClaims });

    // 2. Record activity in Firebase
    const newActivity: ClaimActivity = {
      id: `act-${Date.now()}`,
      userId: currentUser?.id || 'u-guest',
      userName: currentUser?.name || 'Guest User',
      appId: app.id,
      appName: app.name,
      appLogo: app.logo,
      rewardAmount: app.rewardAmount,
      status: 'completed',
      date: 'Just Now',
      transactionRef: `RL-TXN-${Math.floor(1000 + Math.random() * 9000)}`
    };
    set(ref(db, `activities/${newActivity.id}`), newActivity);

    // 3. Update current user earnings in Firebase
    if (currentUser) {
      const addedVal = typeof app.rewardAmount === 'number' ? app.rewardAmount : (parseFloat(String(app.rewardAmount).replace(/[^0-9.]/g, '')) || 0);
      const updatedUser: User = {
        ...currentUser,
        totalEarned: (currentUser.totalEarned || 0) + addedVal,
        claimsCount: (currentUser.claimsCount || 0) + 1
      };
      setCurrentUser(updatedUser);
      set(ref(db, `users/${currentUser.id}`), updatedUser);
    }

    // 4. Add notification in Firebase
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Claim Successful! 🎁',
      message: `You claimed ₹${app.rewardAmount} from ${app.name}. Follow instructions on referral site.`,
      type: 'claim',
      timestamp: 'Just now',
      read: false
    };
    set(ref(db, `notifications/${newNotif.id}`), newNotif);
  };

  // ----------------------------------------------------
  // ADMIN APP MANAGEMENT (CREATE, EDIT, DELETE VIA FIREBASE)
  // ----------------------------------------------------
  const addApp = (newApp: Omit<AppItem, 'id' | 'createdAt' | 'totalClaims'>) => {
    const created: AppItem = {
      ...newApp,
      id: `app-${Date.now()}`,
      totalClaims: 0,
      createdAt: new Date().toISOString(),
      categoryLabel: newApp.category === 'latest' ? 'Latest Application' : newApp.category === 'daily' ? 'Daily Buy Sell App' : 'Bonus Claim Only'
    };
    
    // Save directly to Firebase RTDB
    set(ref(db, `apps/${created.id}`), created);

    // Add notification in Firebase RTDB
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New App Published 🚀',
      message: `${created.name} (Reward: ₹${created.rewardAmount}) is now live.`,
      type: 'reward',
      timestamp: 'Just now',
      read: false
    };
    set(ref(db, `notifications/${notif.id}`), notif);
  };

  const updateApp = (id: string, updated: Partial<AppItem>) => {
    update(ref(db, `apps/${id}`), updated);
  };

  const deleteApp = (id: string) => {
    remove(ref(db, `apps/${id}`));
    if (selectedAppForClaim?.id === id) {
      setSelectedAppForClaim(null);
    }
  };

  const deleteAllApps = () => {
    set(ref(db, 'apps'), null);
    setSelectedAppForClaim(null);
  };

  const toggleAppStatus = (id: string) => {
    const currentApp = apps.find(a => a.id === id);
    if (currentApp) {
      const newStatus = currentApp.status === 'published' ? 'draft' : 'published';
      update(ref(db, `apps/${id}`), { status: newStatus });
    }
  };

  // User management
  const updateUserStatus = (id: string, status: 'active' | 'inactive' | 'blocked') => {
    update(ref(db, `users/${id}`), { status });
  };

  const deleteUser = (id: string) => {
    remove(ref(db, `users/${id}`));
  };

  const updateTelegramConfig = (config: Partial<TelegramConfig>) => {
    const updated = { ...telegramConfig, ...config };
    set(ref(db, 'telegramConfig'), updated);
  };

  const markNotificationAsRead = (id: string) => {
    update(ref(db, `notifications/${id}`), { read: true });
  };

  const clearAllNotifications = () => {
    set(ref(db, 'notifications'), null);
  };

  const saveAdminPassword = (pass: string) => {
    set(ref(db, 'adminSettings/password'), pass.trim());
  };

  const resetToDefaults = () => {
    const initialAppsObj = INITIAL_APPS.reduce((acc, app) => ({ ...acc, [app.id]: app }), {});
    const initialUsersObj = INITIAL_USERS.reduce((acc, u) => ({ ...acc, [u.id]: u }), {});
    const initialActObj = INITIAL_ACTIVITIES.reduce((acc, a) => ({ ...acc, [a.id]: a }), {});
    const initialNotifObj = INITIAL_NOTIFICATIONS.reduce((acc, n) => ({ ...acc, [n.id]: n }), {});

    set(ref(db, 'apps'), initialAppsObj);
    set(ref(db, 'users'), initialUsersObj);
    set(ref(db, 'activities'), initialActObj);
    set(ref(db, 'telegramConfig'), INITIAL_TELEGRAM_CONFIG);
    set(ref(db, 'notifications'), initialNotifObj);
    set(ref(db, 'adminSettings/password'), 'adminrohit@123123');
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        apps,
        users,
        activities,
        telegramConfig,
        showTelegramModal,
        selectedAppForClaim,
        notifications,
        viewMode,
        activeTab,
        searchQuery,
        selectedCategory,
        adminPassword,
        isLoadingFirebase,

        login,
        logout,
        register,
        toggleTelegramModal,
        setSelectedAppForClaim,
        claimApp,
        addApp,
        updateApp,
        deleteApp,
        deleteAllApps,
        toggleAppStatus,
        updateUserStatus,
        deleteUser,
        updateTelegramConfig,
        markNotificationAsRead,
        clearAllNotifications,
        setViewMode,
        setActiveTab,
        setSearchQuery,
        setSelectedCategory,
        resetToDefaults,
        saveAdminPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
