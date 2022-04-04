import classes from '../../Styles/Table.module.css';
import TableHead from '../table/TableHead';

const Table = (props: any) => {
  return (
    <div>
      <table className={classes.table}>
        <caption>{props.caption}</caption>
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
    </div>
  );
};

export default Table;
