// 数独小程序入口文件
const themeModule = require('./utils/theme.js');

App({
  onLaunch() {

    themeModule.applySystemTheme(themeModule.getCurrentTheme());
  },

  onShow() {
    console.log('小程序显示');
    themeModule.applySystemTheme(themeModule.getCurrentTheme());
  },

  onHide() {
    console.log('小程序隐藏');
  }
});

