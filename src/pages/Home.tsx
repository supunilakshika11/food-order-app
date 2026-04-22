import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>🍔 Food Ordering System</h1>
      <p>Welcome to Home Page</p>

      <Link to="/foods">
        <button>Go to Food List</button>
      </Link>
    </div>
  );
}