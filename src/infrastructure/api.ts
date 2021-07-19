const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const KEY = { appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY };

type QueryParamsOptions = Record<string, boolean | number | string>;

export default function api<T>(
  queryParamsConfig: QueryParamsOptions
): Promise<T> {
  const queryParams = Object.entries(Object.assign(KEY, queryParamsConfig))
    .map(([key, value]) => `${key}=${value}&`)
    .join("")
    // trim `&` at the end
    .slice(0, -1);

  const url = `${BASE_URL}?${queryParams}`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
