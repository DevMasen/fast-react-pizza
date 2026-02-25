import { Link } from 'react-router';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300  focus:ring-offset-1 disabled:cursor-not-allowed ';

  const styles = {
    primary: base + ' text-sm px-4 py-3 md:px-6 md:py-4',
    small: base + ' text-xs px-2 py-2 sm:text-sm sm:px-4 sm:py-2.5  md:px-5 md:py-3',
    round: base + ' px-3 py-1',
    secondary:
      'text-sm inline-block rounded-full border-2 border-stone-400 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-400 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 focus:text-stone-800 hover:text-stone-800',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
