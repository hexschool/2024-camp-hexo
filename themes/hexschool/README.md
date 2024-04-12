# hexschool

因 2024 軟體工程師體驗營誕生的 Hexo 主題

[![Required Hexo version](https://img.shields.io/badge/hexo-%3E=7.0.0-blue?style=flat-square&logo=hexo)](https://hexo.io)

## 套用主題

將專案根目錄下 `_config.yml` 中的 `theme` 設為 `hexschool`

``` diff
_config.yml
- theme: some-theme
+ theme: hexschool
```

## 主題相關設定（Configuration）

在專案根目錄下的 `_config.hexschool.yml` 直接修改變數的值

所有的變數如下：

``` yml
# Header
menu:
  首頁: /
  作品集: /collection
  服務項目: /service
  部落格: /blog
  聯絡我: /#

# Blog
blog_title: 部落格
blog_subtitle: 不定期分享技術文章

# Blog pagination
# path: Root path for your blogs index page. (default = '/blog')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
blog_generator:
  per_page: 6
  path: /blog
  order_by: -date

# Miscellaneous
favicon: /images/logo.svg
```

## Layout
檔案位於 `layout` 底下

結構說明
```
├── _partial             元件
│   ├── blog-post.ejs       部落格頁的文章元件
│   ├── footer.ejs          表尾元件
│   ├── head.ejs            統一所有頁面 head 標籤的元件 
│   ├── header.ejs          表頭元件
│   └── sidebar.ejs         側邊欄元件
├── blog.ejs             部落格頁 layout
├── collection.ejs       作品集頁 layout
├── index.ejs            首頁 layout
├── layout.ejs           所有頁面的 layout
├── post.ejs             文章內頁 layout
└── service.ejs          服務項目頁 layout
```

## 靜態檔案
檔案位於 `source` 底下

結構說明
```
├── css                 SCSS 編譯後的 CSS 檔案存放處
│   └── all.min.css       編譯後的 CSS 檔案
├── images              存放與主題相關圖片
├── scss                存放 SCSS 檔案
│   ├── _colors.scss       產生自訂顏色的 class
│   ├── _custom.scss       覆蓋以及自訂樣式
│   ├── _variable.scss     主要的變數
│   └── all.scss           進入點
└── js
    └── swiper.js       swiper config
```

## 外掛（Plugins）
該主題有 3 個外掛，目前在使用的只有 2 個

檔案位於 `scripts` 底下

### blogGenerator
用來創建所有的部落格分頁

位於 `scripts/pagination.js` 底下

使用的變數為：
``` yml
blog_generator:
  per_page: 6      # 預設一頁至多顯示 6 筆文章
  path: /blog      # 以 /blog 為路徑產生分頁
  order_by: -date  # 預設為 -date（從新到舊，降冪排列），改為 date 則為從舊到新，升冪排列
```

若需要修改，建議直接在 `_config.hexschool.yml` 加入相應的變數修改

### pagination
以 paginator 為原型的客製化外掛，用以產生分頁

位於 `scripts/pagination.js` 底下

除調整樣式外，不建議調整其設定

#### 使用方式
```ejs
<%- pagination(options) %>
```

**範例**
```
<%- pagination({
  current: page.current,    // 當前頁數
  total: page.total         // 總頁數
}) %>
```

### list_blog_posts（deprecated）
原本用來產生部落格頁面文章以 list_posts 為原型寫的外掛，後以 blogGenerator 取代

目前未使用

位於 `scripts/list_blog_posts.js` 底下