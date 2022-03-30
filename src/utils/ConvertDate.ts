import Dayjs from 'dayjs';

export const convertToDate = (date: any) => {
  return new Date(parseInt(date) * 1000).toLocaleDateString('ko-KR', {
    dateStyle: 'medium',
  });
};

export const dayDiff = (endDate: any, startDate: any) => {
  // para: unix
  const end = Dayjs(endDate * 1000).format('YYYY-MM-DD'); // unix to string yyyy-mm-dd
  const start = Dayjs(startDate * 1000).format('YYYY-MM-DD');
  const diff = Dayjs(end).diff(start, 'day');
  // console.log(diff);
  return diff;
};
