import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Tổng quan', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Người dùng', href: paths.dashboard.customers, icon: 'users' },
  { key: 'signwords', title: 'Ngôn ngữ ký hiệu', href: paths.dashboard.signwords, icon: 'users' },
  { key: 'integrations', title: 'Tích hợp', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Cài đặt', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Tài khoản', href: paths.dashboard.account, icon: 'user' },
  { key: 'error', title: 'Lỗi', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
