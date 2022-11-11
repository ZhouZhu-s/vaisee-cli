const axios = require("axios");

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模版里面的所有分支
 */
async function getVueTemplateBranches() {
  return axios.get(
    "https://api.github.com/repos/ZhouZhu-s/vue-template/branches"
  );
}

module.exports = {
  getVueTemplateBranches,
};
