import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 ">
      <div className=" min-h-screen flex flex-col items-center">
        <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img
                src={avatar ? avatar : `${seller.avatar?.url}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                alt=""
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera size={24} className="text-white" />
                </label>
              </div>
            </div>
          </div>

          {/* shop info */}
          <form
            aria-aria-required={true}
            className="flex flex-col items-center"
            onSubmit={updateHandler}
          >
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name
                </label>
              </div>
              <input
                type="name"
                placeholder={`${seller.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop description
                </label>
              </div>
              <input
                type="name"
                placeholder={`${
                  seller?.description
                    ? seller.description
                    : "Enter your shop description"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Address
                </label>
              </div>
              <input
                type="name"
                placeholder={seller?.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Phone Number
                </label>
              </div>
              <input
                type="number"
                placeholder={seller?.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <div className="w-full pl-[3%]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Zip Code
                </label>
              </div>
              <input
                type="number"
                placeholder={seller?.zipCode}
                value={zipCode}
                onChange={(e) => setZipcode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
              <input
                type="submit"
                value="Update Shop"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                required
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopSettings;
