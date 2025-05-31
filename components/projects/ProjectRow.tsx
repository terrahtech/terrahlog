import { useState, useEffect } from "react";
import { Project, Member } from "@/interfaces/project";

interface Props {
  project: Project;
  allMembers: Member[];
  onMembersUpdate?: (projectId: string, newMembers: Member[]) => void;
}

const ProjectRow = ({ project, allMembers, onMembersUpdate }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [showMemberOffcanvas, setShowMemberOffcanvas] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>(project.members);
  const [memberSearch, setMemberSearch] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredMembers = allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) &&
      !selectedMembers.some((s) => s.name === m.name)
  );

  const toggleMemberSelection = (member: Member) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m.name === member.name)
        ? prev.filter((m) => m.name !== member.name)
        : [...prev, member]
    );
  };

  const saveMembers = () => {
    if (onMembersUpdate) {
      onMembersUpdate(project.id, selectedMembers);
    }
    setShowMemberOffcanvas(false);
  };

  if (!isClient) {
    // Server-side render (simplified version)
    return (
      <tr className="border-t">
        <td className="py-4 px-6 text-sm font-medium">{project.name}</td>
        <td className="py-4 px-6 flex gap-1 items-center">
          {project.members.slice(0, 5).map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ backgroundColor: member.color }}
              title={member.name}
            >
              {member.name.slice(0, 2).toUpperCase()}
            </div>
          ))}
          <div className="w-8 h-8 border border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-500">
            +
          </div>
        </td>
        <td className="py-4 px-6 text-sm">{project.notes || "-"}</td>
      </tr>
    );
  }

  // Client-side render (full interactive version)
  return (
    <>
      <tr className="border-t">
        <td className="py-4 px-6 text-sm font-medium">{project.name}</td>

        <td className="py-4 px-6 flex gap-1 items-center">
          {selectedMembers.slice(0, 5).map((member, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ backgroundColor: member.color }}
              title={member.name}
            >
              {member.name.slice(0, 2).toUpperCase()}
            </div>
          ))}

          {selectedMembers.length > 5 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-xs">
              +{selectedMembers.length - 5}
            </div>
          )}

          <button
            onClick={() => setShowMemberOffcanvas(true)}
            className="add-member w-8 h-8 border border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          >
            +
          </button>
        </td>

        <td className="py-4 px-6 text-sm">{project.notes || "-"}</td>
      </tr>

      {/* Member Selection Offcanvas */}
      {showMemberOffcanvas && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-50 transition-opacity duration-300 opacity-100 visible"
          onClick={() => setShowMemberOffcanvas(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[--card] shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Manage Members
                </h2>
                <button
                  onClick={() => setShowMemberOffcanvas(false)}
                  className="text-gray-500  text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="mb-4 mt-4">
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full p-2 border rounded bg-[var(--card)]"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto ">
                <h3 className="font-medium my-3">Selected Members</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-2 bg-[var(--light)] pr-3 py-1 rounded-full"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{member.name}</span>
                      <button
                        onClick={() => toggleMemberSelection(member)}
                        className="text-gray-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <h3 className="font-medium my-3">Available Members</h3>
                <div className="">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.name}
                      onClick={() => toggleMemberSelection(member)}
                      className="flex items-center gap-3 py-2  rounded cursor-pointer "
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowMemberOffcanvas(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveMembers}
                  className="flex-1 bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectRow;