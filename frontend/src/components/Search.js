const Search=()=>{

return(
    <div className="flex justify-between mb-2 items-center">
          <div className="flex gap-3 mr-4 items-center">
            <input
              type="search"
              className="border-2 rounded-xl  focus:ring-black focus:outline-none focus:ring focus:ring-opacity-70 p-1"
            />
            <span>
              <button className="bg-black text-white p-2 rounded-lg">
                Search
              </button>
            </span>
          </div>
        </div>
);

}

export default Search;