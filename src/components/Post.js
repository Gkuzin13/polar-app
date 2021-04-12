import { useContext } from 'react';
import { AuthContext } from '../Auth';
import { ArrowUpIcon } from '@heroicons/react/solid';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { ChatAltIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/solid';
import { BookmarkIcon } from '@heroicons/react/solid';
import { ACTIONS } from '../reducers/reducers';

const Post = ({ runReducer, data }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className='flex justify-center flex-col cursor-pointer 
    border-solid border-2 hover:border-gray-300 mb-3 mt-3'
    >
      {/* Post Main Info */}
      <div className='flex items-center justify-start p-1 '>
        <UserCircleIcon className='h-5 w-5  cursor-pointer' />
        <span className='pr-2 pl-2 font-bold hover:underline '>
          {data.postSubGroup}
        </span>
        <div className='text-sm text-gray-500'>
          <span>Posted by </span>
          <span className='hover:underline font-semibold'>
            {data.postOwner}
          </span>
          <span> {data.postDate} Hours ago</span>
        </div>
      </div>

      {/* Post Content */}
      <div className='flex flex-col w-full text-left p-2 border-solid border-t-2 border-b-2'>
        {data.postContent}
      </div>

      {/* Post Actions */}
      <div className='text-gray-600 flex justify-between w-1/2 items-center p-1 pl-2 '>
        <div className='flex items-center w-full '>
          <ArrowUpIcon
            className='h-4 w-4 hover:text-green-400 transition-colors'
            onClick={() =>
              runReducer(ACTIONS.UPVOTE_POST, currentUser.uid, data)
            }
          />
          <span className='pl-1 pr-1'>{data.postVotes}</span>
          <ArrowDownIcon
            className={`h-4 w-4 hover:text-red-400 transition-colors`}
            onClick={() =>
              runReducer(ACTIONS.DOWNVOTE_POST, currentUser.uid, data)
            }
          />
        </div>
        <div
          className='pl-2 pr-2 ml-2 mr-2 text-black-500 flex items-center 
          hover:text-blue-600 transition-colors w-full
        '
        >
          <ChatAltIcon className='h-5 w-5' />
          <span className='pl-1'>{data.comments}</span>
        </div>
        <div
          onClick={() => runReducer(ACTIONS.SAVE_POST, currentUser.uid, data)}
          className='flex justify-evenly items-center 
        hover:text-green-600 transition-colors'
        >
          <BookmarkIcon className='h-5 w-5 ' />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
