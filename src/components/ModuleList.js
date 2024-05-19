import React from "react";
import { useDrop } from "react-dnd";
import Module from "./Module";

const ModuleList = ({
  modules,
  deleteModule,
  renameModule,
  setModules,
  moveModule,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {modules.map((module, index) => (
        <Module
          key={module.id}
          module={module}
          deleteModule={deleteModule}
          renameModule={renameModule}
          setModules={setModules}
          moveModule={moveModule}
          index={index}
        />
      ))}
    </div>
  );
};

export default ModuleList;
