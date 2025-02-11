import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

export default NotFound;