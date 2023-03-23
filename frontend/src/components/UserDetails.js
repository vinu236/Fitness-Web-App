const UserDetails=()=>{

    return(
        <div className=" flex justify-center h-full">
        <div className="flex flex-col items-center w-1/2">
          <div className=" flex  gap-6 p-4">
            <label className="text-white text-2xl font-semibold mr-5">
              Name
            </label>
            <span className="text-white text-3xl font-semibold mr-3">:</span>
            <p  className=" w-60 rounded-xl bg-black text-white text-2xl p-1 capitalize">{userInfo.userName}</p>
          </div>
        <div className="  flex  gap-6 p-4">
          <label className="text-white text-2xl font-semibold mr-5">
            Email
          </label>
          <span className="text-white text-3xl font-semibold mr-3">:</span>
          <p  className=" w-60 rounded-xl bg-black text-white text-2xl p-1 ">{userInfo.email}</p>
        </div>
        <div className="  flex gap-6 p-4">
          <label className="text-white text-2xl font-semibold mr-5">Plan</label>
          <span className="text-white text-3xl font-semibold mr-5">:</span>
          <p className="text-green-400 text-2xl w-60">Active</p>
        </div>
        {/* <div className="text-center flex justify-center gap-6 mt-5">
          {!editShow ?<Button className="text-white font-semibold bg-slate-600 hover:bg-custom-gym p-2 w-60 rounded-3xl" onClick={handleClick} text={"Edit"}/> :
          <>       
        <Button className="text-white font-semibold bg-slate-600 hover:bg-custom-gym p-2 w-52 rounded-2xl" text={"Update"}/>
          
          <Button className="text-white font-semibold bg-slate-600 hover:bg-custom-gym p-2  w-52 rounded-2xl" text={"Cancel"} onClick={handleCancel}/>
          </>
          }
          
          
        </div> */}
        </div>
      </div>
    )
}

export default UserDetails;