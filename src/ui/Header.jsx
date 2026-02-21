import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/order/${searchQuery}`);
  }
  return (
    <header>
      <h1>Header</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search Order #"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <Link to="/">Fast Ract Pizza Co.</Link>
    </header>
  );
}

export default Header;
