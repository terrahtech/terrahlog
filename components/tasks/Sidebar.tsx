interface SidebarProps {
  activeProject: string;
  setActiveProject: (initials: string) => void;
}

const initialProjects = [
  { id: "1", name: "All Projects", initials: "ALL" },
  { id: "2", name: "Fortune FINDS", initials: "FF" },
  { id: "3", name: "Jack Morgan", initials: "JM" },
  { id: "4", name: "Legacy", initials: "LG" },
  { id: "5", name: "CC App", initials: "CCA" },
  { id: "6", name: "Finance GT", initials: "FGT" },
];

const Sidebar: React.FC<SidebarProps> = ({ activeProject, setActiveProject }) => {
  return (
    <div className="w-64 bg-[var(--card)] h-screen overflow-y-auto rounded-md  max-h-[calc(100vh_-_140px)]">
      <div className="p-4 border-b">
        {/* <h2 className="text-lg font-semibold mb-1">Projects</h2> */}
        <input placeholder="Search project" className="mt-1 block w-full py-2 px-4 bg-[var(--input-bg)] border border-[var(--border)]  rounded-md focus:outline-none text-[12px]"></input>
      </div>
      <ul className="space-y-2 p-4">
        {initialProjects.map((project) => (
          <li
            key={project.id}
            className={`px-3 py-2 rounded-lg cursor-pointer ${
              activeProject === project.initials
                ? "text-white bg-[var(--primary)]"
                : "hover:bg-[var(--hover)] hover:text-white"
            }`}
            onClick={() => setActiveProject(project.initials)}
          >
            <span className="text-sm">{project.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
