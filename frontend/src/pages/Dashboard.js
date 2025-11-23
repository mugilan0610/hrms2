import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>HRMS Dashboard</h1>
      <nav>
        <Link to="/employees">Employees</Link> | <Link to="/teams">Teams</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
