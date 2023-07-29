import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
// import getAllProducts from './modules/faunadb/getProducts';
import Button from '@mui/material/Button';

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
  },[isAuthenticated])

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
        <div className='home-container'>
          <Button type='submit' variant="contained">Hello World</Button>
         
              {isAuthenticated ? (
              user.name
              ) : (
                <div>No user</div>
              )}
        </div>
  );
}

export default Home;
