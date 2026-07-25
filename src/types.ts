export type AppCategory = 'latest' | 'daily' | 'bonus';

export interface AppItem {
  id: string;
  name: string;
  category: AppCategory;
  categoryLabel?: string;
  logo: string;
  bannerUrl?: string;
  rewardAmount: number; // e.g. 150, 350, 500
  rewardType?: string; // e.g. 'Instant Cashback', 'Bonus Claim', 'Trade Cashback'
  shortDescription: string;
  fullDescription: string;
  referralUrl: string;
  status: 'published' | 'draft';
  rating: number; // e.g. 4.8
  totalClaims: number; // e.g. 1240
  requirements: string[]; // e.g. ['Aadhaar linked Mobile', 'PAN Card', 'Bank Account']
  eligibility: string; // e.g. 'New Users Only'
  howItWorks: string[]; // Step 1, Step 2, etc.
  estimatedTime: string; // e.g. '3-5 Minutes'
  isFeatured?: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'blocked';
  registeredDate: string;
  lastLogin: string;
  totalEarned: number;
  claimsCount: number;
  avatar?: string;
  phone?: string;
}

export interface ClaimActivity {
  id: string;
  userId: string;
  userName: string;
  appId: string;
  appName: string;
  appLogo: string;
  rewardAmount: number;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
  transactionRef?: string;
}

export interface TelegramConfig {
  enabled: boolean;
  title: string;
  description: string;
  channelLink: string;
  channelName: string;
  buttonText: string;
  memberCount: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'claim' | 'user' | 'system' | 'reward';
  timestamp: string;
  read: boolean;
}

export interface AnalyticsStats {
  totalUsers: number;
  todayUsers: number;
  totalApps: number;
  claimsToday: number;
  revenueDistributed: number;
  activeUsersNow: number;
  completionRate: number;
}
