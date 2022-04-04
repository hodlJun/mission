import { Link } from 'react-router-dom';
import classes from '../Styles/Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
      <div>
        <button>
          <Link to="/">Pool Info</Link>
        </button>

        <button>
          <Link to="txs">Transaction Info</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
