import NavBar from "../components/core/NavBar";
import { Settings2, SearchX, CookieIcon } from "lucide-react";
import { Sidebar, SidebarItem } from "../components/core/Sidebar";
import { useState } from "react";
import {
  ConfigurationsMain,
  InterviewQuestionsMain,
} from "../components/core/SidebarMainArea";
import JobsMain from "../components/core/JobsMain";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("Configurations");
  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<Settings2 />}
            text="Configurations"
            active={activeSection === "Configurations"}
            onClick={() => setActiveSection("Configurations")}
          />
          <SidebarItem
            icon={<SearchX />}
            text="Jobs"
            active={activeSection === "Jobs"}
            onClick={() => setActiveSection("Jobs")}
          />
          <SidebarItem
            icon={<CookieIcon />}
            text="Interview Questions"
            active={activeSection === "Interview Questions"}
            onClick={() => setActiveSection("Interview Questions")}
          />
          {/* Add more SidebarItem components as needed */}
        </Sidebar>
        <main className="flex-1">
          {activeSection === "Configurations" && <ConfigurationsMain />}
          {activeSection === "Jobs" && <JobsMain />}
          {activeSection === "Interview Questions" && <InterviewQuestionsMain />}
          {/* Add more main areas for other sections */}
        </main> 
      </div>

      {/* <NavBar />
      <div className="flex justify-center items-center h-screen">
        <Switch size="lg">
            ChatGPT Evaluation
        </Switch>
      </div> */}
    </>
  );
}
