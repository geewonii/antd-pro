
const getHomeData = [
  {
    carouselList: [
      {
        id: '1',
        title: '1',
        links: '/',
        imgPC: 'https://dn-miracle-photo.qbox.me/1d6823c3-f706-4554-8824-7584a7e0b84b',
        imgMobile: 'http://img.zcool.cn/community/015b6d5a695e83a80120a123cf044d.png',
      },
      {
        id: '2',
        title: '2',
        links: '/home',
        imgPC: 'https://dn-miracle-photo.qbox.me/838c9dfa-eeed-4b10-977e-ac4bf4ed8dab',
        imgMobile: 'http://img.zcool.cn/community/0140cd5a695ecca80121346600ae21.JPG@800w_1l_2o_100sh.jpg',
      },
      {
        id: '3',
        title: '3',
        links: '/home',
        imgPC: 'https://dn-miracle-photo.qbox.me/18be680c-7f6c-4edd-b528-7f74737ef3d9',
        imgMobile: 'http://img.zcool.cn/community/01c2a95a695ee7a80120a123b3c3eb.png',
      },
    ],
    ItemNoticeList: {
      Id: '1',
      title: '系统公告',
      subhead: '号外号外，关于丰利金服春节不放假通知。',
      moreLink: '/404',
      children: [{
        id: '3',
        links: '/',
        title: '专业的实力团队',
        description: '高管团队出身于国有银行 专业专注',
        href: 'http://geewonii.top/phonelee/image/gonggao1.png',
      }, {
        id: '4',
        links: '/',
        title: '私人专属财富顾问',
        description: '1对1 交流 全面沟通 星级服务 极致体验',
        href: 'http://geewonii.top/phonelee/image/gonggao3.png',
      }, {
        id: '4',
        links: '/',
        title: '全方位风控保障',
        description: '严审客户资质 全面风控把控',
        href: 'http://geewonii.top/phonelee/image/gonggao4.png',
      }, {
        id: '4',
        links: '/',
        title: '透明规范合规体系',
        description: '响应号召 充分披露 合规合法 规范透明',
        href: 'http://geewonii.top/phonelee/image/gonggao2.png',
      }],
    },
    ItemBidList: [{
      CreditMode: '5',
      title: '汇理财 ',
      subhead: '省心最重要 ——懒人式理财 智能投标 安全安心',
      moreLink: '/',
      children: [{
        id: '1',
        links: '/',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: '丰利财',
        description: '内容内容内容内容',
        num1: 30,
        num2: 40,
        date: '2018-12-25T02:21',
        annual: 24.5,
        month: 12,
      }, {
        id: '2',
        links: '/',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: '丰利富',
        description: [{
          id: 'description1',
          text: '等额本息',
          tips: '等额本息，是指一种贷款的还款方式。等额本息是在还款期内，每月偿还同等数额的贷款(包括本金和利息)。它和等额本金是不一样的概念，虽然刚开始还款时每月还款额可能会低于等额本金还款方式的额度，但是最终所还利息会高于等额本金还款方式，该方式经常被银行使用。',
        }],
        num1: 30,
        num2: 40,
        date: '2018-12-25T02:21',
        annual: 24.5,
        month: 12,
      }, {
        id: '3',
        links: '/',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: '丰利盈',
        description: [{
          id: 'description1',
          text: '等额本息',
          tips: '等额本息，是指一种贷款的还款方式。等额本息是在还款期内，每月偿还同等数额的贷款(包括本金和利息)。它和等额本金是不一样的概念，虽然刚开始还款时每月还款额可能会低于等额本金还款方式的额度，但是最终所还利息会高于等额本金还款方式，该方式经常被银行使用。',
        }, {
          id: 'description2',
          text: '自担风险',
          tips: 'tips',
        }],
        num1: '4.633',
        num2: 40,
        date: '2018-12-25T02:21',
        annual: 24.5,
        month: 12,
      }],
    }],
    ItemBidColumnsList: [{
      id: '1',
      links: '/',
      title: '车贷宝',
      tips: '贴心最重要',
      bgtop: '#33BAFF',
      bgbottom: '#62b4ff',
      cover: 'https://www.phonelee.com/Content/new/newimages/jieyunxc.png',
      children: [
        '无抵押',
        '无担保',
        '分期购车更容易',
      ],
    }, {
      id: '2',
      links: '/',
      title: '红薪宝',
      tips: '全面最重要',
      bgtop: '#74e03b',
      bgbottom: '#affd60',
      cover: 'https://www.phonelee.com/Content/new/newimages/hxbxc.png',
      children: [
        '企业"薪”时代',
        '满足员工各种消费需求',
        '给员工最暖的福利和诚挚的帮助',
      ],
    }],
  },
];


export default {
  getHomeData,
};

