"use client";

import { useAutosave } from "react-autosave";
import { updatedEntry } from "@/utils/api";
import { useState } from "react";

const Editor = ({ entry }) => {
  const [value, setvalue] = useState(entry.content);
  const [loading, setloading] = useState(false);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setloading(true);
      const updated = await updatedEntry(entry.id, _value);
      setloading(false);
    },
  });
  return (
    <div className="w-full h-full">
      {loading && <div>...isLoading</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
