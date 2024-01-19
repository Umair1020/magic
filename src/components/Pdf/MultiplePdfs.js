import React, {useState} from 'react'
import logo from "../../assets/2.svg"
import { useMediaQuery } from 'react-responsive';
const MultiplePdfs = () => {
  const [showOptions, setShowOptions] = useState(true); // State to control the visibility of options

  const [isLocateSectionSelected, setIsLocateSectionSelected] = useState(false);
  const [isLanguageSelected, setLanguageSelected] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("Type Message here");
  const handleOptionClick = async (option) => {
    // Translate a paragraph
    setShowLogoAndText(false);
    if (option === "Locate a specific section") {
      setIsLocateSectionSelected(true);
      setInputPlaceholder("Enter desired section you want to search"); // Set the state to true when this option is selected
    } else if (option === "Translate a paragraph") {
      setInputPlaceholder("Enter desired Translate language");
      setLanguageSelected(true);
    } else {
      await handleUserMessage(option); // For other options, proceed as before
      setShowOptions(false);
    }
  };
  const containerStyle = {
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    padding: "10px",
    margin: "auto", // This will center the container
    // border: "1px solid #ccc", // Example border to separate the container from the rest of the page
    borderRadius: "8px", // Example border radius
  };

  const boxStyle = {
    backgroundColor: "#fff", // Background color for the div
    border: "1px solid #D8D9E5",
    borderRadius: "5px",
    padding: "10px",
    borderRadius: "12px",
    border: "1px",
    gap: "16px",

    margin: "0 10px", // Spacing between the divs
    flexBasis: "45%", // Adjust width as needed to fit content
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "18px", // Adjust font size as needed
    fontWeight: "600", // Adjust font weight as needed
    marginBottom: "10px",
  };

  const contentStyle = {
    fontSize: "16px", // Adjust font size as needed
    fontWeight: "400", // Adjust font weight as needed
    color: "#555",
    textAlign: "start",
  };

  const [showLogoAndText, setShowLogoAndText] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  let confirm;
  // State to store chat messages
  const [chatMessages, setChatMessages] = useState([]);

  // Function to handle user messages
  const handleUserMessage = async (userMessage) => {
    setShowOptions(false);
    const formData = new FormData();
    formData.append("pdfDoc", pdfDoc);
    formData.append("userQuestion", userMessage);
    formData.append("userId", userId);
    formData.append("pdfUrl", path);
    pdfId ? formData.append("pdfId", pdfId) : "";

    if (isLocateSectionSelected) {
      userMessage = "Locate a specific section: " + userMessage;
      setIsLocateSectionSelected(false); // Reset the state
      setInputPlaceholder("Type Message here");
    }
    if (isLanguageSelected) {
      userMessage = "Translate a paragraph: " + userMessage;
      setLanguageSelected(false); // Reset the state
      setInputPlaceholder("Type Message here");
    }
    setIsLoading(true);

    try {
      // Send the user's question to the API
      const response = userId
        ? await axios.post(`${baseurl}/api/pdf/getResult`, formData)
        : await axios.post(`${baseurl}/api/pdf/resume`, {
          pdfUrl: pdfPath,
          userQuestion: userMessage,
        });
      confirm = response.data.chat_history;

      // Create a new user message object
      const newUserMessage = {
        message: userMessage,
        sender: "user",
        direction: "outgoing",
      };

      // Update chat messages state with the new user message
      const updatedChatMessages = [...chatMessages, newUserMessage];
      // Check if the answer is available
      if (confirm) {
        // For subsequent questions, add the answer to chat messages
        updatedChatMessages.push({
          message: confirm,
          sender: "backend",
        });
      }

      setChatMessages(updatedChatMessages);

      // Set the answer for the next user message

      // Clear the input field
      // setUserQuestion('');
    } catch (error) {
      // console.log(error.message);
      const errorMessage = error.response
        ? error.response.data.error
        : "An unexpected error occurred";
      toast.error(errorMessage, {
        // Use errorMessage here
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  // const [message, setMessage] = useState("");
  let message;
  const [messages, setMessages] = useState([]);

  const handleMessageChange = async (e) => {
    message = e.target.value;
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const formData = new FormData();
      formData.append("pdfDoc", pdfDoc);
      formData.append("userQuestion", message);
      formData.append("userId", userId);
      formData.append("pdfUrl", path);
      pdfId ? formData.append("pdfId", pdfId) : "";

      if (isLocateSectionSelected) {
        message = "Locate a specific section: " + message;
        setIsLocateSectionSelected(false);
        setInputPlaceholder("Type Message here");
      }
      if (isLanguageSelected) {
        message = "Translate a paragraph: " + message;
        setLanguageSelected(false);
        setInputPlaceholder("Type Message here");
      }

      setIsLoading(true);

      try {
        const response = userId
          ? await axios.post(`${baseurl}/api/pdf/getResult`, formData)
          : await axios.post(`${baseurl}/api/pdf/resume`, { pdfUrl: pdfPath });
        confirm = response.data.chat_history;

        const newUserMessage = {
          message: message,
          sender: "user",
          direction: "outgoing",
        };

        const updatedChatMessages = [...chatMessages, newUserMessage];
        if (confirm) {
          updatedChatMessages.push({
            message: confirm,
            sender: "backend",
          });
        }

        setChatMessages(updatedChatMessages);

        message = ""; // Clear the input field
      } catch (error) {
        alert(error); // Add this line to show the error via alert
        const errorMessage = error.response
          ? error.response.data.error
          : "An unexpected error occurred";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>  <Desktop>
      <div
        className=""
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          overflowY: "hidden",
          backgroundColor: "white",
        }}
      >
        <div style={{ flexBasis: "30%", flexGrow: 0, flexShrink: 0, }}>
          <div class=" inset-y-0 left-0 h-full transform z-20 border-r flex flex-col  border-border3 bg-bgDark transition-all duration-200 ease-in-out translate-x-0 w-60" style={{overflowX: "hidden"}}><div class="flex flex-col transition-colors duration-200 pb-2 mb-[0] sticky top-0 bg-white z-10"><div class="flex-none flex flex-row items-center justify-between py-3 pl-5 pr-2 h-13"><div></div></div><div class="px-2 relative" id="tourCreate">
            <div class="flex flex-row justify-center items-center gap-1"><button class="flex flex-row px-2 h-8 gap-1.5 items-center justify-start rounded-lg hover:bg-elementGray text-textGray4 w-full text-[13px] font-medium ease-in transition-all duration-150 leading-tight"><svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.75V14.25" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 9H14.25" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              <p>New</p></button><div class="w-8 h-8 flex flex-row items-center"><button class="flex justify-center items-center w-7.5 h-7.5 rounded-md p-1.5 ease-in transition-all duration-150 cursor-pointer hover:bg-elementGray"><svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1437_16)"><path d="M3.75 5.15625V6.09375C3.75 6.46671 3.89816 6.8244 4.16188 7.08812C4.4256 7.35184 4.78329 7.5 5.15625 7.5H9.84375C10.2167 7.5 10.5744 7.35184 10.8381 7.08812C11.1018 6.8244 11.25 6.46671 11.25 6.09375V5.15625" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 7.5V9.84375" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 5.15625C4.52665 5.15625 5.15625 4.52665 5.15625 3.75C5.15625 2.97335 4.52665 2.34375 3.75 2.34375C2.97335 2.34375 2.34375 2.97335 2.34375 3.75C2.34375 4.52665 2.97335 5.15625 3.75 5.15625Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 12.6562C8.27665 12.6562 8.90625 12.0267 8.90625 11.25C8.90625 10.4733 8.27665 9.84375 7.5 9.84375C6.72335 9.84375 6.09375 10.4733 6.09375 11.25C6.09375 12.0267 6.72335 12.6562 7.5 12.6562Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.25 5.15625C12.0267 5.15625 12.6562 4.52665 12.6562 3.75C12.6562 2.97335 12.0267 2.34375 11.25 2.34375C10.4733 2.34375 9.84375 2.97335 9.84375 3.75C9.84375 4.52665 10.4733 5.15625 11.25 5.15625Z" stroke="#9a9a9a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_1437_16"><rect width="15" height="15" fill="white"></rect></clipPath></defs></svg></button></div><div class="w-8 h-8 flex flex-row items-center">
                <button class="flex justify-center items-center w-7.5 h-7.5 rounded-md p-1.5 ease-in transition-all duration-150 cursor-pointer hover:bg-elementGray"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1080_91)"><path d="M7.0625 11.75C9.65133 11.75 11.75 9.65133 11.75 7.0625C11.75 4.47367 9.65133 2.375 7.0625 2.375C4.47367 2.375 2.375 4.47367 2.375 7.0625C2.375 9.65133 4.47367 11.75 7.0625 11.75Z" stroke="#9a9a9a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.377 10.377L13.6248 13.6248" stroke="#9a9a9a" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_1080_91"><rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"></rect></clipPath></defs></svg></button></div></div></div></div><div class=" h-[calc(100vh-96px)] overflow-scroll scrollbar-hide"><div class="pb-6"><div data-rbd-droppable-id="chatbots" data-rbd-droppable-context-id="0" class="overflow-visible pb-4 flex flex-col gap-0.5 mb-1">
                  <div tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="NavLink-72c4eae8-2d74-4918-9861-898be354b4e6" data-rbd-drag-handle-context-id="0" draggable="false" data-rbd-draggable-context-id="0" data-rbd-draggable-id="NavLink-72c4eae8-2d74-4918-9861-898be354b4e6"><li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 hover:bg-elementGray bg-white text-textGray"><div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full"><div class="w-4 flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_849_141)"><path d="M7.40863 16.631H4.04117C3.88129 16.631 3.72796 16.5675 3.61491 16.4544C3.50187 16.3414 3.43835 16.188 3.43835 16.0281V12.6607C3.43843 12.501 3.50184 12.3479 3.61468 12.2349L12.907 2.94259C13.0201 2.82963 13.1733 2.76617 13.3331 2.76617C13.493 2.76617 13.6462 2.82963 13.7593 2.94259L17.1267 6.3078C17.2397 6.42083 17.3031 6.5741 17.3031 6.73391C17.3031 6.89372 17.2397 7.04698 17.1267 7.16002L7.83436 16.4546C7.7214 16.5675 7.56829 16.6309 7.40863 16.631Z" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6721 5.17752L14.8918 9.39721" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_849_141"><rect width="19.29" height="19.29" fill="white" transform="translate(0.424316 0.355011)"></rect></clipPath></defs></svg><br /><br /></div> <div class="flex flex-row"><h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Untitled</h2></div>
                  </div><div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-elementGray from-white group-hover:right-8"></div></li></div><div tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="NavLink-da318d3f-ab9f-472a-9c88-da6a36d9a271" data-rbd-drag-handle-context-id="0" draggable="false" data-rbd-draggable-context-id="0" data-rbd-draggable-id="NavLink-da318d3f-ab9f-472a-9c88-da6a36d9a271"><li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 hover:bg-elementGray bg-white text-textGray"><div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full"><div class="w-4 flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_849_141)"><path d="M7.40863 16.631H4.04117C3.88129 16.631 3.72796 16.5675 3.61491 16.4544C3.50187 16.3414 3.43835 16.188 3.43835 16.0281V12.6607C3.43843 12.501 3.50184 12.3479 3.61468 12.2349L12.907 2.94259C13.0201 2.82963 13.1733 2.76617 13.3331 2.76617C13.493 2.76617 13.6462 2.82963 13.7593 2.94259L17.1267 6.3078C17.2397 6.42083 17.3031 6.5741 17.3031 6.73391C17.3031 6.89372 17.2397 7.04698 17.1267 7.16002L7.83436 16.4546C7.7214 16.5675 7.56829 16.6309 7.40863 16.631Z" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6721 5.17752L14.8918 9.39721" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_849_141"><rect width="19.29" height="19.29" fill="white" transform="translate(0.424316 0.355011)"></rect></clipPath></defs></svg></div><div class="flex flex-row"><h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Welcome!</h2></div></div><div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-elementGray from-white group-hover:right-8"></div></li></div>
                  <div tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="NavLink-53397ded-47c2-4df9-ae5e-a5c55bafc011" data-rbd-drag-handle-context-id="0" draggable="false" data-rbd-draggable-context-id="0" data-rbd-draggable-id="NavLink-53397ded-47c2-4df9-ae5e-a5c55bafc011"><li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 hover:bg-elementGray bg-white text-textGray"><div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full"><div class="w-4 flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_849_141)"><path d="M7.40863 16.631H4.04117C3.88129 16.631 3.72796 16.5675 3.61491 16.4544C3.50187 16.3414 3.43835 16.188 3.43835 16.0281V12.6607C3.43843 12.501 3.50184 12.3479 3.61468 12.2349L12.907 2.94259C13.0201 2.82963 13.1733 2.76617 13.3331 2.76617C13.493 2.76617 13.6462 2.82963 13.7593 2.94259L17.1267 6.3078C17.2397 6.42083 17.3031 6.5741 17.3031 6.73391C17.3031 6.89372 17.2397 7.04698 17.1267 7.16002L7.83436 16.4546C7.7214 16.5675 7.56829 16.6309 7.40863 16.631Z" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6721 5.17752L14.8918 9.39721" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_849_141"><rect width="19.29" height="19.29" fill="white" transform="translate(0.424316 0.355011)"></rect></clipPath></defs></svg></div><div class="flex flex-row"><h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Prompts to get you started</h2></div></div><div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-elementGray from-white group-hover:right-8">
                  </div></li></div><div tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="NavLink-6b27b70c-5432-4733-bb27-530f120b08c7" data-rbd-drag-handle-context-id="0" draggable="false" data-rbd-draggable-context-id="0" data-rbd-draggable-id="NavLink-6b27b70c-5432-4733-bb27-530f120b08c7"><li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 hover:bg-elementGray bg-white text-textGray"><div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full"><div class="w-4 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_849_141)"><path d="M7.40863 16.631H4.04117C3.88129 16.631 3.72796 16.5675 3.61491 16.4544C3.50187 16.3414 3.43835 16.188 3.43835 16.0281V12.6607C3.43843 12.501 3.50184 12.3479 3.61468 12.2349L12.907 2.94259C13.0201 2.82963 13.1733 2.76617 13.3331 2.76617C13.493 2.76617 13.6462 2.82963 13.7593 2.94259L17.1267 6.3078C17.2397 6.42083 17.3031 6.5741 17.3031 6.73391C17.3031 6.89372 17.2397 7.04698 17.1267 7.16002L7.83436 16.4546C7.7214 16.5675 7.56829 16.6309 7.40863 16.631Z" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6721 5.17752L14.8918 9.39721" stroke="#989898" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_849_141"><rect width="19.29" height="19.29" fill="white" transform="translate(0.424316 0.355011)"></rect></clipPath></defs></svg></div><div class="flex flex-row"><h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Keyboard shortcuts</h2></div></div><div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-elementGray from-white group-hover:right-8"></div></li></div><div tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="NavLink-4337d94d-a351-4dfc-a858-bdd75b604c05" data-rbd-drag-handle-context-id="0" draggable="false" data-rbd-draggable-context-id="0" data-rbd-draggable-id="NavLink-4337d94d-a351-4dfc-a858-bdd75b604c05"><li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-lg px-2.5 mx-2 py-2 relative overflow-visible h-8 bg-elementGray"><div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full"><div class="w-4 flex items-center justify-center"><span class="loader-small-gray"></span></div><div class="flex flex-row"><h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Statment</h2></div></div><div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 from-elementGray group-hover:right-8"></div></li></div></div></div></div></div>
        </div>
        <div style={{ flexBasis: "70%", flexGrow: 0, flexShrink: 0 }}>
          <div className="chat-container" style={{height: "100vh"}}>
            {showLogoAndText && (
              <div style={{ position: "relative", top: "auto", right: "6%" }}>
                <img
                  className="d-flex justify-content-center align-items-center mx-auto  "
                  alt="Logo"
                  src={logo}
                />
              </div>
            )}
            {showOptions && (
              <div
                style={{
                  position: "absolute",
                  left: "45%",
                  bottom: "50%",
                  margin: "auto",
                  borderColor: "rgba(0,0,0,.1)",
                }}
              >
                <div style={containerStyle}>
                  <button
                    className="mx-3 flex items-center justify-center"
                    style={boxStyle}
                    onClick={() =>
                      handleOptionClick("Find a summary of the document")
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src="/btnicon.svg" style={{ marginRight: "10px" }} />
                      <div className="flex flex-col overflow-hidden text-start mx-4">
                        <div style={titleStyle}>Find Summary</div>
                        <div style={contentStyle}>
                          Get a quick summary of the PDF content
                        </div>
                      </div>
                    </div>
                  </button>
                  <br />
                  <button
                    className="mx-3 flex items-center justify-center"
                    style={boxStyle}
                    onClick={() =>
                      handleOptionClick(
                        "Explain this document, as if I am in 7th Grade"
                      )
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src="/btnicon.svg" style={{ marginRight: "10px" }} />
                      <div className="flex flex-col overflow-hidden text-start mx-4">
                        <div style={titleStyle}>Explain</div>
                        <div style={contentStyle}>
                          Explain this document, as if I am in 7th Grade
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
            <div className="messages-container">
              {chatMessages.map((msg, index) => {
                const messageKey = `message-${index}-${msg.sender}`; // Unique key for each message
                return msg.sender === "user" ? (
                  <div className="message user-message" key={messageKey}>
                    <p>{msg.message}</p>
                  </div>
                ) : (
                  <div className="message bot-reply" key={messageKey}>
                    <p>{msg.message}</p>
                  </div>
                );
              })}
            </div>
            {isLoading && <WaveCircle />}
            <div className="input-container">
              <img className="mx-3 " src="/sender.png" />
              <input
                type="text"
                className="input"
                placeholder={inputPlaceholder}
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSendMessage}>
                <img src="/send.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Desktop>
      <Mobile>
        <div className="chat-container">
          {isLoading && <WaveCircle />}

          {showOptions && (
            <div
              style={{
                position: "absolute",
                left: "0%",
                bottom: "14%",
                margin: "auto",
                borderColor: "rgba(0,0,0,.1)",
              }}
            >
              <div style={containerStyle}>
                <button
                  className="mx-3 flex items-center justify-center"
                  style={boxStyle}
                  onClick={() =>
                    handleOptionClick("Find detail  summary of this file")
                  }
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/btnicon.svg" style={{ marginRight: "10px" }} />
                    <div className="flex flex-col overflow-hidden text-start mx-4">
                      <div style={titleStyle}>Find Summary</div>
                      <div style={contentStyle}>
                        Get a quick summary of the PDF content
                      </div>
                    </div>
                  </div>
                </button>
                <br />
                <button
                  className="mx-3 flex items-center justify-center"
                  style={boxStyle}
                  onClick={() =>
                    handleOptionClick(
                      "Explain this document, as if I am in 7th Grade"
                    )
                  }
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/btnicon.svg" style={{ marginRight: "10px" }} />
                    <div className="flex flex-col overflow-hidden text-start mx-4">
                      <div style={titleStyle}>Explain</div>
                      <div style={contentStyle}>
                        Explain this document, as if I am in 7th Grade
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
          <div className="messages-container">
            {chatMessages.map((msg, index) => {
              const messageKey = `message-${index}-${msg.sender}`; // Unique key for each message
              return msg.sender === "user" ? (
                <div className="message user-message" key={messageKey}>
                  <p>{msg.message}</p>
                </div>
              ) : (
                <div className="message bot-reply" key={messageKey}>
                  <p>{msg.message}</p>
                </div>
              );
            })}
          </div>
          <div className="input-container">
            <img className="mx-3 " src="/sender.png" />
            <input
              type="text"
              className="input"
              placeholder={inputPlaceholder}
              value={message}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <img src="/send.svg" />
            </button>
          </div>
        </div>
      </Mobile>
    </div>
  )
}

export default MultiplePdfs