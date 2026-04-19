import React from "react";

export default function TabPlaceholder({ name }) {
  return (
    <div className="tab-placeholder">
      <div className="placeholder-content">
        <h2>{name}</h2>
        <p>This is the {name} section. Content coming soon!</p>
      </div>
    </div>
  );
}
