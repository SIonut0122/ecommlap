import React, {useEffect, useState, useContext, createContext} from "react";
import { HashRouter,Routes,Route,Link , BrowserRouter}     from 'react-router-dom'; 
import './assets/js/js';
import Header from './components/includes/Header';
import Home from './components/Home';
import PageNotFound from './components/Pagenotfound';
import About from './components/About';
import AllProducts from './components/Allproducts';
import ViewProductInfo from './components/ViewProductInfo';
import Cart from './components/Cart';
import Login from './components/Login';
import Favorites from './components/Favorites';
import products from './assets/js/products';
import accessories from './assets/js/accessories';
import Checkout from './components/Checkout';
import FinishedOrder from './components/Finished-order';
import Search from './components/Search';
import Offers from './components/Offers';
import Contact from './components/Contact';
import MyAccount from './components/MyAccount';




  export const MainContext = React.createContext();

function MainHome() {
  const [count, setCount] = useState(0);
  const [cartContext, setCartContext] = useState([]);
  const [favoritesContext, setFavoritesContext] = useState([]);
  const [cartTotalContext, setCartTotalContext] = useState(0);
  const [productsContext, setProductsContext] = useState(products);
  const [accessoriesContext, setAccessoriesContext] = useState(accessories);
  const [productsUpdated, setProductsUpdated] = useState(false);
  const [displayAddedToCartMsg, setDisplayAddedToCartMsg] = useState(false);
  const [currentAddedToCart, setCurrentAddedToCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [pureProductsList, setPureProductsList] = useState([]);
  const [displayFilteredProducts, setDisplayFilteredProducts] = useState(false);
  const [proceedToCheckout, setProceedToCheckout] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const [displayOffers, setDisplayOffers] = useState(false);



  useEffect(() => {
    // Check localStorage
    // cart
    if(localStorage.getItem('cart') !== null && localStorage.getItem('cart').length > 0) {
      let localStorageCart = JSON.parse(localStorage.getItem('cart'));
      setCartContext(JSON.parse(localStorage.getItem('cart')))
    }
      // favorites
      if(localStorage.getItem('favorites') !== null && localStorage.getItem('favorites').length > 0) {
        let localStorageFavorites = JSON.parse(localStorage.getItem('favorites'));
        setFavoritesContext(localStorageFavorites);
        // Check and add 'favorites icon' to product if was added to the wislish
        checkWishlistItems(localStorageFavorites);
      }
  }, [])

  useEffect(() => {
    // When a product is added to Wishlist, add 'favorites icon' to product card
    checkWishlistItems(favoritesContext);
  },[favoritesContext])

  const checkWishlistItems = (e) => {
    let favoritesID = favoritesContext.map(el => el.id);
    let updateProducts = [...productsContext];

    // Loop through favorites array IDs
   for(let i=0; i < favoritesID.length; i++) {
    // Loop through all products
      // If favoritesId match product, set addedToFav to true;
      for(let z=0; z < updateProducts.length; z++) {
          if(updateProducts[z].id === favoritesID[i]) {
            updateProducts[z].addedToFav = true;
          } 
          // If loop through favoritesID is done, proceed
          if(i == z) {
            setProductsContext(updateProducts);
          }
      }
    
    }
  }

  
  return (
<BrowserRouter basename="/ecommlap">
    <div className='main_container'>
      <div className="main-cont-backdrop"></div>
      
      <section className='w-100 main-content p-0'>

        <div className='main-content-wrap'>
              <MainContext.Provider value={{ 
                  count, setCount, 
                  cartContext, setCartContext, 
                  favoritesContext, setFavoritesContext,
                  cartTotalContext, setCartTotalContext,
                  productsContext, setProductsContext,
                  displayAddedToCartMsg, setDisplayAddedToCartMsg,
                  currentAddedToCart, setCurrentAddedToCart,
                  selectedProduct, setSelectedProduct,
                  accessoriesContext, setAccessoriesContext,
                  pureProductsList, setPureProductsList,
                  displayFilteredProducts, setDisplayFilteredProducts,
                  proceedToCheckout, setProceedToCheckout,
                  successOrder, setSuccessOrder,
                  displayOffers, setDisplayOffers
                }}>
                <Header />
                
                
                <Routes>    
                    <Route path="*" element={<PageNotFound />}></Route>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/products" element={<AllProducts/>}></Route>
                    <Route path="/viewproduct/:id" element={<ViewProductInfo />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/favorites" element={<Favorites />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/order-summary" element={<FinishedOrder />}></Route>
                    <Route path="/offers" element={<Offers />}></Route>
                    <Route path="/search-results/:query" element={<Search />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/myaccount" element={<MyAccount />}></Route>
                </Routes>
                   
              </MainContext.Provider>
        
        </div>
      </section>

    </div>
    </BrowserRouter>

  );
}

export default MainHome;
