import { ExtractPropTypes, PropType } from 'vue';

export const authoritiesProps = {
  authorities: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
};

export type AuthorizedProps = Partial<
  ExtractPropTypes<typeof authoritiesProps>
>;
