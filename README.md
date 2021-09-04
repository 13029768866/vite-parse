# Vue3+TS-admin

## 一、代码规范

### 1.1、editorconfig配置

```bash
# https://editorconfig.org

root = true # 文件配置位置,根目录

[*] # 所有文件适用
charset = utf-8 # 字符集utf-8
indent_style = space # 缩进风格(tab | space)
indent_size = 2 # 缩进大小
end_of_line = lf # 换行类型(lf | cr | crlf)
insert_final_newline = true # 去除行首的任意空白符
trim_trailing_whitespace = true # 始终在文件末尾插入一个新空白行

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

```

### 1.2、prettier使用

1. 创建prettier.config.js, 配置ide使用文件eslint规则

2.  添加脚本全部文件格式化

   ```bash
   "prettier": "prettier --write ."
   ```

### 1.3、eslint

1. eslintrc中extends添加本地规则解决冲突

   ```
       'plugin:prettier/recommended',
   ```

### 1.4、git husky &&  lint-staged

1. 安装 && 初始化

   ```bash
   npx husky-init && npm i
   npm i lint-staged -D
   ```

2. 设置只对 git 暂存区的 `.vue`、`.js`、`.ts` 文件执行 `eslint --fix`

   ```bash
   "lint-staged": {
     "*.{vue,js,ts}": "eslint --fix"
   },
   ```

### 1.5、git 提交规范 && 提交验证

#### 1.5.1、git提交风格

1. 安装commitizen

   ```bash
   npm i commitizen -D
   ```

2. 安装cz-conventional-changelog && 初始化

   ```bash
   npx commitizen init cz-conventional-changelog -S -D --save-exact
   ```

3. 提交指令规范

   | 值       | 描述                                                         |
   | -------- | ------------------------------------------------------------ |
   | feat     | 新增一个功能                                                 |
   | fix      | 修复一个 Bug                                                 |
   | docs     | 文档变更                                                     |
   | style    | 代码格式（不影响功能，例如空格、分号等格式修正）             |
   | refactor | 代码重构                                                     |
   | perf     | 改善性能                                                     |
   | test     | 测试                                                         |
   | build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
   | ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
   | chore    | 变更构建流程或辅助工具                                       |
   | revert   | 代码回退                                                     |

#### 1.5.2、git提交验证

1. 安装@commitlint/config-conventional @commitlint/cli

   ```bash
   npm i @commitlint/config-conventional @commitlint/cli -D
   ```

2. 创建 commitlint.config.js 文件 在项目根目录下创建 `commitlint.config.js` 文件，并填入以下内容

   ```bash
   module.exports = { extends: ['@commitlint/config-conventional'] }
   ```

3. 使用 husky 的 `commit-msg` hook 触发验证提交信息的命令
   我们使用 husky 命令在 `.husky` 目录下创建 `commit-msg` 文件，并在此执行 commit message 的验证命令。(注意：低版本npm可能创建失败)

   ```bash
   npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
   ```

   







