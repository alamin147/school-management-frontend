import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Title from '../../Components/Title';
import violin from "../../images/violin-2560312_1280.jpg";
import whistle from "../../images/whistle-924346_1280.jpg";
import drum from "../../images/drums-7751985_1280.jpg";
import piano from "../../images/piano-3447281_1280.jpg";
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import CountdownTimer from './Countdown/Countdown';
import Stories from './Stories/Stories';
import Privacy from './Privacy/Privacy';



const Home = () => {

  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch('https://assignment-12-server-iota-two.vercel.app/popularClasses')
      .then(res => res.json())
      .then(result => {
        setPopular(result)
        // console.log(result)
      })
      .catch(error => console.log(error))
  }, [])

  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch('https://assignment-12-server-iota-two.vercel.app/instructors')
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        setInstructors(result)
      })
  }, [])



  return (
    <div>
      <Fade cascade damping={.1}>
        <div className='mb-11'>
          <Swiper slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">

            <SwiperSlide><img className='w-full' src={violin} alt="" /></SwiperSlide>
            <SwiperSlide><img className='w-full' src={whistle} alt="" /></SwiperSlide>
            <SwiperSlide><img className='w-full' src={drum} alt="" /></SwiperSlide>
            <SwiperSlide><img className='w-full' src={piano} alt="" /></SwiperSlide>
          </Swiper>
        </div>
      </Fade>
      {/* popular classes */}

      <div>
        <div className='mb-8'> <Title heading="Popular Classes"></Title></div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
          <Fade cascade damping={.1}>
            {popular.slice(0, 6).map(popular => {
              return <>
                <div className="mx-auto card w-96 bg-base-100 shadow-xl">
                  <figure><img src={popular.img} className='image-full' alt="" /></figure>
                  <div className="card-body">
                    <h2 className="card-title"><span className='font-medium'>Class Name:</span> {popular.className}</h2>
                    <p><span className='font-medium'>Instructor name: </span>{popular.name}</p>
                    <p><span className='font-medium'>Available seats: </span>{popular.seats}</p>
                    <p><span className='font-medium'>Price: </span>{popular.price}</p>
                    <p><span className='font-medium'>Total Enrolled: </span>{popular.totalEnroll}</p>
                    <div className="card-actions justify-end">
                      <Link to="/classes"><button className="btn btn-primary">Select Class</button></Link>
                    </div>
                  </div>
                </div>
              </>
            })
            }
          </Fade>

        </div>
      </div>

      {/* popular instructor */}


      <div>
        <div className='mt-16 mb-8'> <Title heading="Popular Instructors"></Title></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
          <Fade cascade damping={.1}>

            {
              instructors.slice(0, 6).map(instructor => {
                return <>
                  <div className="mx-auto card w-96 bg-base-100 shadow-xl">
                    <figure><img src={instructor.image} className='image-full' alt="" /></figure>
                    <div className="card-body">

                      <p><span className='font-medium'>Instructor name: </span>{instructor.name}</p>
                      <p><span className='font-medium'>Instructor Email: </span>{instructor.email}</p>

                      <p><span className='font-medium'>Total Enrolled: </span>10</p>
                      <div className="card-actions justify-end">
                        <Link to="/classes"><button className="btn btn-primary">See Classes</button></Link>
                      </div>
                    </div>
                  </div>
                </>
              })
            }
          </Fade>
        </div>
      </div>


      <div className="stats shadow w-full mt-28 stats-vertical lg:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">12% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Students enrolled</div>
          <div className="stat-value text-rose-700">5.2M</div>
          <div className="stat-desc">50k per month</div>
        </div>
      </div>
      <h3 className='text-primary font-bold mt-8 text-center'>Grab the Classes 25% off </h3>
      <CountdownTimer></CountdownTimer>
      <div className='mt-16 mb-8'> <Title heading="Our Stories"></Title></div>
      <div className='flex justify-center mx-auto w-1/2'> <Stories></Stories></div>

{/* reviews */}
      <div className='mt-16 mb-8'> <Title heading="Reviews"></Title></div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src="https://img.freepik.com/free-photo/handsome-young-businessman-suit_273609-6513.jpg?w=1380&t=st=1693801826~exp=1693802426~hmac=8a1b701f952797f5fc4e855c93a610c8ec42ee1729bde1b63e993eb1b751d96a" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Amazing</h2>
                <p>I've always wanted to be a rock star, and the guitar is helping me live that dream. Strumming those chords brings out the inner musician in me.</p>
                
            </div>
        </div>
      <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src="https://img.freepik.com/free-photo/young-african-american-musician-playing-guitar-like-rockstar-gradient-green-yellow-background_155003-32324.jpg?w=1380&t=st=1693750735~exp=1693751335~hmac=c6ad712c7f0dc0ae7825035fc843e2808ea86c911f498dfe51112acbc2d4025c" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Awesome</h2>
                <p>I've always wanted to be a rock star, and the guitar is helping me live that dream. Strumming those chords brings out the inner musician in me.</p>
                
            </div>
        </div>
      <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src="https://img.freepik.com/free-photo/portrait-african-american-model_23-2149072164.jpg?w=1380&t=st=1693801821~exp=1693802421~hmac=bea63bc9ea818e834ce40a08e08509f192995fbb7d4b226b40fc27733603458e" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Mind blowing</h2>
                <p>I've always wanted to be a rock star, and the guitar is helping me live that dream. Strumming those chords brings out the inner musician in me.</p>
                
            </div>
        </div>
      </div>
      <div className='mt-16 mb-8'> <Title heading="Privacy Policy"></Title></div>
<div className='container mx-auto'><Privacy></Privacy></div>
<div className='mt-16 mb-8'> <Title heading="Steps"></Title></div>
<div className='container mx-auto text-center'>
<ul className="steps steps-vertical lg:steps-horizontal">
  <li className="step step-primary">Register</li>
  <li className="step step-primary">Verify</li>
  <li className="step step-primary">Login</li>
  <li className="step step-primary">Choose Classes</li>
  <li className="step step-primary">Purchase</li>
  
</ul>
</div>
    </div>

  );
};

export default Home;