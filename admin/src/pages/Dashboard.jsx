import React from "react";

const Dashboard = () => {
    return (
        <div px-5>
            <div className="top">
                <div className="dashboard-nav w-full bg-red-500 flex justify-between">
                    <div className="divs min-w-[20%] bg-blue-500 rounded p-1">
                        <p>Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                     <div className="divs w-[20%] bg-blue-500 rounded">
                        <p>Lorem ipsum dolor sit amet.
                        </p>
                    </div> <div className="divs w-[20%] bg-blue-500 rounded">
                        <p>Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bottom"></div>
        </div>
    );
};

export default Dashboard;