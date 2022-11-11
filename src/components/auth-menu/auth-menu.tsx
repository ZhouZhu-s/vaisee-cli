import { PropType, ref } from 'vue';
import { defineComponent, h, watch } from 'vue';
import { MenuItems } from './const.data';
import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { MenuItemType } from './types';
import CheckAuth from '@/components/check-auth/check-auth';

export default defineComponent({
  name: 'custom-menu',
  props: {
    inlineIndent: {
      type: Number,
      required: false,
      default: 24,
    },
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'inline'>,
      required: false,
      default: 'vertical',
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      required: false,
      default: 'light',
    },
    triggerSubMenuAction: {
      type: String as PropType<'click' | 'hover'>,
      required: false,
      default: 'hover',
    },
  },
  setup(props) {
    const router = useRouter();
    const selectedKeys = ref<string[]>([]);

    /**
     * 监听路由变化选中菜单
     */
    watch(
      () => router,
      () => {
        selectedKeys.value = [router.currentRoute.value.path];
      },
      {
        immediate: true,
      }
    );

    /**
     * createSubMenu
     * @param item MenuItemType
     */
    const createSubMenu = (item: MenuItemType) => (
      <SubMenu
        key={item.key}
        v-slots={{
          title: () => <span>{item.label}</span>,
          icon: () => (item.icon ? h(item.icon) : null),
        }}
      >
        {item.children && createMenu(item.children)}
      </SubMenu>
    );

    /**
     * createMenuItem
     * @param item MenuItemType
     */
    const createMenuItem = (item: MenuItemType) => (
      <MenuItem
        key={item.key}
        v-slots={{
          icon: () => (item.icon ? h(item.icon) : null),
        }}
        onClick={() => {
          router.push({ path: item.path });
        }}
      >
        <span>{item.label}</span>
      </MenuItem>
    );

    /**
     * 创建导航菜单
     * @param menuItems MenuItemType[]
     */
    const createMenu = (menuItems: MenuItemType[]) => {
      return menuItems.map((item) => {
        return item.children ? (
          item.authorities ? (
            <CheckAuth authorities={item.authorities}>
              {createSubMenu(item)}
            </CheckAuth>
          ) : (
            createSubMenu(item)
          )
        ) : item.authorities ? (
          <CheckAuth authorities={item.authorities}>
            {createMenuItem(item)}
          </CheckAuth>
        ) : (
          createMenuItem(item)
        );
      });
    };

    return () => {
      return (
        <>
          <Menu
            // @ts-ignore
            vModel={[selectedKeys.value, 'selectedKeys']}
            theme={props.theme}
            mode={props.mode}
          >
            {createMenu(MenuItems)}
          </Menu>
        </>
      );
    };
  },
});
