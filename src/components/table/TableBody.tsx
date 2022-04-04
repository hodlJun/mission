import classes from '../../Styles/Table.module.css';

const TableBody = (props: any) => {
  return (
    <tr key={props.bkey} className={classes.row}>
      {props.tbody.map((arr: any, key: any) => {
        return <td key={key}>{arr}</td>;
      })}
    </tr>
  );
};

export default TableBody;
