import '../src/styles/tailwind.css';
import '../src/styles/ant.less';
import '../src/index.less';
import theme from '!!raw-loader!../src/styles/theme.less';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  customizeAntdTheme: {
    modifyVars: theme ,
  }
}