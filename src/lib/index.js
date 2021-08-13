import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { message } from 'antd'
import 'antd/lib/message/style/index.css'

import axios from 'axios'
import Lottie from 'lottie-web'

import weatherIcon from './iconJson'

import './index.css'

export default class ReactMiniWeather extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      convartedColor: [],
      position: {},   //经纬度查询获得的位置信息
      weather: {}
    }
    this.location = null  //定位功能获取的经纬度
    this.weatherIconAnimation = null
    this.timer = null
    this.svgContainer = React.createRef()
  }
  convartColor(color = null) {
    const colorTemp = /([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/.exec(color? color : this.props.color)
    this.setState(() => {
      return {
        convartedColor: [
          parseInt(`0x${colorTemp[1]}`),
          parseInt(`0x${colorTemp[2]}`),
          parseInt(`0x${colorTemp[3]}`)
        ]
      }
    })
  }
  getLocation() {
    if (typeof window !== "undefined" && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          (position) => {
            this.loaction = {
              latitude: position.coords.latitude.toFixed(6),
              longitude: position.coords.longitude.toFixed(6)
            }
            this.getWeather()
          },
          (error) => {
            switch (error.code) {
              case 0:
                message.warning("获取位置信息出错！将使用IP定位")
                break;
              case 1:
                message.warning("您设置了阻止该页面获取位置信息！将使用IP定位")
                break;
              case 2:
                message.warning("浏览器无法确定您的位置！将使用IP定位")
                break;
              case 3:
                message.warning("获取位置信息超时！将使用IP定位")
                break;
              default:
                message.warning("未知错误！将使用IP定位")
            }
            this.getWeather()
          }
      )
    } else {
      message.warning("该浏览器不支持 HTML5 的定位功能！将使用IP定位")
      this.getWeather()
    }
  }
  async getWeather() {
    let url = ''
    if(this.location) {
      url = `${this.props.url}?location_type=1&lat=${this.location.latitude}&lng=${this.location.longitude}`
    } else {
      url = `${this.props.url}?location_type=0`
    }
    try {
      const weather = await axios.get(url)
      if (weather.status === 200 && weather.data.error === 0) {
        this.setState(() => {
          return {
            weather: weather.data.data.weather,
            position: weather.data.data.location
          }
        })
        if (weather.data.data.location.error_msg !== '成功。') {
          message.warning(weather.data.data.location.error_msg)
        }
        this.showIcon()
      } else {
        message.error("网络错误!")
      }
    } catch (err) {
      console.log(err)
      message.error("未知错误!")
    }
  }
  showIcon() {
    const svgContainer = this.svgContainer.current
    if (this.weatherIconAnimation) {
      this.weatherIconAnimation.destroy()
    }
    this.weatherIconAnimation = Lottie.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: true,
      animationData: weatherIcon[this.state.weather.weather](this.state.convartedColor[0] / 255, this.state.convartedColor[1] / 255, this.state.convartedColor[2] / 255)
    });
  }
  componentDidMount() {
    this.convartColor()
    this.getLocation()
    this.timer = setInterval(() => {
      this.getLocation()
    }, 30 * 60 * 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  showOnelineMessage() {
    const { position, weather } = this.state
    if (this.props.type === 'oneline') {
      if (this.props.size === 'small') {
        return (<span>{ position.area } / { weather.weather } / { weather.temp }℃</span>)
      } else if (this.props.size === 'normal') {
        return (<span>{ position.area } / { weather.weather } / { weather.temp }℃ / { weather.WD }{ weather.WS } / { weather.sd } / { weather.rain }mm / { weather.aqi }</span>)
      }
    }else {
      return null
    }
  }
  showWeatherIcon() {
    if (this.props.type === 'oneline') {
      return (<div className="r-weather-icon" ref={this.svgContainer} />)
    } else if (this.props.type === 'multiline') {
      return (
        <div className="r-weather-icon" style={{
          width: this.props.iconSize,
          height: this.props.iconSize
        }} ref={this.svgContainer} />
      )
    }
  }
  showMultilineMessage() {
    const { position, weather } = this.state
    if (this.props.type === 'multiline') {
      if (this.props.size === 'small') {
        return (
          <Fragment>
            <p>{ position.area }</p>
            <p>{ weather.temp }℃ / { weather.weather }</p>
          </Fragment>
        )
      } else if (this.props.size === 'normal') {
        return (
          <Fragment>
            <p>坐标：{ position.area }</p>
            <p>天气：{ weather.weather }</p>
            <p>气温：{ weather.temp }℃</p>
            <p>风向：{ weather.WD }</p>
            <p>风力：{ weather.WS }</p>
            <p>降水量：{ weather.rain }mm</p>
            <p>相对湿度：{ weather.sd }</p>
            <p>大气压强：{ weather.qy }hPa</p>
            <p>空气质量：{ weather.aqi }</p>
          </Fragment>
        )
      }
    } else {
      return null
    }
  }
  render () {
    return (
      <div
        className="r-weather"
        onClick={() => this.getWeather() }
        style={{color: `rgb(${this.state.convartedColor[0]}, ${this.state.convartedColor[1]}, ${this.state.convartedColor[2]})`}}
      >
        <div 
          className={
            (this.props.size === 'small'? 'is-small ': 'is-normal ') + 
            (this.props.type === 'oneline'? 'is-oneline': 'is-multiline')
          }
        >
          {this.showOnelineMessage()}
          {this.showWeatherIcon()}
          {this.showMultilineMessage()}
        </div>
      </div>
    )
  }
}

ReactMiniWeather.propTypes = {
  size: PropTypes.oneOf(['small', 'normal']),
  type: PropTypes.oneOf(['oneline', 'multiline']),
  color: PropTypes.string,
  iconSize: PropTypes.number,
  url: PropTypes.string
}

ReactMiniWeather.defaultProps = {
  size: 'small',
  type: 'oneline',
  color: '000000',
  iconSize: 100,
  url: 'https://apia.aidioute.cn/weather/index.php'
}