import item1 from '../../images/bg-img/sr1.jpg'
import item2 from '../../images/bg-img/sr2.jpg'
import item3 from '../../images/bg-img/sr3.jpg'
import item4 from '../../images/bg-img/sr4.jpg'
import item5 from '../../images/bg-img/sr5.jpg'
import item6 from '../../images/bg-img/sr6.jpg'
import item7 from '../../images/bg-img/sr7.jpg'
import item8 from '../../images/bg-img/sr8.jpg'
import item9 from '../../images/bg-img/sr9.jpg'

const RecipeList = () => {
  return (
    <>
    <div className="container mx-auto py-20">
        <div className="grid grid-cols-3 gap-10">
            <div className='flex gap-4'>
                <img src={item1}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Homemade italian pasta</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item2}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Baked Bread</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item3}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Scalops on salt</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item4}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Fruits on plate</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item5}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'> Macaroons</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item6}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Chocolate tart</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item7}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Berry Desert</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item8}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Zucchini Grilled on peper</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>

            <div className='flex gap-4'>
                <img src={item9}/>
            <div>
                <p className='text-xs text-[#40ba37] font-normal'>January 04, 2018</p>
                <p className='text-lg font-semibold text-black'>Chicken Salad</p>
                <p className='my-1'>Ratings</p>
                <p className='text-xs font-normal'>2 Comments</p>
            </div>
            </div>


        </div>

    </div>
    </>
  )
}

export default RecipeList