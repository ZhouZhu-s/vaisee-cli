const axios = require('axios');

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模版
 */
async function getVaiseeCliRepo() {
  return axios.get('https://github.com/letconstvar/vue3-ts-template.git')
}

module.exports = {
  getVaiseeCliRepo
}