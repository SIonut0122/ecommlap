import React, {useEffect, useState,useContext,useRef } from "react";
import MainHome, { MainContext} from "../MainHome";
import PaginatedItems from './PaginatedItems';
import AddedToCartDisplay from './modules/addedtocartdisplay';
import {Link }     from 'react-router-dom'; 
import IconButton from '@mui/material/IconButton';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import CircularProgress from '@mui/material/CircularProgress';



function AllProducts() {
  const { count, setCount } = useContext(MainContext);
  const { cartContext, setCartContext } = useContext(MainContext);
  const { productsContext, setProductsContext } = useContext(MainContext);
  const { accessoriesContext, setAccessoriesContext } = useContext(MainContext);
  const { favoritesContext, setFavoritesContext } = useContext(MainContext);
  const { displayAddedToCartMsg, setDisplayAddedToCartMsg } = useContext(MainContext);
  const { currentAddedToCart, setCurrentAddedToCart } = useContext(MainContext);
  const { pureProductsList, setPureProductsList } = useContext(MainContext);
  const {displayFilteredProducts, setDisplayFilteredProducts} = useContext(MainContext);


  
  const [filterRanger, setFilterRanger] = useState(0);
  const [filterPriceMaxInput, setFilterPriceMaxInput] = useState(0);
  const [viewProductsMode, setViewProductsMode] = useState('grid');
  const [filteredTerms, setFilteredTerms] = useState([]);

  const [sortByOption, setSortByOption] = useState('Ordine implicita');
  const [displayTypeProducts, setDisplayTypeProducts] = useState('laptopuri');

  const filterAvailability = ['In stoc', 'Stoc epuizat', 'Noutati', 'Promotii'];
  const filterColorsList = [{color: 'black', roColor: 'negru'},{color: 'silver', roColor: 'argintiu'},{color: '#e9d0ae', roColor: 'sand'},{color: '#8eadac', roColor: 'fogblue'}];
  const filterBrandsList = ['Asus','Benq', 'Acer', 'Hama', 'Desq', 'Apple'];
  const filterProductsType = ['Laptopuri','Accesorii'];


  const [passingTags, setPassingTags] = useState({
    brand: { 'Asus': false, 'Benq': false, 'Acer': false, 'Hama': false, 'Desq': false, 'Apple': false},
    availability: {'In stoc': false, 'Stop epuizat': false, 'Noutati': false, 'Promotii': false},
    color: {'negru': false, 'argintiu': false, 'sand': false, 'fogblue': false},
    productType: {'laptopuri': false,'accesorii': false}
  })

  const sortByValueTerms = ['Ordine implicita', 'Nume (a-z)', 'Nume (z-a)', 'Pret (Crescator)', 'Pret (Descrescator)','Rating (Crescator)', 'Rating (Descrescator)'];

  const [priceRangerReleasedClick, setPriceRangerReleasedClick] = useState(true);
 
  const [cart, setCart] = useState([]);

  const [sortedProducts, setSortedProducts] = useState([]);
  const [displayLoading, setDisplayLoading] = useState(false);
  const { displayOffers, setDisplayOffers } = useContext(MainContext);


 
  useEffect(() => {
    setPureProductsList(productsContext);
    // Add listener for filter titles - show / hide
   let filterTitles = document.querySelectorAll('.ap-filbox-title');
   filterTitles.forEach(el => el.addEventListener('click', showHideFilterBox));

  //  setFilter('color','negru');

   // Select default sort by option value on render
   document.querySelector('.sortby-op-val-default').setAttribute('selected', 'selected');

   // Get filter products number (to be displayed on the right of filter name)
   getFilterProductsNumber();

    // // Hide loading, show filtered products
    setTimeout(() => {
    setDisplayFilteredProducts(true);
  }, 400);

  return () => {
    setDisplayAddedToCartMsg(false);
    setDisplayOffers(false);
  };
  },[])

  

  useEffect(() => {
    let filterPrice = Number(filterPriceMaxInput);
    
    let updatedProducts = [];
    let updateByFilter = searchProducts(productsContext);
    updatedProducts = updateByFilter;

    // If filter price > 0 and price ranger click released
    if(filterPrice > 0 && priceRangerReleasedClick) {
      let updateByPrice = updateFilterInputPrice(updatedProducts);
      updatedProducts = updateByPrice;
    }
    setPureProductsList(updatedProducts);

    // When filter is clicked, check if sorted option was active and pass updated filter products to sortby function to display results
    if(sortedProducts.length > 0) {
      sortBy(updatedProducts);
    }
  },[passingTags]);

  useEffect(() => {
    let updatedProducts = [];
    
    // On price ranger click release
    if(priceRangerReleasedClick) {
      // Update products by filter ranger price
      let updateByPrice = updateFilterInputPrice(productsContext);
      updatedProducts = updateByPrice;
      // If filtered terms exists
      if(filteredTerms.length > 0) {
        let updateByFilter = searchProducts(updatedProducts);
        updatedProducts = updateByFilter;
      }
      setPureProductsList(updatedProducts);

      // When filter is clicked, check if sorted option was active and pass updated filter products to sortby function to display results
      if(sortedProducts.length > 0) {
        sortBy(updatedProducts);
      }
    }

  },[filterPriceMaxInput]);


  // Check if offers
  useEffect(() => {
    if(displayOffers) {
      setFilter('availability', 'Promotii');

      let input = document.querySelector('#Promotii');
      input.checked = true;
    }
  },[displayOffers]);

  useEffect(() => {
    if(viewProductsMode == 'list') {
      selectedProductsView(null,'list');
    } else {
      selectedProductsView(null,'grid');
    }
  },[pureProductsList])
  
  const showHideFilterBox = (e) => {
    // Event listener for filter title. Show / hide filter box
    e.target.parentNode.querySelector('.allprod-fbox-wrap').classList.toggle('hide-filter-box');
    
    let spanChild = e.target.children[0];

    setTimeout(() => {
      let filterTitleArrow = spanChild.children[0].classList.toggle('rotate-arrow');
    }, 100);
  }

  // PRICE RANGER
  const filterPriceRangeChange = (e) => {
    setFilterRanger(e.target.value);
    setFilterPriceMaxInput(e.target.value);
    setPriceRangerReleasedClick(false);
  }

  const filterPriceRangeMouseUp = () => {
    updateFilterInputPrice();
    setPriceRangerReleasedClick(true);
  }

  const updateProductsByPrice = () => {
    filterPriceRangeChange(filterPriceMaxInput);
  }
  // PRICE INPUT MAX
  const filterPriceInputMaxChange = (e) => {
    // On enter key press
    if(e.keyCode === 13 || e.which === 13 || e.key === 'Enter') {
      if(e.target.value.length) {
        updateFilterInputPrice(e.target.value);
      }
    }
    setFilterPriceMaxInput(e.target.value);
  }

const updateFilterInputPrice = (passedProducts) => {
    let newInputPriceRanger = Number(filterPriceMaxInput);
    let products = passedProducts === null || passedProducts === undefined ? productsContext : passedProducts;

    if(newInputPriceRanger > 0) {
           // Set state input value
           setFilterPriceMaxInput(newInputPriceRanger);

          // Check if filtered input type price exists
          let updateFilteredTerms = [...filteredTerms];
          let checkForInputPriceTerm = updateFilteredTerms.filter(el => el.filterType === 'maxPrice');
          let newPriceFilter = '0 - '+newInputPriceRanger+' lei';

          // If maxPrice exists inside 'filteredTerms', update it only
          if(checkForInputPriceTerm.length) {
            for( let i =0; i < updateFilteredTerms.length; i++) {
              if(updateFilteredTerms[i].filterType === 'maxPrice') {
                updateFilteredTerms[i].filterName = newPriceFilter;
              }
            }
            setFilteredTerms(updateFilteredTerms);
          } else {
            // Add new filtered term with type 'maxPrice'
            addToFilteredTerms(newPriceFilter, 'maxPrice');
          }
           // Set filter price max input and move filter range on change
           setFilterRanger(newInputPriceRanger);

           // Update products view list
           return products.filter(el => el.price <= newInputPriceRanger);
      
    } else {
      setFilterRanger(0);
      setFilterPriceMaxInput(0);
      let removeFilterPrice = filteredTerms.filter(el => el.filterType !== 'maxPrice'); 
      setFilteredTerms(removeFilterPrice);
    
        return products;      
    }
}

// PRODUCT TYPE FILTER
const productsTypeCheckbox = (el) => {
  setFilter('productType', el.toLowerCase());
}

// COLOR FILTER
const filterByColor = (e,el) => {
  e.target.classList.toggle('highlight-color');
  setFilter('color', el);

}

const addToFilteredTerms = (value, filterType) => {
  
  let newFilteredTerms = [...filteredTerms];
  // Check if selected filter already exists inside filteredTerms
  const alreadyIncluded = newFilteredTerms.some((el) => el.filterName === value);
  if(alreadyIncluded) {
   // Filter already exists, remove it
   let removedFilter = newFilteredTerms.filter(el => el.filterName !== value);
   setFilteredTerms(removedFilter);
 } else {
   // Filter does not exists, add it to filteredterms
    let newFilter = {'filterName': value, 'filterType': filterType};
    setFilteredTerms(oldFilteredTerms => [...oldFilteredTerms, newFilter]);
  }
}

// AVAILABILITY FILTERS
const availabilityCheckbox = (value, e) => {
  setFilter('availability', value);
}

// BRAND FILTERS
const brandCheckbox = (brand,e) => {
  // When brand box is checked/unchecked, by passing 'brand' type and brand value
  setFilter('brand',brand);
}


// PRODUCT LIST VIEW
const selectedProductsView = (e,type) => {
  
  if(e) {
     // Remove highlighted stye for all view buttons
  document.querySelectorAll('.view-list-button').forEach(el => el.classList.remove('view-selected'));
  e.target.classList.add('view-selected');
  }
  
  if(type === 'list') {
    setViewProductsMode('list');
    // New style for product list item
    document.querySelector('.allprod-wrpd-wrapper').classList.add('allprod-wrapper-list-view');
     // List align for product items thumb
     document.querySelectorAll('.allprod-product-thumb').forEach(el => {
      el.classList.add('allprod-thumb-list')
    });
    // List align for product items
    document.querySelectorAll('.allprod-wrpdwrap-proditem').forEach(el => {
      el.classList.remove('allprod-wrpdwrap-proditem-grid');
      el.classList.add('appprod-proditem-list-view');
    });
  } else {
    setViewProductsMode('grid');
      // New style for product list item
      document.querySelector('.allprod-wrpd-wrapper').classList.remove('allprod-wrapper-list-view');
     // Remove list align for product items thumb
     document.querySelectorAll('.allprod-product-thumb').forEach(el => {
      el.classList.remove('allprod-thumb-list')
    });
      // List align for product items
      document.querySelectorAll('.allprod-wrpdwrap-proditem').forEach(el => {
        el.classList.remove('appprod-proditem-list-view');
        el.classList.add('allprod-wrpdwrap-proditem-grid');
      });
  }
}

useEffect(() => {
  if(!filteredTerms.length > 0 ) {
    sortBy();
  } else if(filteredTerms.length > 0) {
    console.log('called');
    sortBy(pureProductsList);
  }
},[sortByOption])

useEffect(() => {
    setPureProductsList(sortedProducts);
},[sortedProducts])


const sortBy = (prods) =>  {
  let sortByProducts = prods === undefined ? [...productsContext] : [...prods];
  let sortByValue = sortByOption;
  let sortedProducts = [];

  switch(sortByOption) {
    case 'Nume (a - z)':
      let sortByNameAz = sortByProducts.sort((p1, p2) => (p1.title > p2.title) ? 1 : (p1.title < p2.title) ? -1 : 0);
      setSortedProducts(sortByNameAz);
     
    break;
    case 'Nume (z - a)':
      let sortByNameZa = sortByProducts.sort((p1, p2) => (p1.title > p2.title) ? -1 : (p1.title < p2.title) ? 1 : 0);
      setSortedProducts(sortByNameZa);
    break;
    case 'Pret (Crescator)':
      let sortedPriceLowHigh = sortByProducts.sort((p1, p2) => (p1.price < p2.price) ? -1 : (p1.price > p2.price) ? 1 : 0);
      setSortedProducts(sortedPriceLowHigh);
    break;
    case 'Pret (Descrescator)':
      let sortedPriceHighLow = sortByProducts.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
      setSortedProducts(sortedPriceHighLow);
      break;
    case 'Rating (Crescator)':
      let sortedRatingLowHigh = sortByProducts.sort((p1, p2) => (p1.rating < p2.rating) ? -1 : (p1.rating > p2.rating) ? 1 : 0);
      setSortedProducts(sortedRatingLowHigh);
      break;
    case 'Rating (Descrescator)':
      let sortedRatingHighLow = sortByProducts.sort((p1, p2) => (p1.rating < p2.rating) ? 1 : (p1.rating > p2.rating) ? -1 : 0);
      setSortedProducts(sortedRatingHighLow);
      break;
    default:
      let sortedDefault = sortByProducts.sort((p1, p2) => (p1.id < p2.id) ? -1 : (p1.id > p2.id) ? 1 : 0);
      setSortedProducts(sortedDefault);
      }
}

const setFilter = (filterType, value) => {

  // Add loading effect style to every product before applying the filters
  setDisplayFilteredProducts(false);

  setTimeout(() => {
    // Remove loading effect and apply filter to display products
    setDisplayFilteredProducts(true);

    addToFilteredTerms(value, filterType);
    // Update passingtags to be on DOM filters list
    setPassingTags({
    ...passingTags,
    [filterType]: { ...passingTags[filterType], [value]: !passingTags[filterType][value] }
  });
  }, 500);  
}

const filteredCollected = () => {
  const collectedTrueKeys = {
    brand:        [],
    availability: [],
    color:        [],
    productType:  []
  };
    // Loop through clicked boolean filters and add to collectedTrueKeys object any true value

    const { brand, availability, color, productType } = passingTags;

    for (let colorKey in color) {
      if (color[colorKey]) collectedTrueKeys.color.push(colorKey);
    }
    for (let brandKey in brand) {
      if (brand[brandKey]) collectedTrueKeys.brand.push(brandKey);
    }
    for (let availabilityKey in availability) {
      if (availability[availabilityKey]) collectedTrueKeys.availability.push(availabilityKey);
    }
    for (let productTypeKey in productType) {
      if (productType[productTypeKey]) collectedTrueKeys.productType.push(productTypeKey);
    }

    // Return to be used by searchProducts function
    return collectedTrueKeys;
}

const multiPropsFilter = (products, filters) => {
    // Get object keys from collectedTrueKeys (['color','gender'...])
    const filterKeys = Object.keys(filters);
    // Filter products
    return products.filter(product => {
      return filterKeys.every(key => {
        // // If filterKeys is not an array (has no length), continue
        if (!filters[key].length) return true;
        // Loops again if product[key] is an array (for material attribute).
        if (Array.isArray(product[key])) {
          // Check if at least one element match
          return product[key].some(keyEle => filters[key].includes(keyEle));
        }
        return filters[key].includes(product[key]);
      });
    });
}

const searchProducts = (prod) => {
  // Takes in all product list and filter to return the filtered product list.
  const filteredProducts = multiPropsFilter(prod,filteredCollected());
  // Return product by name; If the search input is not empty, use it and see if
  // resulted product includes the input text
 return filteredProducts;
}

const removeFilterElement = (filterTerm) => {
  setFilteredTerms(filteredTerms.filter(el => el.filterName !== filterTerm.filterName));
  switch(filterTerm.filterType) {
    case 'productType':
      // Uncheck removed product type term
      let productTypeCheckboxes = document.querySelectorAll('.productsType-checkfilter-btn');

      productTypeCheckboxes.forEach(el => {
        if(el.id.toLowerCase() === filterTerm.filterName.toLowerCase()) {
          el.checked = false;
        }
      })
      setFilter('productType', filterTerm.filterName);
      break;
    case 'color':
      // Remove hightlight from color box
      let colorCheckboxes = document.querySelectorAll('.apbox-filbox-colname');

      for(let i=0;i < colorCheckboxes.length; i++) {
        if(colorCheckboxes[i].innerHTML === filterTerm.filterName) {
          colorCheckboxes[i].parentNode.classList.remove('highlight-color');
        }
      }
      setFilter('color', filterTerm.filterName)
      break;
    case 'brand':
      // Uncheck removed filter term
      let brandCheckboxes = document.querySelectorAll('.filter-brand-checkbox');
      brandCheckboxes.forEach(el => {
        if(el.id.toLowerCase() === filterTerm.filterName.toLowerCase()) {
          el.checked = false;
        }
      })
      setFilter('brand', filterTerm.filterName);
      break;
    case 'availability':
      // Uncheck removed filter term
      let availabilityCheckboxes = document.querySelectorAll('.avail-checkfilter-btn');

      availabilityCheckboxes.forEach(el => {
        if(el.id.toLowerCase() === filterTerm.filterName.toLowerCase()) {
          el.checked = false;
        }
      })
      setFilter('availability', filterTerm.filterName);
      break;
      case 'maxPrice':
        setFilterRanger(0);
        setFilterPriceMaxInput(0);
      break;
      default:
        return;
  }
}

const clearAllFilters = () => {
  let filterTagNames = ['color','brand','availability'];
 
  // Loop through all filter names
  for(let i=0; i < filterTagNames.length; i++) {
    // Get passingtag object [eg: color: {..}, brand: {..}]
   let filterObject = passingTags[filterTagNames[i]];
    // Loop through passingtag object and set all filter names to false
   for(let term in filterObject) {
    filterObject[term] = false;
   }
  // Set new passingtags - all terms set to false
   setPassingTags({
    ...passingTags,
    [filterTagNames[i]]: {...passingTags[filterTagNames[i]]}
   })
  }
  // Uncheck product types
  document.querySelectorAll('.productsType-checkfilter-btn').forEach(el => el.checked = false);
  // Clear colors
  document.querySelectorAll('.apbox-filbox-colname').forEach(el => el.parentNode.classList.remove('highlight-color'));
  // Uncheck availability
  document.querySelectorAll('.avail-checkfilter-btn').forEach(el => el.checked = false);
  // Uncheck brand
  document.querySelectorAll('.filter-brand-checkbox').forEach(el => el.checked = false);
  // Clear maxPrice
  setFilterRanger(0);
  setFilterPriceMaxInput(0);
  // Clear all filtered terms
  setFilteredTerms([]);
}

const toggleMobileFilterMenu = () => {
  console.log('loaded');
  document.querySelector('.allprod-filters-cont').classList.toggle('open-mob-filter');
  document.getElementsByTagName('body')[0].classList.toggle('lock-scroll');
  document.documentElement.classList.toggle('lock-scroll');
}

// DISPLAY FILTERED TERMS
const displayFilteredTerms = () => {
  return (
    <>
    {filteredTerms.length > 0 &&
    <div className='ap-filbox-activefilters-wrap'>
      <div className='ap-filbox-afilwrp-title'>
        <span className='allprod-afilwrpd-activefil-title'>Filtre active</span>
          <span className='allprod-afilwrpd-activefil-deleteallfilters' onClick={clearAllFilters}>
                Sterge tot
          </span> 
      </div>
      <div className='allprod-filteredterms-wrp'>
        {filteredTerms.map((el,ind) =>
          <span className='allprod-filter-term' key={ind}
            onClick={(e) => removeFilterElement(el)}>
            <i className="fa-solid fa-circle-xmark"></i> 
            {el.filterName}
          </span>
        )}
      </div>
    </div>
    }
    </>
  )
}


// DISPLAY SORT MOBILE MENU
const toggleMobileSortMenu = () => {
  $('#sortMobileModal').modal('show');
  
}

// GET FILTER PRODUCTS NUMBER
const getFilterProductsNumber = () => {
 let filteredTerms = ['productType','availability','brand'];
 
let values = [];

    filteredTerms.forEach(el => {
      for(let i=0; i<productsContext.length;i++) {
        let filterValue = productsContext[i][el];
 
        if(filterValue) {
          const exists = values.find(el => el.type === filterValue.toLowerCase());
          if(!exists) {
          let obj = {type: filterValue.toLowerCase(), value: 1};
          values.push(obj);
          } 
          if(exists) {
            for(let z =0; z < values.length; z++) {
              if(values[z].type === filterValue.toLowerCase()) {
                values[z].value = values[z].value + 1; 
              }
            }
          }
        }
      }
    })



let formGroupFilterNames = [];
let formGroupCheckboxes = document.querySelectorAll('.filter-checkbox-inp');
formGroupCheckboxes.forEach(el => {
  formGroupFilterNames.push(el.getAttribute('data-filter-type').toLowerCase());
});

for (let c = 0; c < values.length; c++) {
  if (formGroupFilterNames.includes(values[c].type)) {
    let sp = document.createElement('span');
    let value = document.createTextNode('('+values[c].value+')');
    sp.appendChild(value);
    let targetElement = document.querySelector('[data-filter-type="' + values[c].type + '"]');
    if (!targetElement.querySelector('span')) {
      targetElement.appendChild(sp);
    }
  }
}

}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const higherThan = '<';
  return (
        <div className='allproducts-container container'>
            
          {/* Mobile modal filter */}
          <div className="modal fade" id="sortMobileModal" tabIndex="-1" aria-labelledby="sortMobileModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="sortMobileModalLabel">Sorteaza dupa</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body sortby-mobile-modal">
                {sortByValueTerms.map((el,ind) =>
                  <button type="button" 
                    key={ind} 
                    data-bs-dismiss="modal"
                    className="sortby-mobmod-button"
                    onClick={(e) => { setSortByOption(el) }}>
                    {el} {el === sortByOption && <CheckSharpIcon />}
                    </button>
                )}
                </div>
 
              </div>
            </div>
          </div>

          <div className='allprod-filters-cont'>
            <div className='allprod-filters-cont-wrap'>

              <div className="allprod-filterbtn-sm-showwrp">
                <button type='allprod-filterbtn-sm-showprod' onClick={toggleMobileFilterMenu}>Arata produse ({pureProductsList.length})</button>
              </div>

              {displayFilteredTerms()}

              <div className='allprod-filter-box'>
                <span className='ap-filbox-title'>Tip produs<span><i className="fa-solid fa-angle-right"></i></span></span>
                <div className='allprod-fbox-wrap'>
                  <div className='allprod-fbox-prodType'>
                      {filterProductsType.map((el,ind) =>
                          <div className="form-group  filter-checkbox-inp" key={ind} data-filter-type={el.toLowerCase()}>
                            <input type="checkbox" id={el} className='productsType-checkfilter-btn' onClick={(e) => productsTypeCheckbox(el)}/>
                            <label htmlFor={el}>{el}</label>
                          </div>
                      )}
                  </div>
                </div>
              </div>

              <div className='allprod-filter-box'>
                <span className='ap-filbox-title'>Pret<span><i className="fa-solid fa-angle-right"></i></span></span>
                <div className='allprod-fbox-wrap'>
                  <input 
                    id="allprod_filter_slider" 
                    type="range" 
                    min="0" max="10000" 
                    value={filterRanger} 
                    onChange={filterPriceRangeChange}
                    onMouseUp={filterPriceRangeMouseUp}
                    step="1"/>
                    
                  <div className='allprod-filter-wrap-inputprices'>
                    {/* <div>lei <span><input type='text' maxLength='4' name='min' value={filterPriceMinInput} onChange={filterPriceInputMinChange} onBlur={filterPriceInputMinBlur} /></span></div> */}
                    <div>0 lei - <span><input type='text' maxLength='4' name='max' 
                        value={filterPriceMaxInput}  
                        onChange={filterPriceInputMaxChange} 
                         /></span>
                    </div>
                  </div>
                </div>
              </div>


              <div className='allprod-filter-box'>
                <span className='ap-filbox-title'>Culoare<span><i className="fa-solid fa-angle-right"></i></span></span>
                <div className='allprod-fbox-wrap allprod-fbox-wrapcolor'>
                  <div className='allprod-box-wrapcolor'>
                    {filterColorsList.map((el,ind) =>
                      <span className='ap-box-filbox-color'
                            style={{backgroundColor: el.color}} 
                            key={ind}
                            onClick={(e) => filterByColor(e,el.roColor)}>
                            <span key={ind} className='apbox-filbox-colname'>{el.roColor}</span> 
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='allprod-filter-box'>
                <span className='ap-filbox-title'>Disponibilitate<span><i className="fa-solid fa-angle-right"></i></span></span>
                <div className='allprod-fbox-wrap'>
                  <div className='allprod-fbox-availability'>
                      {filterAvailability.map((el,ind) =>
                          <div className="form-group  filter-checkbox-inp" key={ind} data-filter-type={el.toLowerCase()}>
                            <input type="checkbox" id={el} className='avail-checkfilter-btn' onClick={(e) => availabilityCheckbox(el, e)}/>
                            <label htmlFor={el}>{el}</label>
                          </div>
                      )}
                  </div>
                </div>
              </div>

              <div className='allprod-filter-box'>
                <span className='ap-filbox-title'>Brand<span><i className="fa-solid fa-angle-right"></i></span></span>
                <div className='allprod-fbox-wrap'>
                  <div className='allprod-fbox-brand'>
                    {filterBrandsList.map((el,ind) =>
                    <div className="form-group filter-checkbox-inp" key={ind} data-filter-type={el.toLowerCase()} >
                      <input type="checkbox" id={el} className='filter-brand-checkbox' onClick={(e) => brandCheckbox(el,e)}/>
                      <label htmlFor={el}>{el}</label>
                    </div>
                    )}
                  </div>
                </div>
              </div>

   

            </div>
          </div>
          <div className='allprod-wrapprod-cont'>
          
          {displayFilteredTerms()}

            <div className='allprod-wrprod-cont-head'>
              <div className='allprod-wrprdhead-topwrp'>
                <span className="allprod-wrprdhead-toprwp-prodlistview">Produse: {pureProductsList.length} din <span>{productsContext.length}</span></span>
              </div>
              <div className='allprod-wrprdhead-bottomrwp'>
                <div className="allprod-wrprdhead-viewbtns">
                  <span className="allprod-wrphead-viewbtb-txt">Tip afisare:</span>
                  <IconButton aria-label='grid' disableRipple className="view-list-button view-selected" onClick={(e) => selectedProductsView(e,'grip')}>
                          <GridViewOutlinedIcon />
                  </IconButton>
                  <IconButton aria-label='list' disableRipple className="view-list-button" onClick={(e) => selectedProductsView(e,'list')}>
                          <FormatListBulletedOutlinedIcon />
                  </IconButton>
                </div>
                
                <button type="button" className="allprod-wrprhead-mobfilter" onClick={toggleMobileFilterMenu}>
                  <span>Filtreaza</span>
                  <span>2 filtre</span>
                </button>
                <button type="button" className="allprod-wrprhead-mobfilter" onClick={toggleMobileSortMenu}>
                  <span>Sorteaza</span>
                  <span>{sortByOption}</span>
                </button>

                <div className='allprod-wrprdhead-sortby'>
                  <label className='input-group-addon' htmlFor='input-sortby'>Sortare dupa</label>
                  <select id='input-sortby' className='inputsortby-select' onChange={(e) => { setSortByOption(e.target.value) }}>
                    {sortByValueTerms.map((el,ind) =>
                    <option key={ind} value={el} className={ind === 0 ? 'sortby-op-val sortby-op-val-default' : 'sortby-op-val'}>{el}</option>
                    )}
                  </select>
                </div>
              </div>

            </div>

            <div className='allprod-wrpd-wrapper'>
              <PaginatedItems itemsPerPage={9} />   
            </div>        
          </div>


          {/* displayAddedToCartMsg - to true and display displayAddedToCartMsg */}
          {displayAddedToCartMsg && (
              <AddedToCartDisplay addedToCartProduct={currentAddedToCart}/>
            )}
        </div>
  );
}

export default AllProducts;
