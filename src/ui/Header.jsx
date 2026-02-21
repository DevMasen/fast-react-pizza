import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Username from '../features/user/Username';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/order/${searchQuery}`);
  }
  return (
    <header className="border-b border-stone-500 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Order #"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <Link to="/" className="tracking-widest">
        Fast Ract Pizza Co.
      </Link>
      <Username />
    </header>
  );
}

export default Header;
