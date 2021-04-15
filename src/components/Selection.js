import groupList from '../GroupList';

const Selection = () => {
  return (
    <div className='w-full flex'>
      <select className='w-full p-2 cursor-pointer rounded font-semibold'>
        {groupList.map((group, i) => {
          return (
            <option value={group} key={i}>
              {group}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selection;
