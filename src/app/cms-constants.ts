export const CmsConstants = {
  mobexp: '^((\\+91-?)|0)?[0-9]{10}$',
  users: [
    { id: 1, type: 'Customer' },
    { id: 2, type: 'Employee' },
    { id: 3, type: 'Public' },
  ],
  blocks: [
    { url: 'event?api/public/events', name: 'event', apiName: 'event' },
    { url: 'article?api/public/resources/articles', name: 'article', apiName: 'articles' },
    { url: 'blog?api/public/resources/blogs', name: 'blog', apiName: 'blogs' },
    { url: 'video?api/public/resources/videos', name: 'video', apiName: 'videos' },
    {
      url: 'whitepaper?api/public/resources/whitepapers',
      name: 'whitepaper',
      apiName: 'white papers',
    },
    {
      url: 'casestudy?api/public/resources/case-studies',
      name: 'casestudy',
      apiName: 'case studies',
    },
    { url: 'news?api/public/news', name: 'news', apiName: 'news' },
    { url: 'testimonial?api/public/resources/testimonials', name: 'testimonial', apiName: 'testimonials' },
  ],
  HomeSequences: [2, 3, 4, 5, 6, 7, 8, 9],
  HomeSequencesBanner: [1, 2, 3],
  HomeSequencesBannerBlock: [1, 2, 3, 4, 5, 6, 7],
  alphabetexp: /^[a-zA-Z][a-zA-Z\s]*$/,
};
