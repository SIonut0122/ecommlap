import { useEffect, useState } from "react";

function ProductInfoBottom(props) {

    const [displayDescription, setDisplayDescription] = useState(true);
    const [displaySpecs, setDisplaySpecs] = useState(false);
    const [displayReviews, setDisplayReviews] = useState(false);
    const [productInfo,setProductInfo] = useState(props.productInfo);

    useEffect(() => {
    
        let decrNavTypes = document.querySelectorAll('.prodinfo-inav-btn');
        decrNavTypes.forEach(el => el.addEventListener('click', (e) => toggleBottomDescr(e)));
        console.log(productInfo);
    },[])

        
    const toggleBottomDescr = (e) => {
 
        setDisplayDescription(false);
        setDisplaySpecs(false);
        setDisplayReviews(false);
        
        // Select / deselect info product buttons
        document.querySelectorAll('.prodinfo-inav-btn').forEach(el => el.classList.add('unselected-nav-info'));
        e.target.classList.remove('unselected-nav-info');
        e.target.classList.add('selected-nav-info');

        let type = e.target.getAttribute('data-descr');
        switch(type) {
            case "description":
                setDisplayDescription(true);
            break;
            case "specifications":
                setDisplaySpecs(true);
            break;
            default:
                setDisplayReviews(true);

        }
    }


    return (
        <div>
            <div className="prodinfo-infobottom-nav">
                <div className="container">
                <span className='prodinfo-inav-btn selected-nav-info' data-descr='description'>Descriere</span>
                <span className='prodinfo-inav-btn' data-descr='specifications'>Specificatii</span>
                <span className='prodinfo-inav-btn' data-descr='reviews'>Review-uri (17)</span>
                </div>
            </div>
            <div className="prodinfo-infobottom-cont container">
                {displayDescription && (
                      <>
                        {productInfo.info && (
                            productInfo.info.map((el,index) =>
                                <p className="prodinfo-el" key={index}><i className="bi bi-arrow-right-square-fill"></i> {el}</p>
                            )
                        )}
                      </>
                )}
                 {displaySpecs && (
                    <>
                      {productInfo.specs && (
                        <>
                            {Object.entries(productInfo.specs).map(([key,value]) => (
                               <p className="prodinfo-specs-item" key={key}>
                                <span className="prodinfospec-key">{key}:</span> 
                                <span className="prodinfospec-value">{value}</span>
                               </p>
                            ))}
                        </>
                      )}
                    </>
                )}
                 {displayReviews && (
                    <div>Reviews</div>
                )}
            </div>
        </div>
    )
  }

export default ProductInfoBottom;