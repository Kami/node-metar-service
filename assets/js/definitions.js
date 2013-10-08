var definitions = {
  'metar': 'Original METAR string passed to the service.',

  'station': 'Observation station (ICAO airport code).',
  'time': 'Time of the observation.',
  'auto': 'Indicates if this report is fully automated.',

  'wind': 'Object with wind information.',
  'wind_speed': 'Wind speed. Unit is available under "unit" key.',
  'wind_gust': 'Window gust speed.',
  'wind_direction': 'Window direction (in degrees).',
  'wind_unit': 'Unit for wind speed. Can be MPS, KPH or KT.',
  'wind_variation': 'Object with wind direction variation information.',
  'wind_variation_min': 'Minimum variation',
  'wind_variation_max': 'Maximum variation',

  'cavok': 'Indicates Ceiling And Visibility OKay',
  'visibility': 'Visibility in metters',

  'weather': 'Object with weather information',
  'weather_abbreiation': 'Weather phenomena abbreviation',
  'weather_meaning': 'Weather phenomena meaning',

  'temperature': 'Temperature in Celsius',
  'dewPointTemperature': 'Dewpoint temperature in Celsius'
};
