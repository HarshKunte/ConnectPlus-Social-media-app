import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import getLikedPeople, { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
  showLikedPeople?:boolean;
};

const PostStats = ({ post, userId, showLikedPeople=true }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending:isLikingPost } = useLikePost();
  const { mutate: savePost, isPending:isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending:isUnSavingPost } = useDeleteSavedPost();
  const [likedPeople, setLikedPeople] = useState('')
  

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  useEffect(()=>{
    const likedUserNames = post.likes.map((item:Models.Document)=> item.username);
    const likedPeopleString = getLikedPeople(likedUserNames);

    setLikedPeople(likedPeopleString);
},[post.likes])


  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        {
          isLikingPost?(
            <Loader/>
          ):(
            <>
            <div className="flex items-center">

            <img
            src={`${
              checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={(e) => handleLikePost(e)}
            className="cursor-pointer"
            />
          <p className="ml-1 small-medium lg:base-medium">{likes.length} </p>
            </div>
          {showLikedPeople && likes.length>0 && <p className="text-sm ml-3">liked by {likedPeople}</p>}
          </>
          )
        }
       
      </div>

      <div className="flex gap-2">
        {
          (isSavingPost || isUnSavingPost)?(
            <Loader/>
          ):(
            <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
          )
        }
        
      </div>
    </div>
  );
};

export default PostStats;