import { useState } from 'react';
import { pushCommentToDb } from '../services/commentHandler';

const CommentMaker = ({ currentUser, postData }) => {
  const [textInput, setTextInput] = useState('');

  const handleInput = (value) => {
    setTextInput(value);
  };

  const handleNewComment = (currentUser, content) => {
    pushCommentToDb(currentUser, content, ...postData);
  };

  return (
    <div className='flex flex-col mx-2 mt-7'>
      <label htmlFor='comment'>
        Comment as{' '}
        <span className='font-semibold text-indigo-500'>
          {currentUser?.displayName}
        </span>
      </label>
      <textarea
        className='border-gray-300 border-2 p-2 mt-1 resize-none'
        name='comment'
        rows='5'
        cols='33'
        placeholder='What are your thoughts?'
        value={textInput}
        onChange={(e) => handleInput(e.target.value)}
      ></textarea>
      <div className='p-2 bg-gray-100'>
        <button
          onClick={() => handleNewComment(currentUser, textInput)}
          className='bg-purple-500 hover:bg-purple-600 text-white 
            font-semibold py-2 px-3 mr-3 rounded transition-colors'
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentMaker;
