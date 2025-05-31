import { useState } from "react";
import Layout from "@/components/Layout";
import ProjectRow from "@/components/projects/ProjectRow";
import { Project } from "interfaces/project";
import { HiOutlineSearch } from "react-icons/hi";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Accido Dried fruit/vegetable",
      members: [
        { name: "Nithul kp", color: "#4f46e5" },
        { name: "Prashanth v", color: "#059669" }
      ],
      notes: "",
    },
    {
      id: "2",
      name: "Fortune FINDS",
      members: [
        { name: "Sagar os", color: "#f59e0b" }
      ],
      notes: "",
    }
  ]);

  const allMembers = [
    { name: "Nithul kp", color: "#4f46e5" },
    { name: "Prashanth v", color: "#059669" },
    { name: "Sagar os", color: "#f59e0b" },
    { name: "Arun haridas", color: "#3b82f6" },
    { name: "Gokul", color: "#10b981" },
    { name: "Vyshak", color: "#8b5cf6" },
    { name: "Anu", color: "#ec4899" },

  ];


  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<{ name: string; color: string }[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectNotes, setNewProjectNotes] = useState("");


  const filteredMembers = allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) &&
      !selectedMembers.some((s) => s.name === m.name)
  );

  const addMember = (member: { name: string; color: string }) => {
    setSelectedMembers((prev) => [...prev, member]);
    setMemberSearch("");
  };

  const removeMember = (name: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.name !== name));
  };

  return (
    <Layout>
      <div className="mb-5 flex justify-between items-center gap-2">
        <h1 className="text-xl font-bold capitalize">Projects</h1>
        <div className="flex justify-between items-center gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-[var(--text-light]" />
            </span>
            <input
              type="text"
              className="py-2 pl-10 pr-4 w-full rounded bg-[var(--card)] focus:outline-none"
              placeholder="Search project"
            />
          </div>

          <button
            onClick={() => setShowOffcanvas(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-opacity-90 transition min-w-[120px]"
          >
            + Add Project
          </button>
        </div>
      </div>

      <div className="bg-[var(--card)] shadow rounded-md overflow-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium uppercase">Project</th>
              <th className="text-left py-3 px-6 text-sm font-medium uppercase">Members</th>
              <th className="text-left py-3 px-6 text-sm font-medium uppercase">Notes</th>
            </tr>
          </thead>
          <tbody>

            {projects.map(project => (
              <ProjectRow
                key={project.id}
                project={project}
                allMembers={allMembers}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Offcanvas Panel */}
      <div
        className={`fixed inset-0 z-[500] bg-black bg-opacity-50 transition-opacity duration-300 ${showOffcanvas ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setShowOffcanvas(false)}
      >
        <div
          className={`
            fixed right-0 top-0 h-full w-full max-w-md bg-[var(--card)] shadow-lg transform transition-transform duration-300 ease-in-out
            ${showOffcanvas ? "translate-x-0" : "translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Project</h2>
              <button
                onClick={() => setShowOffcanvas(false)}
                className="text-gray-500  text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newProjectName) return;

                const newProject: Project = {
                  id: (projects.length + 1).toString(),
                  name: newProjectName,
                  members: selectedMembers,
                  notes: newProjectNotes,
                };

                setProjects([...projects, newProject]);
                setNewProjectName("");
                setNewProjectNotes("");

                setSelectedMembers([]);
                setShowOffcanvas(false);
              }}
              className="flex flex-col gap-4 flex-1"
            >
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  placeholder="Enter project name"
                  className="w-full p-2 border rounded bg-[var(--card)]"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="project-note" className="block text-sm font-medium mb-1">
                  Note
                </label>
                <textarea
                  id="project-note"
                  placeholder="Enter project name"
                  className="w-full p-2 border rounded bg-[var(--card)]"
                  value={newProjectNotes}
                  onChange={(e) => setNewProjectNotes(e.target.value)}
                />
              </div>


              {/* Member Selector */}
              <div className="relative">
                <label htmlFor="member-search" className="block text-sm font-medium mb-1">
                  Add Member
                </label>
                <input
                  id="member-search"
                  type="text"
                  placeholder="Search member"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full p-2 border rounded bg-[var(--card)]"
                />
                {memberSearch && (
                  <ul className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-y-auto w-full">
                    {filteredMembers.map((member, idx) => (
                      <li
                        key={idx}
                        onClick={() => addMember(member)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {member.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-2 flex-wrap mt-2">
                {selectedMembers.map((member, idx) => (
                  <span
                    key={idx}
                    className="text-xs flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full"
                  >
                    <span
                      className="w-4 h-4 rounded-full inline-block"
                      style={{ backgroundColor: member.color }}
                    ></span>
                    {member.name}
                    <button
                      type="button"
                      onClick={() => removeMember(member.name)}
                      className="text-gray-500 ml-1 hover:text-black"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <button
                type="submit"
                className="mt-auto bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
