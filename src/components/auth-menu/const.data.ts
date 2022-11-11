import {
  UnorderedListOutlined,
  DesktopOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue';
import { MenuItemType } from './types';

export const MenuItems: MenuItemType[] = [
  {
    key: '/admin/cameraList',
    path: '/admin/cameraList',
    icon: UnorderedListOutlined,
    label: '数据源管理',
    children: null,
  },
  {
    key: '/',
    path: '/',
    icon: DesktopOutlined,
    label: '大屏展示',
    children: null,
  },
  {
    key: '/admin/record',
    path: '/admin/record',
    icon: ProfileOutlined,
    label: '识别结果管理',
    children: null,
  },
];
