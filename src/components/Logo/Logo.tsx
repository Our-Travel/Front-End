import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <img src="/assets/ourtravel.png" alt="OurTravel" />
    </Link>
  );
}
