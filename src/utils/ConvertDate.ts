import Dayjs from 'dayjs';

export const convertToDate = (_date: any) => {
  const result = Dayjs(_date * 1000).format('YYYY-MM-DD'); // yyyy-mm-dd
  return result;
};

export const dayDiff = (_endDate: any, _startDate: any) => {
  const end = Dayjs(_endDate * 1000).format('YYYY-MM-DD');
  const start = Dayjs(_startDate * 1000).format('YYYY-MM-DD');
  const diff = Dayjs(end).diff(start, 'day');

  return diff;
};

export const timestampHelper = (_date: any) => {
  const result = _date.toString().includes('-')
    ? _date.replaceAll('-', '.').split('T')[0]
    : convertToDate(_date).replaceAll('-', '.');

  return result;
};
