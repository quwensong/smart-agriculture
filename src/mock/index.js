import Mock from 'mockjs'

// 设置响应延时
Mock.setup({
	timeout: '200-500'//可以是整数，也可以是‘-’字符串
});

let configArray = [];

//使用webpack的require.context()遍历所有的mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
	if(key === './index.js') return;
	configArray = configArray.concat(files(key).default);
});

//注册所有的mock服务
configArray.forEach((item) => {
	for(let [path, target] of Object.entries(item)){
		const protocol = path.split('|');
		Mock.mock(new RegExp('^' + protocol[1]), protocol[0],target);
	}
})
