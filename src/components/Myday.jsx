import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const Myday = () => {

    const myday = [
        {
            img : 'https://img.freepik.com/free-photo/overheating-planet-earth-global-warming-campaign-mixed-media_53876-104835.jpg?w=740&t=st=1669461118~exp=1669461718~hmac=4764282a1b454bc98cdf0726e3be6bab1668d4d4850ed69fe5ebd3c7cd4c4183',
            accImg : 'https://scontent.frgn7-3.fna.fbcdn.net/v/t39.30808-1/309028348_612947263895538_3289164825885167559_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=103&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=Le4Fg3tqjFIAX-FyfRu&_nc_ht=scontent.frgn7-3.fna&oh=00_AfBjH9HNGqy8V_pNphjvdkIPtWYWpIwYZP0QQTLlDS3iOw&oe=63840BE0',
            name : 'Elliot Morton'
        },
        {
            img : 'https://img.freepik.com/premium-vector/vector-illustration-rockstar-guitarist-poster_5883-959.jpg?w=740',
            accImg : 'https://images.mubicdn.net/images/cast_member/24666/cache-194236-1610749412/image-w856.jpg?size=160x',
            name : 'Andrew Garfield'
        },
        {
            img : 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/2/20/First_Order.jpg?width=640',
            accImg : 'https://lumiere-a.akamaihd.net/v1/images/poe-main_611e1021.jpeg?region=0%2C0%2C1280%2C720&width=768',
            name : 'Poe Maderon'
        },
        {
            img : 'https://static.wikia.nocookie.net/star-wars-canon-extended/images/1/12/Padme4.jpg',
            accImg : 'https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg?region=0%2C67%2C1280%2C720&width=768',
            name : 'Darth Vader'
        },
        {
            img : 'https://static.wikia.nocookie.net/starwars/images/7/70/DSI-HDapproach.png',
            accImg : 'https://wegotthiscovered.com/wp-content/uploads/2022/09/Star-Wars-Mace-Windu-lucasarts.jpg?resize=640,360',
            name : 'Mace Windu'
        }
    ]

  return (
    <Swiper
    modules={[Navigation, A11y]}
    spaceBetween={10}
    slidesPerView={5}
    navigation
    >
    {
        myday.map((i,index) => (
            <SwiperSlide key={index}>
                <div className='w-full h-[200px] rounded-[10px] overflow-hidden group relative cursor-pointer'>
                    <img className='w-full h-full object-cover brightness-[70%] group-hover:scale-[1.05] duration-200' src={i.img} alt="" />
                    <img className='w-[40px] h-[40px] rounded-full absolute top-[15px] left-[15px] object-cover border-white border-2' src={i.accImg} alt="" />
                    <h1 className='font-medium text-white absolute bottom-[15px] left-[15px] text-[13px]'>{i.name}</h1>
                </div>
            </SwiperSlide>
        ))
    }
    </Swiper>
)
}

export default Myday