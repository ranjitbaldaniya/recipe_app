import BestRecipe from './BestRecipe'
import Cards from './Cards'
import CarouselComponent from './Carousel'
import FollowInstagram from './FollowInstagram'
import Footer from './Footer'
import FreeRecipe from './FreeRecipe'
// import Header from './Header'
import Navbar from './Navbar'
import RecipeList from './RecipeList'
import Subscribe from './Subscribe'

const Homepage = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <div className='p-12'> */}
      <Navbar />
      {/* <CarouselComponent />
      <Cards />
      <BestRecipe /> */}
      {/* </div> */}
      {/* <FreeRecipe /> */}
      <RecipeList />
      <Subscribe />
      <FollowInstagram />
      <Footer />
    </div>
  )
}

export default Homepage
