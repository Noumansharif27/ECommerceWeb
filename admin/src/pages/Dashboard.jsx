import React from "react";

const Dashboard = () => {
  return (
    <div px-5>
      <div className="top">
        <div className="dashboard-nav w-full flex justify-between">
          <div className="divs min-w-[30%] bg-slate-100 rounded-md p-3">
            <p className="text-gray-400 text-sm">Weekly Sale</p>
            <b className="text-md">$12,233</b>
            <hr className="text-gray-300 my-2" />
            <div className="flex gap-2">
              <span className="text-sm text-green-500">+60%</span>
              <span className="text-sm text-gray-400">Then last week</span>
            </div>
          </div>

          <div className="divs min-w-[30%] bg-slate-100 rounded-md p-3">
            <p className="text-gray-400 text-sm">Weekly Sale</p>
            <b className="text-sm">$12,233</b>
            <hr className="text-gray-300 my-2" />
            <div className="flex gap-2">
              <span className="text-sm text-green-500">+60%</span>
              <span className="text-sm text-gray-400">Then last week</span>
            </div>
          </div>

          <div className="divs min-w-[30%] bg-slate-100 rounded-md p-3">
            <p className="text-gray-400 text-sm">Weekly Sale</p>
            <b className="text-sm">$12,233</b>
            <hr className="text-gray-300 my-2" />
            <div className="flex gap-2">
              <span className="text-sm text-green-500">+60%</span>
              <span className="text-sm text-gray-400">Then last week</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Dashboard;
