import React from "react";
import "./AddNoteForm.css";

function AddNoteForm(props) {
  const { className, ...otherProps } = props;

  return (
    <form
      className={["Noteful-form", className].join(" ")}
      action="#"
      {...otherProps}
    />
  );
}

export default AddNoteForm;
