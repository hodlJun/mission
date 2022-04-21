import Table from './table/Table';

const PoolTable = (props: any) => {
  return (
    <Table caption={props.caption} thead={props.thead} mini={true}>
      <tbody>
        {props.td.map((arr: any, key: any) => {
          console.log(arr);
          return (
            <tr key={key}>
              <td>{key}</td>
              <td style={{ textAlign: 'left' }}>{arr.fromaddress}</td>
              <td>{arr.depositdate}</td>
              <td>{arr.depositamount}</td>
              <td>{arr.withdrawdate}</td>
              <td>{arr.withdrawamount}</td>
              <td>{arr.stakingfee}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PoolTable;
