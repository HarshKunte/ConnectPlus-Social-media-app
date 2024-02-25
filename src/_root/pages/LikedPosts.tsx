import GridPostList from "@/components/shared/GridPostList";
import { Models } from "appwrite";

type LikedPostListProps = {
  likedPosts: Models.Document[];
};

const LikedPosts = ({likedPosts}:LikedPostListProps) => {
  
  return (
    <GridPostList posts={likedPosts} showStats={false}/>
  )
}

export default LikedPosts