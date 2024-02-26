import CreatorCard from "@/components/shared/CreatorCard";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutation";

const AllUsers = () => {
  const { user } = useUserContext();
  const { data: allUsers, isFetching } = useGetAllUsers();

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="py-10 px-5 md:p-14">
      <h2 className="h3-bold md:h2-bold w-full">Other Users</h2>
      <div className="flex gap-10 flex-wrap items-start mt-10">
        {allUsers?.documents?.map(
          (item) => item.$id !== user.id && <CreatorCard user={item} />
        )}
        
      </div>
    </div>
  );
};

export default AllUsers;
