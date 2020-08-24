import request from '../../utils/request';
type Patents = {
  no?: number;
  size?: number;
  sort?: string;
  category?: string;
  subCategory?: string;
  certStatus?: string;
  orderBy?: string;
  stockStatus?: string;
  type?: string;
  word?: string;
};
type RecommendPatents = {
  no?: number;
  size?: number;
  sort?: string;
  categoryShortName: string;
  orderBy?: string;
};
export const getPatents = (params?: Patents) => {
  return request({
    params: params,
    url: '/pub/api/v1/patent',
    method: 'get',
  });
};

export const getRecommendPatents = (params?: RecommendPatents) => {
  return request({
    params: params,
    url: '/pub/api/v1/patent/recommend/page',
    method: 'get',
  });
};
