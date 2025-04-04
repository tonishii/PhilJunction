import "@styles/about.css"

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h1>About This Project</h1>
        <p>This web application uses the following NPM packages and third-party libraries:</p>
        <h2>Frontend Dependencies</h2>
        <ul>
          <li>dotenv <span className="version-nos">^16.4.7</span></li>
          <li>lucide-react <span className="version-nos">^0.474.0</span></li>
          <li>moment <span className="version-nos">^2.30.1</span></li>
          <li>react <span className="version-nos">^18.3.1</span></li>
          <li>react-dom <span className="version-nos">^18.3.1</span></li>
          <li>react-markdown <span className="version-nos">^9.0.3</span></li>
          <li>react-router <span className="version-nos">^7.1.4</span></li>
          <li>react-toastify <span className="version-nos">^11.0.5</span></li>
          <li>vite <span className="version-nos">^6.0.5</span></li>
        </ul>
        <h2>Linting & Tooling</h2>
        <ul>
          <li>eslint <span className="version-nos">^9.17.0</span></li>
          <li>eslint-plugin-react-hooks <span className="version-nos">^5.0.0</span></li>
          <li>eslint-plugin-react-refresh <span className="version-nos">^0.4.16</span></li>
          <li>globals <span className="version-nos">^15.14.0</span></li>
          <li>typescript-eslint <span className="version-nos">^8.18.2</span></li>
        </ul>
        <h2>Backend Dependencies</h2>
        <ul>
          <li>bcrypt <span className="version-nos">^5.1.1</span></li>
          <li>connect-mongo <span className="version-nos">^5.1.0</span></li>
          <li>cors <span className="version-nos">^2.8.5</span></li>
          <li>express <span className="version-nos">^4.21.2</span></li>
          <li>express-session <span className="version-nos">^1.18.1</span></li>
          <li>fs <span className="version-nos">^0.0.1-security</span></li>
          <li>mongoose <span className="version-nos">^8.12.0</span></li>
          <li>multer <span className="version-nos">^1.4.5-lts.1</span></li>
          <li>typescript <span className="version-nos">^5.8.2</span></li>
          <li>nodemon <span className="version-nos">^3.1.9</span></li>
          <li>ts-node <span className="version-nos">^10.9.2</span></li>
        </ul>
        <h2>Type Definitions</h2>
        <ul>
          <li>@types/bcrypt <span className="version-nos">^5.0.2</span></li>
          <li>@types/cors <span className="version-nos">^2.8.17</span></li>
          <li>@types/express <span className="version-nos">^5.0.0</span></li>
          <li>@types/express-session <span className="version-nos">^1.18.1</span></li>
          <li>@types/multer <span className="version-nos">^1.4.12</span></li>
          <li>@eslint/js <span className="version-nos">^9.17.0</span></li>
          <li>@types/node <span className="version-nos">^22.12.0</span></li>
          <li>@types/react <span className="version-nos">^18.3.18</span></li>
          <li>@types/react-dom <span className="version-nos">^18.3.5</span></li>
          <li>@vitejs/plugin-react <span className="version-nos">^4.3.4</span></li>
        </ul>
      </div>
    </div>
  );
}
