const Note = ({ content, click, label }) => (
  <li className="note">
    {content}{" "}
    <button onClick={click}>
      {label ? "make not important" : "make important"}
    </button>
  </li>
);

export default Note;
