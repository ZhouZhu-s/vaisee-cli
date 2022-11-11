import { checkAuth } from '@/utils/authority';
import { defineComponent } from 'vue';
import { authoritiesProps } from './types';

export default defineComponent({
  name: 'check-auth',
  props: authoritiesProps,
  setup(props, { slots }) {
    const hasAuthority = checkAuth(props.authorities);

    return () => <>{hasAuthority && slots.default ? slots.default() : null}</>;
  },
});
