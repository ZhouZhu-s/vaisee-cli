/**
 * 获取当前权限
 * @returns string[]
 */
export const getCurrentAuthority = () => {
  return localStorage.getItem('authorities')?.split(',') || [];
};

/**
 * 检查当前组件是否有权限
 * @param authorities 组件所需权限
 * @returns boolean
 */
export const checkAuth = (authorities: string[]) => {
  const currentAuthorities = getCurrentAuthority();

  for (let i = 0; i < authorities.length; i++) {
    if (currentAuthorities.includes(authorities[i])) return true;
  }

  return false;
};
