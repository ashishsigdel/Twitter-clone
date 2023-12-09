import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const userDetail = currentUser;
  const randomUsersResults = [
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
    {
      login: { username: "user1" },
      picture: {
        thumbnail:
          "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      },
      name: { first: "First1", last: "Last1" },
    },
  ];
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto ">
      {/* sidebar */}

      <Sidebar />

      {/* posts */}
      <Feed />
      {/* widgets */}
      <Widgets randomUsersResults={randomUsersResults} />
      {/* modal */}
    </main>
  );
}
