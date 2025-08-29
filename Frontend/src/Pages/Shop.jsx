
import Hero from '../Components/Hero/Hero'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLatter from '../Components/NewsLatter/NewsLatter'
import Offers from '../Components/Offers/Offers'
import Popular from '../Components/Popular/Popular'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLatter />
    </div>
  )
}

export default Shop
