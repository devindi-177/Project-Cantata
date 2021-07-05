import React from "react";
import { useParams } from "react-router-dom";
import SideNav from "./Components/SideNav";
import Dashboard from "./Components/Dashboard";
import ReportedPosts1 from "./Components/ReporedPosts1";
import TopNav from "./Components/TopNav";

function AdminPage() {

    let { subpath } = useParams();

    return (
        <div><TopNav />
            <div class="columns">
                <div class="column is-2">
                    <SideNav />
                </div>
                <div class="column is-10">
                    
                    {subpath === "dashboard" && <Dashboard />}
                    {subpath === "reportedposts1" && <ReportedPosts1 />}
                </div>

            </div>

        </div>

    )
}

export default AdminPage;