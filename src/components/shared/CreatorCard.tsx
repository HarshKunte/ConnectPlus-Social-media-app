import { Link } from "react-router-dom"
import { Models } from "appwrite"

const CreatorCard = ({user}:{user:Models.Document}) => {
  return (
    <Link to={`/profile/${user.$id}`} className='border border-dark-4 flex flex-col px-8 py-6 md:px-16 md:py-6 rounded-3xl items-center'>
        <img
              src={
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
            <p className="small-regular text-light-1 mt-4">{user.followersList.length} followers</p>
            </div>
            
    </Link>
  )
}

export default CreatorCard