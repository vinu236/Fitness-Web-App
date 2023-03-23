const ProfileImg=({src})=>{

    return(
        <div className="p-4 relative h-36">
        <img
          src={src}
          alt=""
          className=" border-4 border-white  rounded-full  cursor-pointer absolute box-border w-[8%] left-[180] ml-5 object-cover"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input type="file" className="hidden" id="fileInput" />
      </div>
    )
}
export default ProfileImg;