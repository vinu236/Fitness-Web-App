const Table = ({data,config,keyFn}) => {
  const renderedHeaders=config.map((column)=>{
    return(
      <>
      <th className="p-9 text-white ">{column.label}</th>
      </>
    )
  });

    
    const renderedRow=data.map((data)=>{
      const renderedCells=config.map((column)=>{
        return(
          <td className="text-center" key={keyFn(data)}>{column.render(data)}</td>
        )
      })
      return(
        <tr className="border-b-2 border-b-gray-900">
         {renderedCells}
         
        </tr>
      );
    })

  return (
 <div className="relative w-full">
  <div className=" absolute top-20  w-full">
    <div className="flex justify-between mb-2 items-center">
      <h1 className="subpixel-antialiased text-4xl font-medium tracking-wide ml-2">Trainee Details</h1>
      <div className="flex gap-3 mr-4 items-center">
        <input type="search" className="border-2 rounded-xl  focus:ring-black focus:outline-none focus:ring focus:ring-opacity-70 p-1" />
        <span>
        <button className="bg-black text-white p-2 rounded-lg">Search</button>
        </span>
      </div>
    </div>
    <div >
      <table className="w-full">
        <thead className="bg-black">
          <tr className="bg-black rounded-lg border-none">
            {renderedHeaders}
          </tr>
        </thead>

        <tbody>
          {renderedRow}
        </tbody>
      </table>
    </div>
  </div>
 </div> 

  );
};
export default Table;
