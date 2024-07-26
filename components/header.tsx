import Link from 'next/link';

const HeaderLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link
      style={{
        padding: '10px',
        backgroundColor: 'lightblue',
        color: 'black',
        textDecoration: 'none',
      }}
      href={to}
    >
      {text}
    </Link>
  );
};

const Header = () => {
  return (
    <header
      style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}
    >
      <HeaderLink to="/" text="Home" />
      <HeaderLink to="/auth/profile" text="Profile" />
    </header>
  );
};

export default Header;
