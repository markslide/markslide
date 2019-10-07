# MarkSlide

![GitHub release (latest by date)](https://img.shields.io/github/v/release/markslide/markslide)
![GitHub Release Date](https://img.shields.io/github/release-date/markslide/markslide)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fmarkslide.now.sh)
![GitHub top language](https://img.shields.io/github/languages/top/markslide/markslide)
![GitHub](https://img.shields.io/github/license/markslide/markslide)


[中文](/#) | [English](/#)

---

我们要做一个**非常规**的常规展示工具。

## 为什么你应该关注 `Markslide`

像 `记事本` 一样输入文字，不用动一下鼠标，顷刻间一份精美的PPT出现在你眼前。甚至目录和页面导航全部自动生成，点击“播放”即可全屏展示。

从此常规PPT的制作从原本几小时，缩短到仅仅5秒钟*。

> *. **常规** 用途指的是例会展示、课堂展示、兴趣交流等等，相对专业用途而言。

如果你不想关注下面的介绍，你可以先 [体验一下](https://markslide.now.sh)。

---

## 目录

- [新功能](#新功能)
- [我们为什么做 `Markslide`](#我们为什么做-Markslide)
- [PPT 是什么](#PPT-是什么)
- [设计哲学](#设计哲学)
- [加入我们](#加入我们)
- [Q&A](#QA)

---

## 新功能

[`返回目录`](#目录)

我们专门为新功能开了一个 issue，请 **[移步](https://github.com/markslide/markslide/issues/51)** 进行投票，让我们知道你想要什么功能。

> 下面的各列表展示自 v1.0.0 开始的功能

### 已发布

- `v1.2` 功能1
- `v1.1` 功能2

### WIP

- `v1.3` 功能1

### 待定

- 功能1
- 功能2
- 功能3

---

## 我们为什么做 `Markslide`

[`返回目录`](#目录)

曾经我们都在用什么做展示？PowerPoint、Keynote、Prezi 等等。他们能帮我们做出非常棒的PPT，但是我们常常遇到类似的问题：

 - **找不到好看的模板。** 即使找到了，一页页修改文字图片再排版也省不下太多时间；
 - **牵一发动全身。** 想改下标题的格式或者位置，要去每一页修改；
 - **内容改了目录导航太麻烦。** 改了内容忘记改目录，导航全部都要动；
 - **糟糕的跨平台体验。** Keynote只能在Mac或者使用iCloud上播放。PPT即使用Keynote能打开，格式可能也全乱了。（打死不在Mac上装Office全家桶，也不会为了全家桶装windows的虚拟机）
 - **传递超慢。** 纵使现在有例如WPS的云服务，但是体验依然不佳。平时传递PPT一打包，几十兆大小，发送5分钟，性致勃勃女朋友都等的睡着了。

小庄同学业余时间是一名十流PPT设计师，从事专业展示数年时间，定制PPT套均数千元。在经手了许多各种各样的PPT，也看了太多非专业同学做的PPT之后，深刻反思：

---

## PPT 是什么

[`返回目录`](#目录)

首先当然是为了展示想法。

为什么不把 Word 文档直接全屏一下讲给大家听？因为这样出现了太多东西，一下子注意力集中不过来，跟不上演讲者的引导。

我个人的原则是页面上字能少则少，嘴讲的能多则多。我也见过许多喜欢把PPT上堆的密密麻麻的演讲者（当然咨询报告这类特殊展示除外），但是观众往往盯着看文字内容，而没机会聚焦到展示上。这就又失去了展示的意义。

那我们能不能让它重点始终集中在展示上？少操心一些样式、排版等等和展示想法无关的工作上？

**不行。**

好多同志不同意：白底黑字的PPT谁会看？

没有平面基础的同学就去找模板了。但是模板格式、位置还要自己调整，一圈下来没省下力气，反而花了更多的时间。最最关键的是，好看的模板不免费，免费的模板不好看。

那么问题就来了。有没有个“智能模板”？

当然是可以有的。怎么解释都不如你亲自[试一试](https://markslide.now.sh)。

我们希望 `Markslide` 能帮你真正地把注意力重新放到值得你操心的内容上来，而少操心一些无关的东西。但是展示效果又比传统的PPT制作要好得多。

---

## 设计哲学

[`返回目录`](#目录)

### 每页只讲一件事情
我们考虑过是否要把每页做成可以垂直滚动的样式，来让一页中出现更多内容（当然我们也完全可以做到）。经讨论后放弃了。

### 尽可能少的客制化
`MarkSlide` 将为你包办一切，包括样式、导航和动画。你需要做的只是选择你喜欢的模板和颜色。如果暂时没有想要的，请大胆的给我们[开issue](https://help.github.com/cn/articles/creating-an-issue)。

### 不做专业展示
`Markslide` 不会用来制作专业展示的PPT。如果你期待未来有一天，`Markslide` 会支持发布会级别的PPT展示，那这种想法是不切实际的。放弃了客制化的快速设计成型只会出现在非正式场合（例如例会展示、课堂展示、兴趣交流等等）。

### 把自动的东西交给工具
今后，你再也不用为了目录或者导航和内容不同步而烦恼。因为，他们都是自动生成的，不需要手动添加、删除和修改*。

### 内容和样式的分离
所有的样式尽可能做到“计算化”。长标题这样好看，短标题那样好看，模板里都帮你考虑好，你只要放心输入大纲，瞬间一份优美的PPT呈现眼前。

### 跨平台性和通用性
我们希望 `Markslide` 能在任何平台、任何场合播放，而格式保持完全一致。这意味着你不用安装任何软件，你只需要一台能上网的电脑和一个浏览器即可**。而用来写大纲的 Markdown 语言（你现在看到的文档就是用它写成的），也是一种非常通用的语言，它可以直接被品类众多的第三方工具展示、修改，渲染成网页、pdf，甚至Word和Pages文档。

>  *. 自动导航和目录功能预计在1.2版本中上线。
> 
> **. 目前暂时只对Chrome做了兼容性测试。

---

## 加入我们

[`返回目录`](#目录)

我们非常欢迎能力兴趣具佳的朋友加入我们。如果你是：

 - （半）职业设计师，有较多的平面或者PPT制作经验；
 - 经验丰富的（React）开发；
 - 厉害的产品经理

 如果你对 `Markslide` 传递的理念有兴趣，欢迎联系我们。
 
 > Telegram：*****
 > 
 > Email: *******

---

## Q&A

[`返回目录`](#目录)

### 会考虑使用人工智能CAD吗？

会，我们也有能力实现。但是近期一定不考虑实现。

