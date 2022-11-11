export const unique = (function () {
  let num = 1;
  return {
    count() {
      return num++;
    },
  };
})();
