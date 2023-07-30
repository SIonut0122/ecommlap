import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
// import getAllProducts from './modules/faunadb/getProducts';
import Button from '@mui/material/Button';
import img1 from '../assets/images/homepage/img-1.png';
import img2 from '../assets/images/homepage/img-2.png';
import img3 from '../assets/images/homepage/img-3.png';
import deploy from '../assets/images/homepage/deploy.png';
import envCard from '../assets/images/homepage/env-card.png';
import type from '../assets/images/homepage/type.png';


function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getAllProducts;
  //     if(data) {
  //       console.log(data[0].data);
  //     }
  //   }

  //   fetchProducts() 
  //   .catch(console.error);
  // },[])

  useEffect(() => {
    document.title = 'Magazin online - Laptopuri, accesorii - Comanda online'

    setScrollVar();

    document.querySelectorAll("[data-img-to-show]").forEach(section => {
      observer.observe(section)
    })
   

    window.addEventListener("scroll", setScrollVar)
    window.addEventListener("resize", setScrollVar) 

    return () => {
      window.removeEventListener("scroll", setScrollVar)
    window.removeEventListener("resize", setScrollVar)
    }
  },[]);

  
  const setScrollVar = () => {
    const htmlElement = document.documentElement
    const percentOfScreenHeightScrolled =
      htmlElement.scrollTop / htmlElement.clientHeight
    // console.log(Math.min(percentOfScreenHeightScrolled * 100, 100))
    htmlElement.style.setProperty("--scroll",Math.min(percentOfScreenHeightScrolled * 100, 100))

 

    const deployImage = document.querySelector('.deploy');
    const envCard = document.querySelector('.envcard');
    const typeCard  = document.querySelector('.type');
    // Move the image to the right using translateY based on scroll percentage
    deployImage.style.transform = `translateX(${Math.min(percentOfScreenHeightScrolled * 100, 100)}%)`;
    envCard.style.transform = `translateY(${Math.min(percentOfScreenHeightScrolled * 100, 100)}%) translateX(${Math.min(percentOfScreenHeightScrolled * 50, 50)}%)`;
    typeCard.style.transform = `translateX(${Math.min(percentOfScreenHeightScrolled * 100, 100)}%)`;
  
  }

  const observer = new IntersectionObserver(entries => {
    for (let i = entries.length - 1; i >= 0; i--) {
      const entry = entries[i]
      if (entry.isIntersecting) {
        document.querySelectorAll("[data-img]").forEach(img => {
          img.classList.remove("show")
        })
        console.log(entry.target.dataset);
        const img = document.querySelector(entry.target.dataset.imgToShow)
        img?.classList.add("show")
        break
      }
    }
  })
  
  return (
        <div className='home-container-wrapper'>
            <div className="home-container container">
                <div className="imgs container">
                  <img
                    src={img1}
                    data-img
                    id="img-1"
                    className="top-section-img show container"
                  />
                  <img className="container" src={img2} data-img id="img-2" />
                  <img className="container" src={img3} data-img id="img-3" />
              </div>
              <section className="top-section full-screen-section">
                <div className="left">
                  <h1>Magazinul tau online de tehnologie</h1>
                  <p>
                    The only platform that gives AI the ability to autonomously build web
                    services.
                  </p>
                </div>
                <div className="right">
                <img className="deploy" src={deploy} data-img-right />
                <img className="envcard" src={envCard} data-img-right />
                <img className="type" src={type} data-img-right />
                </div>
              </section>
              <section className="full-screen-section first-main-section">
                <h1>Completely Visual</h1>
                <p>Never touch the command line, from provision to production.</p>
                <div data-img-to-show="#img-1"></div>
              </section>
              <section className="full-screen-section">
                <h1>Full Stack</h1>
                <p>
                  Never manage infrastructure again. One click gets you: a database, APIs,
                  deployments, hosting, etc.
                </p>
                <div data-img-to-show="#img-2"></div>
              </section>
              <section className="full-screen-section">
                <h1>Launch Faster</h1>
                <p>Logical can get systems to market in minutes instead of weeks.</p>
                <div data-img-to-show="#img-3"></div>
              </section>
            </div>
        </div>
  );
}

export default Home;
