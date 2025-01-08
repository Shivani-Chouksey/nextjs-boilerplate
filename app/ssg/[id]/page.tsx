// app/ssg/[id]/page.tsx
import { Metadata } from "next";

// Types
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  params: { id: string };
};

// Fetch function
async function fetchUserData(id: string): Promise<User> {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      next: {
        revalidate: 60,
        tags: [`user-${id}`],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[API] Error fetching user:", error);
    throw error;
  }
}

// UserDetail Component
function UserDetail({ user }: { user: User }) {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">User Detail</h3>
      <div className="space-y-4">
        <p className="text-lg">
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

// Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const user = await fetchUserData(params.id);
    return {
      title: `${user.firstName} ${user.lastName} - User Profile`,
      description: `Profile page for ${user.firstName} ${user.lastName}`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "User Profile",
      description: "User profile page",
    };
  }
}

// Main Page Component
export default async function Page({ params }: Props) {
  const user = await fetchUserData(params.id);
  return <UserDetail user={user} />;
}

// Static Params Generation
export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/users");
    const { users } = await res.json();

    return users.map((user: User) => ({
      id: user.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
