import CreatePostButton from "../CreatePostButton/CreatePostButton";
import "./Sidebar.css";

const Sidebar = ({ value, onValuechange, groupList, currentUser, loading }) => {
  return (
    <div className="sidebar-ctn">
      {currentUser ? <CreatePostButton /> : null}

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
