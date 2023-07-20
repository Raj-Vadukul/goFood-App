import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  const [search, setsearch] = useState("");
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    // console.log(response[0],response[1])
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])




  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner">
            <div className='carousel-caption' style={{ zIndex: '10' }}>
              <div className="d-flex justify-content-center" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://wallpapercave.com/wp/wp6734913.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://b.zmtcdn.com/data/pictures/chains/2/18549832/c9fbbf2eed4d4ab83ce63b114e76b57f.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        <div>
          {
            FoodCat !== []
              ? FoodCat.map((data) => {
                return (
                  <div className="row">
                    <div key={data._id} className="m-3 fs-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {FoodItem !== [] ?
                      FoodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                        return (
                          <div key={filterItems._id} className="col-md-3" >
                            <Card foodItems={filterItems}
                              options={filterItems.options[0]}
                            />
                          </div>
                        )
                      }
                      ) : <div>No Data Found</div>
                    }
                  </div>
                )
              })
              : ""
          }
        </div>
      </div>
      <div><Footer /></div>
    </div>
  )
}
