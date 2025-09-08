import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/style";

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
        // console.log(resonse.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                open={open}
                setOpen={setOpen}
              />
            ))}
        </>
      )}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, open, setOpen }) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) => handleClick(data._id) || setActive(index)}
    >
      <div className="relative">
        <img
          src="http://localhost:8000/Untitled%20design%20(15)-1757171304861-940605407.png"
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        {/* {online ? ( */}
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        {/* ) : ( */}
        {/* <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" /> */}
        {/* )} */}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">Talha amjad</h1>
        <p className="text-[16px] text-[#000c]">this is message</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src="http://localhost:8000/Untitled%20design%20(15)-1757171304861-940605407.png"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Talha Amjad</h1>
            <h1>Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        <div className={`flex w-full my-2 justify-start`}>
          <img
            src="http://localhost:8000/Untitled%20design%20(15)-1757171304861-940605407.png"
            className="w-[40px] h-[40px] rounded-full mr-3"
            alt=""
          />
          <div>
            <div className={`w-max p-2 rounded bg-[#38c776] text-[#fff] h-min`}>
              <p>this is text</p>
            </div>

            <p className="text-[12px] text-[#000000d3] pt-1">
              {/* {format(item.createdAt)} */}
              12-05-2024
            </p>
          </div>
        </div>
        <div className={`flex w-full my-2 justify-end`}>
          <img
            src="http://localhost:8000/Untitled%20design%20(15)-1757171304861-940605407.png"
            className="w-[40px] h-[40px] rounded-full mr-3"
            alt=""
          />
          <div>
            <div className={`w-max p-2 rounded bg-[#38c776] text-[#fff] h-min`}>
              <p>this is text</p>
            </div>

            <p className="text-[12px] text-[#000000d3] pt-1">
              {/* {format(item.createdAt)} */}
              12-05-2024
            </p>
          </div>
        </div>
        {/* {messages &&
          messages.map((item, index) => {
            return (
              <div
                className={`flex w-full my-2 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    alt=""
                  />
                )}
                {item.images && (
                  <img
                    src={`${item.images?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  />
                )}
                {item.text !== "" && (
                  <div>
                    <div
                      className={`w-max p-2 rounded ${
                        item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                      } text-[#fff] h-min`}
                    >
                      <p>{item.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            );
          })} */}
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        // onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
