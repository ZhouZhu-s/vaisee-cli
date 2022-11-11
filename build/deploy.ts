import scpClient from 'scp2';
import ora from 'ora';
import path from 'path';
import * as dotenv from 'dotenv';

interface ConfigType {
  HOST: string;
  PORT: string;
  USERNAME: string;
  PASSWORD: string;
  PATH: string;
  LOCAL_SYNC_DIR: string;
}

const { parsed: config } = dotenv.config({
  path: path.format({
    dir: path.resolve(),
    base: '.env.production.deploy',
  }),
}) as unknown as { parsed: ConfigType };

const server = {
  host: config.HOST,
  port: Number(config.PORT),
  username: config.USERNAME,
  password: config.PASSWORD,
  path: config.PATH,
};

const loading = ora(`正在部署至 ${server.host}:${server.path}`);
loading.start();

scpClient.scp(path.resolve(config.LOCAL_SYNC_DIR), server, (err) => {
  loading.stop();
  if (err) {
    console.log('部署失败');
    throw err;
  } else {
    console.log('部署成功');
  }
});

console.log(path.resolve(config.LOCAL_SYNC_DIR));
