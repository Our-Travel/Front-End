import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Ellipse from '../../Ellipse 40.png';

const FindMate = () => {
  const navigate = useNavigate();
  const buttonClick = () => {
    navigate('/selectLocation');
  };

  const otMembers = [
    { name: '안정민', image: Ellipse },
    { name: '조윤호', image: Ellipse },
    { name: '김수민', image: Ellipse },
    { name: '이정민', image: Ellipse },
    { name: '장재우', image: Ellipse },
    { name: '이주형', image: Ellipse },
    { name: '정현구', image: Ellipse },
    { name: '유하리', image: Ellipse },
  ];

  return (
    <>
      <div className="block w-[450px] border-b-2 border-gray-300">
        <h2 className="text-2xl inline-block pl-6 pt-2">강릉시</h2>
        <button onClick={buttonClick}>
          <GrFormPrevious className="text-4xl inline-block relative right-60 bottom-1" />
        </button>
      </div>
      <ul className="flex flex-wrap mt-4">
        {otMembers.map((otMembers, index) => (
          <li key={index} className="inline-block w-[200px] h-[120px] border-2 mx-auto mb-4 rounded-sm">
            {otMembers.name}
            {otMembers.image && <img src={otMembers.image} alt="" className="pl-2" />}
          </li>
        ))}
      </ul>
    </>
  );
};

export default FindMate;
