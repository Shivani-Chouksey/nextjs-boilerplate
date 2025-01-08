import { Metadata } from "next";
import React from "react";

// Types
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export const metadata: Metadata = {
  title: "Users | Server Side Rendering",
  description: "view all users with server-side rendering",
};

function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

// Server Component for Error State
function ErrorState() {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Error Loading Users
      </h2>
      <p className="text-gray-600">
        There was a problem loading the user data. Please try again later.
      </p>
    </div>
  );
}

// Main Page Component
export default async function UsersPage() {
  try {
    // This fetch will be executed on the server at request time
    const response = await fetch("https://dummyjson.com/users", {
      // Optional: Add cache control headers
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const { users }: { users: User[] } = await response.json();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Users List</h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error while fetching users:", error);
    return <ErrorState />;
  }
}

// Optional: Add loading state
export function loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Loading Users...</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md p-6 animate-pulse h-32"
          />
        ))}
      </div>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   try {
//     const response = await fetch("https://dummyjson.com/users");
//     if (!response.ok) {
//       throw new Error("Error While Fetching User ");
//     }
//     const { users } = await response.json();

//     // Pass user data to the page via props
//     return { props: { users } };
//   } catch (error) {
//     console.log("Error While Fetching USer Server Side Rendering ", error);

//     return { props: { users: [] } };
//   }
// };
