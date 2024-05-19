import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Resource = ({ resource, moduleId, setModules }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(resource.name);

  const [{ isDragging }, drag] = useDrag({
    type: "RESOURCE",
    item: { id: resource.id, moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleRename = () => {
    if (isEditing) {
      setModules((prevModules) =>
        prevModules.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                resources: module.resources.map((res) =>
                  res.id === resource.id ? { ...res, name: newName } : res
                ),
              }
            : module
        )
      );
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              resources: module.resources.filter(
                (res) => res.id !== resource.id
              ),
            }
          : module
      )
    );
  };

  return (
    <div
      ref={drag}
      className={`resource p-4 border rounded-lg shadow-md flex items-center justify-between transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <p className="flex-1">
          {resource.type === "link" ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {resource.name}
            </a>
          ) : (
            <a
              href={resource.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {resource.name}
            </a>
          )}
        </p>
      )}
      <div className="flex space-x-2">
        <FaEdit
          onClick={handleRename}
          className="text-gray-500 cursor-pointer hover:text-gray-700"
        />
        <FaTrashAlt
          onClick={handleDelete}
          className="text-red-500 cursor-pointer hover:text-red-700"
        />
      </div>
    </div>
  );
};

export default Resource;
