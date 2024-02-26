import { useGetAllUsers } from '@/lib/react-query/queriesAndMutation'
import CreatorCard from './CreatorCard'
import { useUserContext } from '@/context/AuthContext';
import Loader from './Loader';

const TopCreatorsSidebar = () => {

  const {user} = useUserContext()
  const {data:allUsers, isFetching} = useGetAllUsers();

  if(isFetching){
    return <Loader/>
  }

  return (
    <section className='py-10 px-5'>
      <h3 className="h3-bold md:h3-bold text-left w-full mb-10">Top Creators</h3>  
    <div className='rightsidebar'>
        {
          allUsers?.documents?.map((item)=>(
            item.$id !== user.id &&(
              <CreatorCard key={item.$id} user={item}/>
            )
          ))
        }
    </div>
    </section>
  )
}

export default TopCreatorsSidebar