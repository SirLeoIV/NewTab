interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weathercode: string;
}

interface CurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  weathercode: number;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentData;
}

export interface LocationData {
  city: string;
  locality: string;
}
