import classes from '../../Styles/Table.module.css';
import TableHead from '../table/TableHead';

const Table = (props: any) => {
  return (
    <>
      <table
        className={classes.table}
        style={{
          width: props.mini ? '70%' : '100%',
        }}
      >
        {props.caption && <caption>{props.caption}</caption>}
        <thead>
          <tr>
            {props.thead.map((arr: any, index: any) => {
              return (
                <TableHead
                  key={arr.id}
                  width={props.thead[index].width}
                  title={arr.title}
                ></TableHead>
              );
            })}
          </tr>
        </thead>
        {props.children}
      </table>
    </>
  );
};

export default Table;
