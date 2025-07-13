import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface User {
  username: string;
}

const Users = () => {
  const [users, setUser] = useState<User[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });

        console.log("User response :", response);

        isMounted && setUser(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <div>
        {users?.length !== 0 ? (
          <>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user?.username}</li>
              ))}
            </ul>
            ;
          </>
        ) : (
          <span>No user found</span>
        )}
      </div>
    </>
  );
};

export default Users;
