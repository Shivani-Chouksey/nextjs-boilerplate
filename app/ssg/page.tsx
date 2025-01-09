// import Image from "next/image";
import React from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
};

type UsersPageProps = {
  users: User[];
};

// Component to display user list
const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Static Site Generated Users
        </h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Static Site Generation for data fetching
export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) {
    console.error("Failed to fetch users");
    return [];
  }
  const data = await response.json();
  return data.users.map((user: User) => ({
    id: user.id.toString(),
  }));
}

export async function generateMetadata() {
  return {
    title: "Users | Static Site Generation",
  };
}

export default async function Page() {
  const response = await fetch("https://dummyjson.com/users", {
    cache: "force-cache", // Ensures SSG behavior
  });

  if (!response.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">Failed to fetch users.</p>
        </div>
      </div>
    );
  }

  const data = await response.json();
  const users = data.users;

  return <UsersPage users={users} />;
}
