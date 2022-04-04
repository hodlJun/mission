const TableHead = (props: any) => {
  return <th style={{ width: props.width + '%' }}>{props.title}</th>;
};

export default TableHead;
