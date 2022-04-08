import Dayjs from 'dayjs';

export const convertToDate = (_date: any) => {
  const result = new Date(parseInt(_date) * 1000).toLocaleDateString('ko-KR', {
    dateStyle: 'medium',
  });
  return result;
};

export const dayDiff = (_endDate: any, _startDate: any) => {
  const end = Dayjs(_endDate * 1000).format('YYYY-MM-DD');
  const start = Dayjs(_startDate * 1000).format('YYYY-MM-DD');
  const diff = Dayjs(end).diff(start, 'day');

  return diff;
};
