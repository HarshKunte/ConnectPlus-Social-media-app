import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import { Spotify } from "react-spotify-embed";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link ">
            {post.imageUrl && <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />}
            {
              post.musicUrl && <Spotify className="p-4" link={post.musicUrl}/>
            }
             {!post.imageUrl && !post.musicUrl && <div className="h-full flex items-center">

               <p className="overflow-ellipsis whitespace-nowrap overflow-hidden p-5">
                {post.caption}
              </p>
             </div>} 
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;