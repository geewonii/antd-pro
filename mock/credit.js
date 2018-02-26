// import { getUrlParams } from './utils';

const getCreditData = [
  {
    id: '1',
    nav: {
      navUrl: 'https://www.phonelee.com/Content/new/newimages/security.jpg',
      links: '/credit',
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
    countdown: new Date().getTime() + 100000,
    residue: '635000',
  },
];

export function getCredit(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  // const params = getUrlParams(url);
  // const type = params.key;
  // res.send({ key: type });

  const result = { getCreditData };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getCredit,
};

