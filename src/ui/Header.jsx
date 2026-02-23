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
      <Link to="/" className="text-sm tracking-widest sm:text-base">
        Fast React Pizza Co.
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Order #"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:text-base sm:focus:w-72"
        />
      </form>
      <Username />
    </header>
  );
}

export default Header;
