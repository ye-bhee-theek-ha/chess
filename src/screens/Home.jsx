import PlayArea from 'components/PlayArea';
import React, { useState } from 'react';

const GetGameDetails = ({ onSubmit }) => {
  return (
    <div>
      {/* Get details here and then add a submit button */}
      <button onClick={onSubmit} className='w-28 h-12 rounded-lg border-2 bg-blue-200 border-blue-300'>
        Submit
      </button>
    </div>
  );
};

const Home = (props) => {
  const [showModal, setShowModal] = useState(false);

  const play = () => {

  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      {/* {showModal ? (
        <GetGameDetails onSubmit={() => setShowModal(false)} />
      ) : (
        <button
          className='w-28 h-12 rounded-lg border-2 bg-green-200 border-green-300'
          onClick={() => setShowModal(true)}
        >
          Play
        </button>
      )} */}
      <PlayArea/>
    </div>
  );
};

export default Home;
