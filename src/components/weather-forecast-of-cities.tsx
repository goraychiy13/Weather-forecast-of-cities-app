import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from "axios";
import './weather-forecast-of-cities.css'

const WeatherForecastOfCites: FunctionComponent = () => {

    let [stateWeatherForecastData, setStateWeatherForecastData] = useState<any>({
        weatherForecastData: []
    })

    const getWetherForecast = () => {
        const options = {
            headers: {
                "Accept": "application/json"
            },
            params: {
                bbox: '12,32,15,37,10',
                appid: '330216f9e3042b8a57a7865c3de67865'
            }
        }
        axios.get(`http://api.openweathermap.org/data/2.5/box/city`, options)
            .then(
                (response: { data: any }) => {
                    console.log(response.data)
                    setStateWeatherForecastData({
                        weatherForecastData: response.data.list
                        // weatherForecastData: response.data.list.map((item: any, index: number) => {
                        //     item.name === ''
                        // })
                    })
                }
            ).catch(
                (error: any) => {
                    // console.log(error)
                    // warning();
                }
            )
    }

    useEffect(() => {
        getWetherForecast();
    }, [])

    return (
        <div className="app-wrapper">
            {/* {JSON.stringify(stateWeatherForecastData.weatherForecastData)} */}
            <div className="location-header">
                Location
            </div>
            <div className="city-info-wrapper">
                <div className="choosed-city">
                    <span className="choosed-city-txt">Mumbai, India</span>
                    <svg className="facebook-places" width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7619 3.98225C10.705 3.7688 10.5893 3.54136 10.5038 3.34223C9.47996 0.881778 7.24297 0 5.43671 0C3.0187 0 0.355553 1.62138 0 4.96342V5.64622C0 5.67471 0.00982067 5.93068 0.0237705 6.05872C0.223086 7.65146 1.47987 9.34419 2.41849 10.9369C3.42831 12.6434 4.47614 14.322 5.51427 16C6.1544 14.905 6.79222 13.7956 7.41777 12.7289C7.58826 12.4159 7.78616 12.1031 7.95683 11.8043C8.07059 11.6053 8.2879 11.4064 8.38719 11.2213C9.39697 9.3725 11.0223 7.50943 11.0223 5.67468V4.92094C11.0224 4.72203 10.7758 4.02514 10.7619 3.98225ZM5.48098 7.40988C4.77021 7.40988 3.99222 7.05448 3.60821 6.07297C3.55099 5.91673 3.5556 5.60362 3.5556 5.57494V5.13406C3.5556 3.88281 4.61802 3.31381 5.54228 3.31381C6.68014 3.31381 7.56017 4.22415 7.56017 5.36201C7.56017 6.49984 6.61884 7.40988 5.48098 7.40988Z" fill="black" />
                    </svg>
                </div>
            </div>
            <div className="city-name-temperature-wrapper">
                <div>
                    {
                        stateWeatherForecastData.weatherForecastData.map((weatherItem: any, index: number) => {
                            return <div key={index} className="city-name-temperature">
                                <div className="city-name">
                                    {weatherItem.name}
                                </div>
                                <div className="temperature-in-city">
                                    {Math.round(weatherItem.main.temp) + '°C'}
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </div >
    )
}

export default WeatherForecastOfCites