import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipes from '../assets/data/recipes';

function GalleryScreen() {
  const [currentPageData, setCurrentPageData] = useState([]);
  const { pageNumber = 1 } = useParams();
  const itemsPerPage = 10;

  useEffect(() => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setCurrentPageData(recipes.slice(startIndex, endIndex));
  }, [pageNumber]);

  return (
    <div>
      <h1>Recipe Gallery</h1>
      <ul>
        {currentPageData.map((dish) => (
          <li key={dish._id}>{dish.name}</li>
        ))}
      </ul>

      <div>
        {pageNumber > 1 && (
          <Link to={`/page/${parseInt(pageNumber) - 1}`}>Previous</Link>
        )}
        {currentPageData.length === itemsPerPage && ( // Only show 'Next' if there are enough items to paginate
          <Link to={`/page/${parseInt(pageNumber) + 1}`}>Next</Link>
        )}
      </div>
    </div>
  );
}

export default GalleryScreen;

//https://www.youtube.com/watch?v=IYCa1F-OWmk
//https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04

// function GalleryScreen(){
//     const [posts,setPosts] = useSate([]
//     const [loading,setLoading] = useSate(false) //fecth API
//     const [currPage, setCurrPage] = useState(1)
//     const [postsPerPage, setPostsPerPage] = useState(10)

//     useEffect(()=>{
//         const fetchPosts = async ()=>{
//             setLoading(true)
//             const res = await

//         }
//     },[])

//     return (
//         <div>

//         </div>
//     )
// }

// export default GalleryScreen
