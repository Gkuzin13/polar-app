import groupList from '../groups';
import AddPostButton from './AddPostButton';

const GroupList = () => {
  return (
    <div className='w-full flex mx-1'>
      <select className='w-full p-2 cursor-pointer rounded font-semibold'>
        {groupList.map((group, i) => {
          return (
            <option value={group} key={i}>
              {group}
            </option>
          );
        })}
      </select>
      <AddPostButton />
    </div>
  );
};

export default GroupList;
