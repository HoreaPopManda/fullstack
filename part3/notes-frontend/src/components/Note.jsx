const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <label>
        <input
          type="checkbox"
          id={note.id}
          checked={note.important}
          onChange={toggleImportance}
        />
        <i> {label} </i>
        <button onClick={deleteNote}>delete</button>
      </label>
    </li>
  );
};

export default Note;
