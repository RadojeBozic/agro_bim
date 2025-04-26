import React from "react";

function Snackbar({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} position-fixed bottom-0 end-0 m-4 shadow`} style={{ zIndex: 9999 }}>
      {message}
      <button type="button" className="btn-close float-end" onClick={onClose}></button>
    </div>
  );
}

export default Snackbar;
