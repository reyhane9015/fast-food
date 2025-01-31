import { useState } from "react";
import Trash from "../../components/icons/Trash";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-50">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              className="bg-primary p-4 rounded-lg text-white"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="flex items-center p-2 text-gray-600 font-semibold text-primary border-2 border-primary rounded-md"
      onClick={() => setShowConfirm(true)}
    >
      <Trash />
      {label}
    </button>
  );
}
