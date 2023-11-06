import {Component, OnInit} from '@angular/core';
import {LocationData, WeatherData} from "./WeatherObjects";
import {HttpClient} from "@angular/common/http";
import {WeatherIcons} from "./WeatherIconsEnum";
import {timer} from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  positionEnabled = false;
  iconString: string = "sunny";
  cityString: string = "Unknown";
  temperatureString: string = "0";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // check every minute for new weather data
    timer(0, 60 * 1000).subscribe(() => {
      navigator.geolocation.getCurrentPosition((position => {
        this.positionEnabled = true;
        this.getWeatherCode(position.coords.longitude, position.coords.latitude);
        this.updateCityName(position.coords.longitude, position.coords.latitude);
      }));
    });
  }

  updateCityName(longitude: number, latitude: number) {
    const urlString =
      "https://api.bigdatacloud.net/data/reverse-geocode-client" +
      "?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&localityLanguage=en"
    this.http.get<LocationData>(urlString).subscribe(data => {
      this.cityString = data.city;
    });
  }

  getWeatherCode(longitude: number, latitude: number) {
    const urlString =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&current=temperature_2m,weathercode";
    this.http.get<WeatherData>(urlString).subscribe(data => {
      this.temperatureString = "" + data.current.temperature_2m;
      this.iconString = this.mapCodeToIconString(data.current.weathercode);
    })
  }

  mapCodeToIconString(code: number): string {
    if (code == 0) return WeatherIcons.SUNNY;
    if (code == 1) return WeatherIcons.PARTLY_CLOUDY_DAY;
    if (code == 2) return WeatherIcons.CLEAR_DAY;
    if (code == 3) return WeatherIcons.CLOUD;
    if (code == 4) return WeatherIcons.WEATHER_MIX;
    if (code == 5) return WeatherIcons.FOGGY;
    if (code == 6) return WeatherIcons.WEATHER_MIX;
    if (code == 7) return WeatherIcons.WEATHER_MIX;
    if (code == 8) return WeatherIcons.WEATHER_MIX;
    if (code == 9) return WeatherIcons.WEATHER_MIX;
    if (code == 10) return WeatherIcons.FOGGY;
    if (code == 11) return WeatherIcons.FOGGY;
    if (code == 12) return WeatherIcons.FOGGY;
    if (code == 13) return WeatherIcons.WEATHER_MIX;
    if (code == 14) return WeatherIcons.WEATHER_MIX;
    if (code == 15) return WeatherIcons.WEATHER_MIX;
    if (code == 16) return WeatherIcons.WEATHER_MIX;
    if (code == 17) return WeatherIcons.WEATHER_MIX;
    if (code == 18) return WeatherIcons.WEATHER_HAIL;
    if (code == 19) return WeatherIcons.WEATHER_HAIL;
    if (code == 20) return WeatherIcons.RAINY;
    if (code == 21) return WeatherIcons.RAINY;
    if (code == 22) return WeatherIcons.CLOUDY_SNOWING;
    if (code == 23) return WeatherIcons.WEATHER_MIX;
    if (code == 24) return WeatherIcons.WEATHER_HAIL;
    if (code == 25) return WeatherIcons.RAINY;
    if (code == 26) return WeatherIcons.WEATHER_MIX;
    if (code == 27) return WeatherIcons.WEATHER_HAIL;
    if (code == 28) return WeatherIcons.FOGGY;
    if (code == 29) return WeatherIcons.THUNDERSTORM;
    if (code == 30) return WeatherIcons.CLEAR_DAY;
    if (code == 31) return WeatherIcons.CLEAR_DAY;
    if (code == 32) return WeatherIcons.CLEAR_NIGHT;
    if (code == 33) return WeatherIcons.CLEAR_NIGHT;
    if (code == 34) return WeatherIcons.CLEAR_NIGHT;
    if (code == 35) return WeatherIcons.CLEAR_NIGHT;
    if (code == 36) return WeatherIcons.WEATHER_SNOWING;
    if (code == 37) return WeatherIcons.WEATHER_SNOWING;
    if (code == 38) return WeatherIcons.WEATHER_SNOWING;
    if (code == 39) return WeatherIcons.WEATHER_SNOWING;
    if (code == 40) return WeatherIcons.FOGGY;
    if (code == 41) return WeatherIcons.FOGGY;
    if (code == 42) return WeatherIcons.FOGGY;
    if (code == 43) return WeatherIcons.FOGGY;
    if (code == 44) return WeatherIcons.FOGGY;
    if (code == 45) return WeatherIcons.FOGGY;
    if (code == 46) return WeatherIcons.FOGGY;
    if (code == 47) return WeatherIcons.FOGGY;
    if (code == 48) return WeatherIcons.FOGGY;
    if (code == 49) return WeatherIcons.FOGGY;
    if (code == 50) return WeatherIcons.RAINY;
    if (code == 51) return WeatherIcons.RAINY;
    if (code == 52) return WeatherIcons.RAINY;
    if (code == 53) return WeatherIcons.RAINY;
    if (code == 54) return WeatherIcons.RAINY;
    if (code == 55) return WeatherIcons.RAINY;
    if (code == 56) return WeatherIcons.WEATHER_SNOWING;
    if (code == 57) return WeatherIcons.WEATHER_HAIL;
    if (code == 58) return WeatherIcons.WEATHER_MIX;
    if (code == 59) return WeatherIcons.WEATHER_MIX;
    if (code == 60) return WeatherIcons.RAINY;
    if (code == 61) return WeatherIcons.RAINY;
    if (code == 62) return WeatherIcons.RAINY;
    if (code == 63) return WeatherIcons.RAINY;
    if (code == 64) return WeatherIcons.RAINY;
    if (code == 65) return WeatherIcons.RAINY;
    if (code == 66) return WeatherIcons.WEATHER_SNOWING;
    if (code == 67) return WeatherIcons.WEATHER_HAIL;
    if (code == 68) return WeatherIcons.WEATHER_MIX;
    if (code == 69) return WeatherIcons.WEATHER_MIX;
    if (code == 70) return WeatherIcons.WEATHER_SNOWING;
    if (code == 71) return WeatherIcons.WEATHER_SNOWING;
    if (code == 72) return WeatherIcons.WEATHER_SNOWING;
    if (code == 73) return WeatherIcons.WEATHER_SNOWING;
    if (code == 74) return WeatherIcons.WEATHER_SNOWING;
    if (code == 75) return WeatherIcons.WEATHER_SNOWING;
    if (code == 76) return WeatherIcons.FOGGY;
    if (code == 77) return WeatherIcons.WEATHER_SNOWING;
    if (code == 78) return WeatherIcons.WEATHER_SNOWING;
    if (code == 79) return WeatherIcons.WEATHER_HAIL;
    if (code == 80) return WeatherIcons.RAINY;
    if (code == 81) return WeatherIcons.RAINY;
    if (code == 82) return WeatherIcons.WEATHER_HAIL;
    if (code == 83) return WeatherIcons.WEATHER_MIX;
    if (code == 84) return WeatherIcons.WEATHER_MIX;
    if (code == 85) return WeatherIcons.WEATHER_SNOWING;
    if (code == 86) return WeatherIcons.WEATHER_SNOWING;
    if (code == 87) return WeatherIcons.WEATHER_HAIL;
    if (code == 88) return WeatherIcons.WEATHER_HAIL;
    if (code == 89) return WeatherIcons.WEATHER_HAIL;
    if (code == 90) return WeatherIcons.WEATHER_HAIL;
    if (code == 91) return WeatherIcons.RAINY;
    if (code == 92) return WeatherIcons.RAINY;
    if (code == 93) return WeatherIcons.WEATHER_MIX;
    if (code == 94) return WeatherIcons.WEATHER_MIX;
    if (code == 95) return WeatherIcons.THUNDERSTORM;
    if (code == 96) return WeatherIcons.THUNDERSTORM;
    if (code == 97) return WeatherIcons.THUNDERSTORM;
    if (code == 98) return WeatherIcons.THUNDERSTORM;
    if (code == 99) return WeatherIcons.THUNDERSTORM;
    return WeatherIcons.SUNNY;
  }


  openWeather($event: MouseEvent) {
    const url = "https://www.google.com/search?q=weather";
    if ($event.which == 3) return;
    if ($event.ctrlKey) {
      window.open(url, '_blank');
    } else if ($event.which == 2) {
      window.open(url, '_blank');
    } else {
      window.open(url, '_self');
    }
  }
}
