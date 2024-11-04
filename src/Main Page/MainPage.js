import './MainPage.css';
import {RouteTracerAlg} from "./RouteTracerAlg";
import {SwitchButton} from "../Components/SwitchButton";

import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import image from "../Images/Map3.jpg";

function MainPage( sendData ) {

	const pageName = "Route Tracer";
	const [url, setUrl] = useState("Space Needle,Seattle WA");

    const navigate = useNavigate();

	const [pointsArray, setPointsArray] = useState([["", ""]]);
	const [switchData, setSwitchData] = useState(false);
	const [advancedRouteData, setAdvancedRouteData] = useState(false);

	const receiveData = (inputNumber) => (data) => {

		switch(inputNumber){

			case 1:
				setSwitchData(data);
				setAdvancedRouteData(false);
				break;

			case 2:
				setAdvancedRouteData(data);
				break;

			default:
				break;
		}
	}

	const modifyNewInput = (inputNumber, data) => {

		let aux;

		switch(inputNumber){

			case 1:
				setPointsArray(prevPointsArray => [...prevPointsArray, ["", ""]]);

				break;

			case 2:

				if(pointsArray.length > 1){

					aux = data.currentTarget.id.split(";");
					aux[1] = Number(aux[1]);
				
					setPointsArray(prevPointsArray => {

						const newArray = [...prevPointsArray];  
						newArray.splice(aux[1], 1);  
						return newArray;  
					});
				}

				break;

			case 3:

				aux = data.target.id.split(";");
				aux[1] = Number(aux[1]);

				setUrl(data.target.value);

				//console.log(encodeURIComponent(url.current));

				setPointsArray(prevPointsArray => {

					const newArray = [...prevPointsArray];
					newArray[aux[1]][0] = data.target.value;
					return newArray
				});

				break;

			case 4:

				aux = data.target.id.split(";");
				aux[1] = Number(aux[1]);

				setPointsArray(prevPointsArray => {

					const newArray = [...prevPointsArray];
					newArray[aux[1]][1] = data.target.value;
					return newArray
				});

				break;

			case 5:

				setUrl(data.target.value);
				//console.log(url);

				break;

			default:

				break;
		}
	}

	const searchAlg = () => {

		const valueArray = [[],[],[],"","",""];

		for(let counter=0; counter<pointsArray.length; counter+=1){

			valueArray[0][counter] = pointsArray[counter][0];

			valueArray[1][counter] = pointsArray[counter][1].split(":");

			valueArray[1][counter][0] = Number(valueArray[1][counter][0]);
			valueArray[1][counter][1] = Number(valueArray[1][counter][1]);

		}

		valueArray[3] = document.getElementById("initialPoint").value;

		if(advancedRouteData) {
			valueArray[4] = Number(document.getElementById("numberRoutes").value);
			valueArray[5] = Number(document.getElementById("maxStops").value);
		}

		console.log(valueArray);

		const results = RouteTracerAlg(valueArray);

		console.log(results);

		//sendData(results);

        navigate("/final");
	}

	return (
		<div className="mainDiv" style={{justifyContent: "end"}}>
		<img src={image} alt="" className='background'/>
		<div className="secDiv" style={{position: "fixed", left: "8%", width: "55%"}}>
			<div className='backgroundText'>
			    <p className='mainTitle' style={{marginTop: "0%"}}>{pageName}</p>
			    <p className='normalText'>
					Welcome to Route Tracer - your ultimate destination for efficient route planning! Whether you're a delivery driver, a traveler, or just trying to optimize your daily commute, Route Tracer is here to simplify your journey.
					<br/><br/>
					With Route Tracer, you can effortlessly trace the most efficient route that seamlessly connects all the addresses you need to visit. No more time wasted on detours or inefficient paths – our intelligent routing algorithm ensures that you reach your destinations quickly and with ease.
					<br/><br/>
					Save time, fuel, and frustration with Route Tracer. Start tracing your optimal routes today and experience the difference in your travel efficiency!
				</p>
				<div className='single-line'/>
				<div className='horizontalDiv' style={{marginTop: "3%"}}>
					<iframe
						title={"Map"}
						width="70%"
						height="300"
						frameBorder="0"
						src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${url === "" ? "Space+Needle,Seattle+WA" : encodeURIComponent(url)}`}
						allowFullScreen
					></iframe>
				</div>
			</div>
		</div>
		<div className="secDiv" style={{alignItems: "center"}}>
			<div className='backgroundText' style={{padding: "3%"}}>
				<div className='horizontalDiv'>
					<SwitchButton sendData={receiveData(1)}/>
					<p className='subTitle' style={{marginLeft: "10px"}}>Delivery Mode</p>
				</div>
					{switchData ? (
						<>
							<div className='horizontalDiv' style={{marginBottom: "3%"}}>
								<SwitchButton sendData={receiveData(2)}/>
								<p className='subTitle' style={{marginBottom: "0%", marginTop: "0%", marginLeft: "10px"}}>Advanced Route Options</p>
							</div>
							{ advancedRouteData ? (
									<>
										<div className='horizontalDiv' style={{marginBottom: "3%"}}>
											<input
												type='number'
												className='input-field-text'
												placeholder='Number of Routes...'
												id="numberRoutes"
												min="0"
												max={pointsArray.length}
											/>
										</div>
										<div className='horizontalDiv' style={{marginBottom: "3%"}}>
											<input
												type='number'
												className='input-field-text'
												placeholder='Max Stops per Route...'
												id='maxStops'
												min="0"
												max={pointsArray.length}
											/>
										</div>
									</>
								) : (
									<></>
								)
							}
						</>
					) : (
						<></>
					)}
				<div className='single-line' style={{marginTop: "4%"}}/>
				<div className='horizontalDiv'>
					<p className='subTitle' style={{marginBottom: "1%"}}>Initial Point</p>
				</div>
				<div className='horizontalDiv' style={{marginBottom: "3%"}}>
					<input
						type="text"
						className="input-field-text"
						placeholder="Address..."
						id="initialPoint"

						onChange={(data) => modifyNewInput(5, data)}
					/>
				</div>
				<div className='single-line'/>
                <div className='horizontalDiv'>
				    <p className='subTitle' style={{marginBottom: "-3%"}}>Addresses</p>
                </div>
                <div className='horizontalDiv'>
                    <ul className='ul-list-div'>
                        {
                            pointsArray.map((address, index) => {

                                return (
                                    <li style={{marginBottom: "3%"}} key={index}>
										<div className='input-bar'>
											<input
												type="text"
												className="input-field-text"
												placeholder="Address..."
												id={"address;"+index}
												style={{marginRight: "3%"}}

												onChange={(data) => modifyNewInput(3, data)}
												value = {pointsArray[index][0]}
											/>
											{ switchData ? (
													<input
														type="time"
														className="input-field-time"
														placeholder="Delivery Time..."
														id={"time;"+index}

														onChange={(data) => modifyNewInput(4, data)}
														value = {pointsArray[index][1]}
													/>
												) : (
													<input
														type="time"
														className="input-field-time-deactivated"
														placeholder="Delivery Time..."
														id={"time;"+index}
														readOnly

														onChange={(data) => modifyNewInput(4, data)}
														value = {pointsArray[index][1]}
													/>
												)
											}
											{	pointsArray.length === 1 ? (
													<button id={"remove;"+index} className="close-button-deactivated" style={{marginLeft: "1%"}}><i className="fas fa-times"/></button>
												) : (
													<button id={"remove;"+index} className="close-button" onClick={(data) => modifyNewInput(2, data)} style={{marginLeft: "1%"}}><i className="fas fa-times"/></button>
												)
											}
										</div>
                                    </li>
                                )

                            })
                        }
                    </ul>
                </div>
                <div className='horizontalDiv'>
                    <div className='right'>
                        <button className="add-button" onClick={() => modifyNewInput(1)}>Add</button>
                    </div>
                    <div className='right'>
                        <button className="add-button" onClick={searchAlg}>Submit</button>
                    </div>
                </div>
			</div>
		</div>
		</div>
	);
}

export {MainPage};