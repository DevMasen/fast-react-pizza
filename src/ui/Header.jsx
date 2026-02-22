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
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast Ract Pizza Co.
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Order #"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-32 rounded border border-stone-800 px-2 md:w-44"
        />
      </form>
      <Username />
    </header>
  );
}

export default Header;
