import "./App.css";
import ImageSlider from "./components/ImageSlider/ImageSlider";

const images = [
  "./assets/images/image0.jpg",
  "./assets/images/image1.jpg",
  "./assets/images/image2.jpg",
  "./assets/images/image3.jpg",
];

function App() {
  return (
    <div className='StyledApp'>
      <p>320x200 manual pagination</p>
      <ImageSlider
        width='320px'
        height='200px'
        isPaginated={false}
        imagesList={images}
      />
      <br></br>
      <p>520x300 animated pagination</p>
      <ImageSlider
        width='520px'
        height='300px'
        isPaginated
        imagesList={images}
      />
    </div>
  );
}

export default App;
