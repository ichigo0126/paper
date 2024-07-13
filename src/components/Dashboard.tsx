import Home from "./Home";

interface DashBoardProps {
  user: {
    email: string;
  }
}

const Dashboard: React.FC<DashBoardProps> = ({ user }) => {
  return (
    <div>
      <Home />
    </div>
  );
};
export default Dashboard;
