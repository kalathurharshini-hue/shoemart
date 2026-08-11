import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div>404</div>

      <h1>Page Not Found</h1>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;