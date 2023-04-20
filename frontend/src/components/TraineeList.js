import { AiFillAccountBook } from 'react-icons/ai';

const Trainee = ({ trainee, onClick, selected }) => {
  return (
    <div
      className={`p-4 border-2 border-gray-300 rounded-lg cursor-pointer ${selected ? 'border-blue-500' : ''}`}
      onClick={() => onClick(trainee)}
    >
      <div className="flex items-center">
        <AiFillAccountBook className="h-6 w-6 mr-2" />
        <h3 className="text-lg font-medium">{trainee.name}</h3>
      </div>
    </div>
  );
}

export default Trainee;
