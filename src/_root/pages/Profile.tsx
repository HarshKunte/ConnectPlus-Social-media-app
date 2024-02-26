import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { LikedPosts } from ".";
import { useFollowUser, useGetCurrentUser, useGetUserById, useUnFollowUser } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {

  const [isFollowed, setIsFollowed] = useState(false)

  const {pathname} = useLocation()
  const { id } = useParams();

  const { user } = useUserContext();

  const { data: profileUser } = useGetUserById(id || ""); 
  const {mutate:followUser, isPending:isFollowing} = useFollowUser();
  const {mutate:unFollowUser, isPending:isUnFollowing} = useUnFollowUser();

  const { data: currentUser } = useGetCurrentUser();

  const followedRecord = currentUser?.following.find(
    (record: Models.Document) => record.followed.$id === profileUser?.$id
  );
  

  useEffect(() => {
    setIsFollowed(!!followedRecord);
  }, [currentUser]);

  const handleFollowUnfollow = () =>{
    if(isFollowed){
      unFollowUser(followedRecord.$id)
      setIsFollowed(false)
    }else{
      followUser({currentUserId:user.id, followedUserId: profileUser?.$id || ""})
      if(!isFollowing) setIsFollowed(true)
    }
  }

  if (!profileUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
               profileUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {profileUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{profileUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={profileUser.posts.length} label="Posts" />
              <StatBlock value={profileUser.followersList.length} label="Followers" />
              <StatBlock value={profileUser.following.length} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {profileUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div>
            {user.id === profileUser.$id &&<Link
                to={`/update-profile/${profileUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
              }
            </div>
            {user.id !== profileUser.$id && <div>
              {isFollowed? <Button onClick={handleFollowUnfollow} type="button" className="shad-button_primary px-8">
                {isUnFollowing?<Loader/> : <>Unfollow</>}
              </Button> : 
              <Button onClick={handleFollowUnfollow} type="button" className="shad-button_primary px-8">
              {isFollowing?<Loader/> : <>Follow</>}
            </Button>}
            </div>}
          </div>
        </div>
      </div>

      {profileUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={profileUser.posts} showUser={false} />}
        />
        {profileUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts likedPosts={profileUser.liked}/>} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;