import { useState } from 'react';
import PoolTable from '../PoolTable';
import classes from '../../Styles/Table.module.css';
import Plus from '../../Assets/plus.png';
import Minus from '../../Assets/minus.png';

const TableBody = (props: any) => {
  const th = [
    { id: 'm0', title: 'No', width: 5 },
    { id: 'm1', title: '지갑주소', width: 25 },
    { id: 'm2', title: '입금일자', width: 10 },
    { id: 'm3', title: '입금액', width: 15 },
    { id: 'm4', title: '출금일자', width: 10 },
    { id: 'm5', title: '출금액', width: 15 },
    { id: 'm6', title: '스테이킹 수수료', width: 20 },
  ];

  const [toggle, setToggle] = useState(false);

  const handler = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <tr key={props.bkey}>
        {props.tbody?.map((arr: any, key: any) => {
          return (
            <td key={key}>
              {props.spanValue !== undefined && key === 0 ? (
                <div className={classes.pid} onClick={handler}>
                  <img
                    src={toggle ? Minus : Plus}
                    alt="Plus"
                    style={{ padding: '0.3em 0.5em 0 0.5em' }}
                  ></img>
                  {arr}
                </div>
              ) : (
                arr
              )}
            </td>
          );
        })}
      </tr>
      {toggle && (
        <tr>
          <td colSpan={props.spanValue}>
            <div className={classes['table-wrapper']}>
              <PoolTable
                className={classes.table}
                thead={th}
                td={props.userpool}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default TableBody;
