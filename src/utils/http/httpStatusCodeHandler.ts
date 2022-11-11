import { MessageApi } from 'ant-design-vue/lib/message';

interface StrategyType {
  [code: number]: () => string;
}

const httpStatusCodeStrategies: StrategyType = {
  400: () => {
    const tip = '参数错误，请确认参数是否提交完整';
    return tip;
  },
  401: () => {
    const tip = '登陆超时，请重新登陆';
    location.href = '/';
    return tip;
  },
  403: () => {
    const tip = '无权限';
    return tip;
  },
  404: () => {
    const tip = '资源不存在';
    return tip;
  },
  500: () => {
    const tip = '服务错误';
    return tip;
  },
};

class HttpStatusCodeHandler {
  strategies: StrategyType;

  constructor(strategies: StrategyType) {
    this.strategies = strategies;
  }

  sendMessage(status: number, message: MessageApi) {
    const tip = this.strategies[status]();
    message.error(tip);
  }
}

const httpStatusCodeHandler = new HttpStatusCodeHandler(
  httpStatusCodeStrategies
);

export default httpStatusCodeHandler;
