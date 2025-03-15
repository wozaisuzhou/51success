const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

// 存储汇率数据的文件路径
const dataFilePath = path.join(process.cwd(), 'data', 'exchange-rates.json');

// 确保 data 目录存在
const ensureDataDir = async () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
};

// 查询汇率 API 并保存到 JSON 文件
const updateExchangeRates = async () => {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('API request failed');
    }

    const rates = {
      timestamp: data.time_last_update_utc,
      base: 'USD',
      rates: {
        USD: data.rates.USD,
        CNY: data.rates.CNY,
        EUR: data.rates.EUR,
        // 添加其他需要的货币
      },
    };

    await ensureDataDir();
    await fs.writeFile(dataFilePath, JSON.stringify(rates, null, 2));
    console.log('Exchange rates updated at', new Date().toISOString());
  } catch (error) {
    console.error('Failed to update exchange rates:', error);
  }
};

// 每两小时运行一次（Cron 表达式：0 */2 * * *）
cron.schedule('0 */2 * * *', () => {
  console.log('Running exchange rate update job...');
  updateExchangeRates();
});

// 启动时立即运行一次
updateExchangeRates();

module.exports = { updateExchangeRates };