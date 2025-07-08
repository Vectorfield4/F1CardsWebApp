import { Link } from '@/components/Link/Link';

import './IndexPage.css';

export function IndexPage() {
  return (
    <div>
      <div className='links'>
        <Link to='/collection'>
          My collection
        </Link>
        <Link to='/shop'>
          Shop
        </Link>
        <Link to='/marketplace'>
          Marketplace
        </Link>
      </div>
    </div>
  );
}