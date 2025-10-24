import React, { useContext } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { MyContext } from "../../App";

const DashboardBox = (props) => {
  const { stats, countUser } = useContext(MyContext);

  // Nếu muốn xác định vị trí từng box theo màu để gán dữ liệu:
  const getTitleAndValue = () => {
    const color = props.color?.[0];

    if (color === "#1da256") return { title: "Total Users", value: countUser };
    if (color === "#c012e2") return { title: "Total Price", value: stats.totalPrice || 0 };
    if (color === "#2c78e5") return { title: "Total Products", value: stats.totalProducts || 0 };
    if (color === "#e1950e") return { title: "Featured Products", value: stats.totalFeatured || 0 };

    return { title: "Statistic", value: 0 };
  };

  const { title, value } = getTitleAndValue();

  return (
    <div
      className="dashboard-box"
      style={{
        backgroundImage: `linear-gradient(to right,${props.color?.[0]},${props.color?.[1]})`,
      }}
    >
      {props.grow ? (
        <span className="chart">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart">
          <TrendingDownIcon />
        </span>
      )}

      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">{title}</h4>
          <span className="text-white">{value}</span>
        </div>
        <div className="ml-auto">
          <span className="icons">{props.icon}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
