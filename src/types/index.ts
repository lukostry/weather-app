export interface Location {
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  weather: {
    main: string;
  }[];
}

export interface Action<T> {
  payload: T;
  type: string;
}

export interface Loadable<T> {
  data: T;
  loading: boolean;
}
