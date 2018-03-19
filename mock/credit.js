// import { getUrlParams } from './utils';

const getCreditData = {
  nav: {
    navUrl: 'https://www.phonelee.com/Content/new/newimages/security.jpg',
    links: '/previous',
  },
  title: '汇理财-丰利财',
  business: '业务编号：WYC148-20171106',
  deal: {
    text: '汇理财投资协议',
    links: '/credit',
  },
  earnings: [
    {
      id: '1',
      title: '3.5%',
      tips: '预期年化收益',
    },
    {
      id: '2',
      title: '6个月',
      tips: '项目期限',
    },
    {
      id: '3',
      title: '100万',
      tips: '项目总额',
    },
  ],
  progress: 35,
  explain: [
    {
      id: '1',
      title: '还款方式： 按月付息，到期还本',
    },
    {
      id: '2',
      title: '预期年化收益',
    },
    {
      id: '3',
      title: '预期年化收益',
    },
  ],
  countdown: new Date().getTime() + 20000000,
  residue: '635000',
  one: [
    {
      id: '1',
      title: '名称',
      description: '新手专享15天20180313-2',
    },
    {
      id: '2',
      title: '工具介绍',
      description: '轻松投为积木盒子平台新推出的一款高效、自动投标工具，经由用户授权后通过系统为用户完成自动投标，不仅满足了用户方便快捷地进行投标的需求，进而达到更加有效有进行资金规划的目的。使用本工具所投产品目标利率不代表实际收益，用户需自行承担资金出借的风险与责任。市场有风险，投资需谨慎。',
    },
    {
      id: '3',
      title: '投标范围',
      description: '根据用户加入时选定的产品要素为依据，对符合要求的融资项目进行自动投标。为避免打扰用户，回款信息不以短信方式通知但在用户轻松投账户内可查询。',
    },
  ],
  two: [
    {
      key: '1',
      name: '135******65(汇理财)',
      age: '25,404.00',
      address: '10.80%',
      dd: '2018年03月12日 20:03:28',
      ee: '自动投标',
    },
  ],
};

export function getCredit(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  // const params = getUrlParams(url);
  // const type = params.key;
  // res.send({ key: type });

  const result = getCreditData;

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getCredit,
};

