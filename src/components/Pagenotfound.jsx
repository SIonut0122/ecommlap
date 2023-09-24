import laptop404img from '../assets/images/homepage/404_not_found.png';


function PageNotFound() {
  return (
        <div className='pagenotfound-container'>
                <div className="pagenotfound-cont container">
                        <img src={laptop404img} alt="Pagina nu exist"/>
                        <h3>404</h3>
                        <h4>Pagina nu a fost gasita</h4>
                </div>
        </div>
  );
}

export default PageNotFound;
