import './InitialPage.css';
import {useNavigate} from "react-router-dom";

import {Carousel} from "../Components/Carousel";
import image1 from "../Images/Map1.jpg";
import image2 from "../Images/Map2.jpg";
import image3 from "../Images/Map3.jpg";

function InitialPage(){

    const navigate = useNavigate();

    const images = [image1, image2, image3];

    const goToMainPage = () => {

        navigate("/inputs");
    }

    return (
        <div className="mainDiv">
            <Carousel images={images}/>
            <div className='div-carousel'>
                <h2 className='title-carousel'>Route Tracer</h2>
                {/*<div className='background-text-carousel'>
                    <p className='text-carousel'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium, lectus non dignissim placerat, ex quam mollis odio, in porta lorem nulla sed felis. Pellentesque magna nulla, efficitur a pretium at, consequat ac dui. Mauris efficitur nisi velit, at hendrerit mauris finibus eu. Aenean eu arcu laoreet, mollis nisl eu, elementum lectus. Morbi quis accumsan purus. Nam placerat nunc volutpat, elementum mauris vitae, laoreet orci. Praesent in velit ligula. Nunc imperdiet, lectus quis sodales varius, enim lectus pretium felis, eget placerat est diam nec risus. Donec pretium molestie mi viverra mollis. Aenean cursus placerat cursus. In ut massa nisl. Nulla convallis, leo hendrerit suscipit accumsan, lorem erat aliquet justo, id suscipit turpis elit at purus. Maecenas et vestibulum nunc, non volutpat felis.</p>
                </div>*/}
                <button onClick={goToMainPage} className='button-start'>USE</button>
            </div>
        </div>
    );
}

export {InitialPage};