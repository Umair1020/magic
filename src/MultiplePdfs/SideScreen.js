import React from 'react'

const SideScreen = ({ uploadedFiles }) => {
  return (
    <div>
      <div className=" inset-y-0 left-0 h-full transform z-20 border-r flex flex-col  border-border3 bg-bgDark transition-all duration-200 ease-in-out translate-x-0 w-60" style={{ overflowX: "hidden" }}><div className="flex flex-col transition-colors duration-200 pb-2 mb-[0] sticky top-0 bg-white z-10"><div className="flex-none flex flex-row items-center justify-between py-3 pl-5 pr-2 h-13"><div></div></div><div className="px-2 relative" id="tourCreate">
        <div className="flex flex-row justify-center items-center gap-1"><button className="flex flex-row px-2 h-8 gap-1.5 items-center justify-start rounded-lg hover:bg-elementGray text-textGray4 w-full text-[13px] font-medium ease-in transition-all duration-150 leading-tight"><svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.75V14.25" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 9H14.25" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <p>New</p></button><div className="w-8 h-8 flex flex-row items-center"><button className="flex justify-center items-center w-7.5 h-7.5 rounded-md p-1.5 ease-in transition-all duration-150 cursor-pointer hover:bg-elementGray"><svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1437_16)"><path d="M3.75 5.15625V6.09375C3.75 6.46671 3.89816 6.8244 4.16188 7.08812C4.4256 7.35184 4.78329 7.5 5.15625 7.5H9.84375C10.2167 7.5 10.5744 7.35184 10.8381 7.08812C11.1018 6.8244 11.25 6.46671 11.25 6.09375V5.15625" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 7.5V9.84375" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 5.15625C4.52665 5.15625 5.15625 4.52665 5.15625 3.75C5.15625 2.97335 4.52665 2.34375 3.75 2.34375C2.97335 2.34375 2.34375 2.97335 2.34375 3.75C2.34375 4.52665 2.97335 5.15625 3.75 5.15625Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 12.6562C8.27665 12.6562 8.90625 12.0267 8.90625 11.25C8.90625 10.4733 8.27665 9.84375 7.5 9.84375C6.72335 9.84375 6.09375 10.4733 6.09375 11.25C6.09375 12.0267 6.72335 12.6562 7.5 12.6562Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 5.15625C12.0267 5.15625 12.6562 4.52665 12.6562 3.75C12.6562 2.97335 12.0267 2.34375 11.25 2.34375C10.4733 2.34375 9.84375 2.97335 9.84375 3.75C9.84375 4.52665 10.4733 5.15625 11.25 5.15625Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_1437_16"><rect width="15" height="15" fill="white"></rect></clipPath></defs></svg></button></div><div className="w-8 h-8 flex flex-row items-center">
            <button className="flex justify-center items-center w-7.5 h-7.5 rounded-md p-1.5 ease-in transition-all duration-150 cursor-pointer hover:bg-elementGray"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1080_91)"><path d="M7.0625 11.75C9.65133 11.75 11.75 9.65133 11.75 7.0625C11.75 4.47367 9.65133 2.375 7.0625 2.375C4.47367 2.375 2.375 4.47367 2.375 7.0625C2.375 9.65133 4.47367 11.75 7.0625 11.75Z" stroke="#9a9a9a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.377 10.377L13.6248 13.6248" stroke="#9a9a9a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_1080_91"><rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"></rect></clipPath></defs></svg></button></div></div></div></div>
        <div className=" h-[calc(100vh-96px)] overflow-scroll scrollbar-hide">
          <div className="pb-6">
            <div data-rbd-droppable-id="chatbots" data-rbd-droppable-context-id="0" className="overflow-visible pb-4 flex flex-col gap-0.5 mb-1">
              {/* Map over the uploadedFiles and display the names dynamically */}
              {uploadedFiles.map((file, index) => (
                <div key={index}>
                  <li className="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 hover:bg-elementGray bg-white text-textGray">
                    {/* Display the file name dynamically */}
                    <div className="flex flex-row gap-2 items-center overflow-hidden flex-none w-full">
                      <div className="w-4 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* ... SVG Path ... */}
                        </svg>
                        <br /><br />
                      </div>
                      <div className="flex flex-row">
                        <h2 className="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">{file.name}</h2>
                      </div>
                    </div>
                    <div className="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-elementGray from-white group-hover:right-8"></div>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div></div>

  )
}

export default SideScreen