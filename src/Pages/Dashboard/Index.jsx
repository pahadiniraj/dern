import React from "react";
import CartDatastats from"../../Components/CartDatastats"
import { FaTicketAlt } from "react-icons/fa";
import useDashboard from "../../CustomHooks/dashboard";
import { GiAutoRepair } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const Index = () => {

  const { dashboardList, setdashboardList, isLoading, error, fetchDashboardLists } =  useDashboard();
  console.log(dashboardList);

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

         <CartDatastats
         title={`Quoatitions List`}
         total={dashboardList.quoatitionsList}
         rate={dashboardList.percentages + "%"}
         levelCheck={dashboardList.quoatitionsList > 0 ? true : false}
         >
          <div>
          <FaTicketAlt color="green" size={20} />
          </div>
         </CartDatastats>

         <CartDatastats
         title={`Repair List`}
         total={dashboardList.repairList}
         rate={dashboardList.repairPercentage + '%'}
         levelCheck={dashboardList.repairList > 0 ? true : false}
         >
          <div>
          <GiAutoRepair color="green" size={20} />
          </div>
         </CartDatastats>

         
         <CartDatastats
         title={`User List`}
         total={dashboardList.userList}
         rate={dashboardList.userPercentage + '%'}
         levelCheck={dashboardList.userList > 0 ? true : false}
         >
          <div>
          <FaRegUser color="green" size={20} />
          </div>
         </CartDatastats>

         <CartDatastats
         title={`SpareParts List`}
         total={dashboardList.spareList}
         rate={dashboardList.sparePercentage + '%'}
         levelCheck={dashboardList.spareList > 0 ? true : false}
         >
          <div>
          <FaComputer color="green" size={20} />
          </div>
         </CartDatastats>



      </div>
    </div>
  );
};

export default Index;
