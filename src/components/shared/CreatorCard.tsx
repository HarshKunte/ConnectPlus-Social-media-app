import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Models } from "appwrite"

const CreatorCard = ({user}:{user:Models.Document}) => {
  return (
    <Link to={`/profile/${user.$id}`} className='border border-dark-4 flex flex-col px-16 py-6 rounded-3xl items-center'>
        <img
              src={
                // post.creator?.imageUrl ||
                user?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
            <div className=" my-4 text-center">

            <p className="small-regular lg:body-bold text-light-1">
              {user.name}
            </p>
            <p className="small-regular text-light-3">@{user.username}</p>
            </div>
            <Button
            type="button"
            className="shad-button_primary whitespace-nowrap px-6 py-2 text-sm rounded-lg">
            Follow
          </Button>
    </Link>
  )
}

export default CreatorCard