import { Shimmer } from 'react-shimmer';
import { FaCheck } from 'react-icons/fa';
const ShimmerListItem = () => {
    return (
      <li className="flex items-center text-lg mb-4">
        <Shimmer width={24} height={24} className="text-green-500 mr-2">
          <FaCheck />
        </Shimmer>
        <div>
          <Shimmer width={120} height={12} className="text-white mb-2">
            <div>Placeholder text</div>
          </Shimmer>
          <Shimmer width={80} height={12} className="text-white">
            <div>Placeholder text</div>
          </Shimmer>
        </div>
      </li>
    );
  }
  export default ShimmerListItem;