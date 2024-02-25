
import { Models } from "appwrite"
import GridPostList from "./GridPostList";
import { useEffect, useState } from "react";

type SavedPostContainerListProps = {
    documents: Models.Document[];
  };
const SavedPostContainer = ({documents}:SavedPostContainerListProps) => {
    const [posts, setPosts] = useState<Models.Document[]>([]);

    useEffect(()=>{
        const onlyPosts:Models.Document[] = documents?.map((item)=> item.post);
        setPosts(onlyPosts)
    },[documents])
  return (
    <GridPostList posts={posts} showStats={false}/>
  )
}

export default SavedPostContainer