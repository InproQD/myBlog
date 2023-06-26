module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": './tsconfig.json', // 指定 tsconfig.json 文件的路径
    "ecmaFeatures": {
      jsx: true,
    },
    "parser": '@typescript-eslint/parser',
  },
  "settings": {
    "react": {
      "version": "18.2.0" // 替换为你使用的 React 版本
    }
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": 'off',
    "no-debugger": 'off', // 允许断点调试
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off", // 这个规则的作用是检查 "useEffect" 钩子中依赖项数组是否包含所有需要的变量或函数
  }
}
