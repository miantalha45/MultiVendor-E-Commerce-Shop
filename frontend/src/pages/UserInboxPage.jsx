import { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
const ENDPOINT = "http://localhost:3000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInboxPage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
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
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
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
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        // console.log(data);
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    console.log(online);
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
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
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
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
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
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: e,
            sender: user._id,
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
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {!open && (
        <>
          <Header />
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Messages
              </h1>
              <p className="text-gray-600">
                Connect with your favorite shops and sellers
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {conversations && conversations.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {conversations.map((item, index) => (
                    <MessageList
                      data={item}
                      key={index}
                      index={index}
                      setOpen={setOpen}
                      setCurrentChat={setCurrentChat}
                      me={user?._id}
                      setUserData={setUserData}
                      userData={userData}
                      online={onlineCheck(item)}
                      setActiveStatus={setActiveStatus}
                      loading={loading}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-8">
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
                    No conversations yet
                  </h3>
                  <p className="text-gray-500">
                    Start shopping to connect with sellers and get support.
                  </p>
                </div>
              )}
            </div>
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
          sellerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
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
  userData,
  online,
  setActiveStatus,
  loading,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full flex p-4 transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
        active === index
          ? "bg-blue-50 border-l-4 border-blue-500"
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
          {!loading && data?.lastMessageId !== userData?._id
            ? "You:"
            : userData?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex p-4 items-center justify-between bg-white border-b border-gray-200 shadow-sm">
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

      <div className="flex-1 px-4 py-3 overflow-y-auto bg-gray-50">
        {messages &&
          messages.map((item, index) => (
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
          ))}
      </div>

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

export default UserInboxPage;
