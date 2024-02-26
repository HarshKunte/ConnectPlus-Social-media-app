import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import SavedPostContainer from "@/components/shared/SavedPostContainer";


const Saved = () => {
  const { ref, inView } = useInView();
  const {user} = useUserContext()
  const { data: posts, isRefetching, isPending:isFetching, fetchNextPage, hasNextPage } = useGetSavedPosts(user.id);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!posts || isFetching || isRefetching)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowPosts = posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        { shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <SavedPostContainer key={`page-${index}`} documents={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Saved;