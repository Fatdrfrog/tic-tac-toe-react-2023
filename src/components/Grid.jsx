export default function Grid(props) {
  let className = "elative w-24 h-24 transition duration-500 border-2 ";

  if(props.darkTheme){
    className += "bg-[#000000] text-white";
  } else {
    className += "bg-[#FFFFFF] text-black"
  }

  return (
    <div className="grid grid-cols-3 m-auto w-fit">
      {props.grid.map((element) => (
        <div key={element.id} className="relative group">
          <div className="bg-[#FFFFFF]"></div>
          <button
            onClick={() => props.handlePlay(element.id)}
            className={className}
          >
            {element.text}
          </button>
        </div>
      ))}
    </div>
  );
}
