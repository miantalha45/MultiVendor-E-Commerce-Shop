import { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

function ProfilePage() {
  const [active, setActive] = useState(1);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <div className="flex-1">
            <ProfileContent active={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
