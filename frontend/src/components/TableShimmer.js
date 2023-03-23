const TableShimmer = () => {
  return (
    <div className="relative w-full">
      <div className=" absolute top-20  w-full">
        <div className="flex justify-between mb-2 items-center">
          <h1 className="subpixel-antialiased text-4xl font-medium bg-gray-400  animate-pulse tracking-wide ml-2"></h1>
          <div className="flex gap-3 mr-4 items-center">
            <input
              type="search"
              className="border-2 rounded-xl  focus:ring-black focus:outline-none focus:ring focus:ring-opacity-70 p-1"
            />
            <span>
              <button className="bg-gray-400  animate-pulse text-white p-3 w-5 rounded-lg"></button>
            </span>
          </div>
        </div>
        <div>
          <table className="w-full">
            <thead className="bg-gray-400  animate-pulse">
              <tr className="bg-gray-400 rounded-lg border-none animate-pulse">
                <th className="p-12"></th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>{" "}
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>{" "}
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>{" "}
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>{" "}
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>{" "}
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
              <tr className="bg-gray-300 mt-2 border-none animate-pulse">
                <td className="bg-gray-300  p-2 border-none animate-pulse"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableShimmer;
