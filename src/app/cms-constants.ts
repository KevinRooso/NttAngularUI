import cronstrue from 'cronstrue';
export const CmsConstants = {
  mobexp: '^((\\+91-?)|0)?[0-9]{10}$',
  users: [
    { id: 1, type: 'Customer' },
    { id: 2, type: 'Employee' },
    { id: 3, type: 'Public' },
  ],
  blocks: [
    { url: 'event?api/public/events', name: 'event', apiName: 'event' },
    { url: 'articles?api/public/resources/articles', name: 'articles', apiName: 'articles' },
    { url: 'blogs?api/public/resources/blogs', name: 'blogs', apiName: 'blogs' },
    { url: 'videos?api/public/resources/videos', name: 'videos', apiName: 'videos' },
    {
      url: 'whitepapers?api/public/resources/whitepapers',
      name: 'whitepapers',
      apiName: 'whitepapers',
    },
    {
      url: 'casestudies?api/public/resources/case-studies',
      name: 'casestudies',
      apiName: 'case studies',
    },
    { url: 'news?api/public/news', name: 'news', apiName: 'news' },
    { url: 'testimonials?api/public/resources/testimonials', name: 'testimonials', apiName: 'testimonials' },
  ],
  HomeSequences: [2, 3, 4, 5, 6, 7, 8, 9],
  HomeSequencesBanner: [1, 2, 3],
  HomeSequencesBannerBlock: [1, 2, 3, 4, 5, 6, 7],
  alphabetexp: /^[a-zA-Z][a-zA-Z\s]*$/,

  cronJobSchedules: [
    {
      name: cronstrue.toString('0 * * ? * *'),
      cron: '0 * * ? * *',
    },
    {
      name: cronstrue.toString('0 0 * ? * *'),
      cron: '0 0 * ? * *',
    },
    {
      name: cronstrue.toString('0 0 0 * * ?'),
      cron: '0 0 0 * * ?',
    },
    {
      name: cronstrue.toString('0 0 0 * * SUN,SAT'),
      cron: '0 0 0 * * SUN,SAT',
    },
    {
      name: cronstrue.toString('0 0 0 * * MON-FRI'),
      cron: '0 0 0 * * MON-FRI',
    },
    {
      name: cronstrue.toString('0 0 0 1 * ?'),
      cron: '0 0 0 1 * ?',
    },
    {
      name: cronstrue.toString('0 0 0 31 MAR *'),
      cron: '0 0 0 31 MAR *',
    },
  ],
};
