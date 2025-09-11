import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:3000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

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
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [seller, messages]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: e,
            sender: seller._id,
            text: newMessage,
            conversationId: currentChat._id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // console.log(messages);

  return (
    <div className="w-full bg-white m-5 h-[85vh] overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
      {!open && (
        <>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Messages</h1>
            <p className="text-gray-600">Manage your customer conversations</p>
          </div>
          {/* All messages list */}
          <div className="overflow-y-auto h-[calc(100%-80px)]">
            {conversations && conversations.length > 0 ? (
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={seller._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                  isLoading={isLoading}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-500">
                  Customer messages will appear here when they contact your
                  shop.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  isLoading,
}) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user != me);
    const getUser = async () => {
      try {
        console.log("requested");
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-4 mx-2 my-1 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
        active === index
          ? "bg-blue-50 border border-blue-200"
          : "bg-transparent"
      }`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url}`}
          alt=""
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        {online ? (
          <div className="w-3 h-3 bg-green-400 rounded-full absolute -top-1 -right-1 border-2 border-white" />
        ) : (
          <div className="w-3 h-3 bg-gray-400 rounded-full absolute -top-1 -right-1 border-2 border-white" />
        )}
      </div>
      <div className="pl-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-900 truncate">
            {user?.name}
          </h1>
          <span className="text-xs text-gray-500">
            {format(data?.updatedAt)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {!isLoading && data?.lastMessageId !== user?._id ? "You: " : ""}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* message header */}
      <div className="flex p-4 items-center justify-between bg-white border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={`${userData?.avatar?.url}`}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="pl-3">
            <h1 className="text-lg font-semibold text-gray-900">
              {userData?.name}
            </h1>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  activeStatus ? "bg-green-400" : "bg-gray-400"
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {activeStatus ? "Active now" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AiOutlineArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 px-4 py-3 overflow-y-auto bg-gray-50">
        {messages &&
          messages.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex w-full my-3 ${
                  item.sender === sellerId ? "justify-end" : "justify-start"
                }`}
                ref={scrollRef}
              >
                {item.sender !== sellerId && (
                  <img
                    src={`${userData?.avatar?.url}`}
                    className="w-8 h-8 rounded-full mr-3 mt-1 object-cover"
                    alt=""
                  />
                )}
                <div className="max-w-xs lg:max-w-md">
                  {item.images && (
                    <img
                      src={`${item.images?.url}`}
                      className="w-full max-w-[250px] h-auto object-cover rounded-2xl mb-2 shadow-sm"
                    />
                  )}
                  {item.text !== "" && (
                    <div>
                      <div
                        className={`px-4 py-2 rounded-2xl shadow-sm ${
                          item.sender === sellerId
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{item.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {format(item.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form
        className="p-4 bg-white border-t border-gray-200 flex items-center space-x-3"
        onSubmit={sendMessageHandler}
      >
        <div>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
              <TfiGallery size={20} className="text-gray-600" />
            </div>
          </label>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            required
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
          >
            <AiOutlineSend size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
