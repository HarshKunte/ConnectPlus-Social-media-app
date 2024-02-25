import CreatorCard from './CreatorCard'

const TopCreatorsSidebar = () => {
  return (
    <section className='py-10 px-5'>
      <h3 className="h3-bold md:h3-bold text-left w-full mb-10">Top Creators</h3>  
    <div className='rightsidebar'>
        <CreatorCard/>
        <CreatorCard/>
    </div>
    </section>
  )
}

export default TopCreatorsSidebar