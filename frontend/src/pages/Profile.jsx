import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileItems from "../components/ProfileItems";
import ProfileUpdateModal from "../components/ProfileUpdateModal";

export default function Profile() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto ">
      {/* sidebar */}

      <Sidebar />

      {/* posts */}
      <ProfileItems />

      {/* modal */}
      <ProfileUpdateModal />
    </main>
  );
}
