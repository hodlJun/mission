const TableBody = (props: any) => {
  return (
    <tr key={props.bkey}>
      {props.tbody?.map((arr: any, key: any) => {
        return <td key={key}>{arr}</td>;
      })}
    </tr>
  );
};

export default TableBody;
