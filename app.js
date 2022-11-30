import React, {
  useState
} from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18";
import uuid from "https://esm.sh/react-uuid@2.0.0"
import { useSelector, useDispatch } from "https://esm.sh/react-redux@8.0.5"


////////////////////
const Header = ({mainPosts}) => {
  let likes = 0
  mainPosts.forEach(function(elem) {
  if (elem.like) likes++
});

  return <div className="d-sm-flex align-items-center justify-content-center">
    <h1 className="text-red text-center fw-semibold">Liza Smirnova</h1>
    <div className="text-center">
      <h5 className="d-inline-block px-2 pt-sm-1"> {mainPosts.length} записей. Из них понравилось {likes}</h5>
      <i className="fa-regular fa-heart text-red"></i>
    </div>
  </div>
}

////////////////////
const Search = ({ clickSearch, Clear, sortFavour, sortLike, filterLike, filterFavour, filterSearch}) => {
  
  const [value, setValue] = useState('');
  let heart = <i class="fa-regular fa-heart"></i>
  let star = <i class="fa-regular fa-star"></i>
  let search = <i class="fa-solid fa-magnifying-glass"></i>
  
  if (filterLike){
    heart = <i class="fa-solid fa-heart"></i>}
    if (filterFavour){
      star = <i class="fa-solid fa-star"></i>}
    if (filterSearch){
      search = <i class="fa-solid fa-magnifying-glass-minus"></i>}  



  function Change() {
    setValue(event.target.value)
  }

  return <div class="search input-group my-3 col-8">
    <input onChange={Change} type="text" class="form-control" placeholder="Поиск по записям" />
    
    <div className="btn-group btn-group-sm">
    <button onClick={() => clickSearch(value)} class="btn btn-outline-blue" id="basic-addon2">{search}</button>
      <button className="btn btn-outline-blue" onClick={sortFavour}>{star}</button>
      <button className="btn btn-outline-blue" onClick={sortLike} >{heart}</button>
          <button onClick={Clear} class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button>
          </div>
  </div>
}

////////////////////
const PostList = ({ posts, clickTrash, clickFavour, clickLike}) => {

  const itemsPosts = posts.map(function (post) {

    return (
      <li className="list-group-item">
        <Post id={post.id} postContent={post.postContent} postFavour={post.postFavour} postLike={post.like} clickTrash={clickTrash} clickFavour={clickFavour} clickLike={clickLike}/>
      </li>
    )
  })

  return <>
    <hr className="border border-blue border-2" />
    <ul className="list-group list-group-flush my-3">
      {itemsPosts}
    </ul>
    <hr className="border border-blue border-2" />
  </>
}

////////////////////
const Post = ({ id = "", postContent, postFavour = false, postLike = false, clickTrash, clickFavour, clickLike }) => {

  let classNames = 'px-2';

  let star = <i class="fa-regular fa-star"></i>
  if (postFavour) {
    classNames += ' fw-bold';
    star = <i class="fa-solid fa-star"></i>
  }

  let heart = <i class="fa-regular fa-heart"></i>
  if (postLike) {
    classNames += ' bg-pink-100';
    heart = <i class="fa-solid fa-heart"></i>
  }

  return <div className="d-flex justify-content-between">
    <span id={id} className={classNames}>{postContent}</span>

    <div className="btn-group btn-group-sm">
      <button className="btn btn-outline-purple" onClick={()=>clickFavour(id)}>{star}</button>
      <button className="btn btn-outline-purple" onClick={()=>clickLike(id)}>{heart}</button>
      <button className="btn btn-outline-purple" onClick={() => clickTrash(id)}><i class="fa-regular fa-trash-can"></i></button>
    </div>
  </div>
}

////////////////////
const PostAdd = ({ clickAdd }) => {
  const [value, setValue] = useState('');

  function Change() {
    setValue(event.target.value)
  }

  return <div class="search input-group my-3 col-8">
    <textarea onChange={Change} class="form-control" placeholder=" Добавьте свою запись" />
    <button type="submit" class="btn btn-eva" id="basic-addon2" onClick={() => clickAdd(value)}>Добавить</button>

  </div>
}





////////////////////
const App = () => {

const [mainPosts, setMain] = useState([
      { id: '1', postContent: 'Liza', postFavour: true, like: true},
      { id: '2', postContent: 'Anja', postFavour: false, like: false },
      { id: uuid(), postContent: 'Eva', postFavour: true, like: true },
      { id: uuid(), postContent: 'Sasha', postFavour: false, like: true },
      { id: uuid(), postContent: 'Nastja', postFavour: true, like: false },
    ])

  const [posts, setPosts] = useState(mainPosts)
 const [filter, setFilter] = useState([])
 const [filterLike, setFL] = useState(false)
 const [filterFavour, setFF] = useState(false)
 const [filterSearch, setFS] = useState(false)
 
  let tempFilter = Object.assign([], 
	filter); 
  
  
function view (viewPosts, value = false){
  if (tempFilter.length != 0){
    tempFilter.forEach(function(elem) {
	if (elem.id == 'search'){
     viewPosts = elem.fun(viewPosts, value)
      	}
	if (elem.id == 'favour'){
     viewPosts = elem.fun(viewPosts)
      	}
	if (elem.id == 'like'){
     viewPosts = elem.fun(viewPosts)
      	}
});
  }
    setFilter(tempFilter)
    setPosts(viewPosts)
  }
  
  
function clickSearch(value) {
    if (value){
      if(!filterSearch){
    const sortFun = {id: 'search', fun: (viewPosts)=>{
     return  viewPosts.filter((elem) => {
      return elem.postContent.includes(value)
    })
    }}
    tempFilter = [...filter, sortFun]
    setFS(true)
  }
  else{
    tempFilter = filter.filter(function(elem) { return elem.id != 'search'})
    setFS(false)
  }
  view(mainPosts, value)
    }
  }

function sortFavour(){
  if(!filterFavour){
    const sortFun = {id: 'favour', fun: (viewPosts)=>{
       return  viewPosts.filter((elem) => {
        return elem.postFavour == true
      })
      }}
      tempFilter = [...filter, sortFun]
      setFF(true)
  }
  else{
    tempFilter = filter.filter(function(elem) {
        return elem.id != 'favour'
    })
    setFF(false)
  }
    view(mainPosts)
  }

function sortLike(){
  if(!filterLike){
  const sortFun = {id: 'like', fun: (viewPosts)=>{
     return  viewPosts.filter((elem) => {
      return elem.like == true
    })
    }}
    tempFilter = [...filter, sortFun]
    setFL(true)
  }
  else{
  tempFilter = filter.filter(function(elem) {
      return elem.id != 'like'
  })
    setFL(false)
  }
view(mainPosts)
}

function Clear() {
    setFilter([])
    setFL(false)
    setFF(false)
    setFS(false)
    setPosts(mainPosts)
  }
  

  function clickTrash(id) {
    const newPosts = mainPosts.filter((elem) => {
      return elem.id !== id
    })
   
    setMain(newPosts)
    view(newPosts)

  }

  function clickAdd(value) {
    if (value) {
      const newPost = { id: uuid(), postContent: value}
      const newPosts = [...mainPosts, newPost]
      setMain(newPosts)
      view(newPosts)
    }
  }


  

  function clickFavour(id) {
   const newPosts = mainPosts.map(function(elem){
     if(elem.id == id){
    elem.postFavour = !elem.postFavour
     }
     return elem
   });
setMain(newPosts);
view(newPosts)
  }


  function clickLike(id) {
    
const newPosts = mainPosts.map(function(elem){
     if(elem.id == id){
    elem.like = !elem.like
     }
     return elem
   });
setMain(newPosts);
view(newPosts)

 }
 

  return (
    <div>
      <Header mainPosts={mainPosts}/>
      <Search clickSearch={clickSearch} Clear={Clear} sortFavour={sortFavour} sortLike={sortLike} filter={filter} filterLike={filterLike} filterFavour={filterFavour} filterSearch={filterSearch}/>
      <PostList posts={posts} clickTrash={clickTrash} clickFavour={clickFavour} clickLike={clickLike}/>
      <PostAdd clickAdd={clickAdd} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));