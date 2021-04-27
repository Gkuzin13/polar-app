import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ value, onValuechange, groupList, currentUser }) => {
  return (
    <div className="sidebar-ctn">
      {currentUser ? (
        <div>
          <Link to="/create">
            <button type="button" className="sidebar-add-btn">
              Create Post
            </button>
          </Link>
        </div>
      ) : null}

      <div className="sidebar-options-ctn">
        {groupList.map((group, i) => {
          return (
            <button
              className={
                value === group
                  ? "sidebar-option-btn sidebar-option-active "
                  : "sidebar-option-btn"
              }
              value={group}
              defaultValue={group}
              key={i}
              onClick={(e) => onValuechange(e)}
            >
              {`/${group}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
