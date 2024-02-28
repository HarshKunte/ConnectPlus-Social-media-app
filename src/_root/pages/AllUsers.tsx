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
    <div className="py-10 px-5 md:p-14 w-full">
      <h2 className="h3-bold md:h2-bold w-full">Other Users</h2>
      <div className="flex gap-5 md:gap-10 flex-wrap items-center justify-center md:justify-start mt-10">
        {allUsers?.documents?.map(
          (item) => item.$id !== user.id && <CreatorCard key={item.$id} user={item} />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
