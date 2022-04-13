import Table from './table/Table';

const PoolTable = (props: any) => {
  const dummy = [
    {
      id: 1,
      address: '0x12nj123jnk123nk12nj321',
      date1: '2013.03.24',
      amount: 50000,
      date2: '2014.04.13',
      deposit: 50000,
    },
    {
      id: 2,
      address: '0x12nj123jnk123nk12nj321',
      date1: '2013.03.24',
      amount: 50000,
      date2: '2014.04.13',
      deposit: 50000,
    },
    {
      id: 3,
      address: '0x12nj123jnk123nk12nj321',
      date1: '2013.03.24',
      amount: 50000,
      date2: '2014.04.13',
      deposit: 50000,
    },
    {
      id: 4,
      address: '0x12nj123jnk123nk12nj321',
      date1: '2013.03.24',
      amount: 50000,
      date2: '2014.04.13',
      deposit: 50000,
    },
  ];
  return (
    <Table caption={props.caption} thead={props.thead} mini={true}>
      <tbody>
        {dummy.map((arr: any, key: any) => {
          return (
            <tr key={key}>
              <td>{arr.id}</td>
              <td>{arr.address}</td>
              <td>{arr.date1}</td>
              <td>{arr.amount}</td>
              <td>{arr.date2}</td>
              <td>{arr.deposit}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PoolTable;
