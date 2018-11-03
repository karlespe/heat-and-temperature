import TemperatureConverter from './TemperatureConverter';

export default class TemperatureConverterFactory {

  constructor() {
    this.instance = null;
    this.converters = {};
  }

  static createInstance() {

    var factory = new TemperatureConverterFactory();

    factory.converters[TemperatureConverter.RANKINE + TemperatureConverter.RANKINE] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature;
    });
    factory.converters[TemperatureConverter.RANKINE + TemperatureConverter.CELSIUS] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return (temperature - 491.61) * (5 / 9);
    });
    factory.converters[TemperatureConverter.RANKINE + TemperatureConverter.FAHRENHEIT] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature - 459.67;
    });
    factory.converters[TemperatureConverter.RANKINE + TemperatureConverter.KELVIN] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature * (5/9);
    });


    factory.converters[TemperatureConverter.CELSIUS + TemperatureConverter.RANKINE] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return (temperature * (9 / 5)) + 491.67;
    });
    factory.converters[TemperatureConverter.CELSIUS + TemperatureConverter.CELSIUS] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature;
    });
    factory.converters[TemperatureConverter.CELSIUS + TemperatureConverter.FAHRENHEIT] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return (temperature * (9/5)) + 32;
    });
    factory.converters[TemperatureConverter.CELSIUS + TemperatureConverter.KELVIN] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature + 273.15;
    });


    factory.converters[TemperatureConverter.FAHRENHEIT + TemperatureConverter.RANKINE] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature + 459.67;
    });
    factory.converters[TemperatureConverter.FAHRENHEIT + TemperatureConverter.CELSIUS] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return (temperature - 32) * (5/9);
    });
    factory.converters[TemperatureConverter.FAHRENHEIT + TemperatureConverter.FAHRENHEIT] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature;
    });
    factory.converters[TemperatureConverter.FAHRENHEIT + TemperatureConverter.KELVIN] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return ((temperature - 32) * (5/9)) + 273.15;
    });


    factory.converters[TemperatureConverter.KELVIN + TemperatureConverter.RANKINE] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature * 1.8;
    });
    factory.converters[TemperatureConverter.KELVIN + TemperatureConverter.CELSIUS] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature - 273.15;
    });
    factory.converters[TemperatureConverter.KELVIN + TemperatureConverter.FAHRENHEIT] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return ((temperature - 273.15) * (9/5)) + 32;
    });
    factory.converters[TemperatureConverter.KELVIN + TemperatureConverter.KELVIN] = TemperatureConverterFactory.createStrategy(function(temperature) {
      return temperature;
    });

    return factory;
  }

  static createStrategy(impl) {
    return new TemperatureConverter(impl);
  }

  getInstance() {
    if (!this.instance) {
      this.instance = TemperatureConverterFactory.createInstance();
    }
    return this.instance;
  }

  getConverterInstance(fromUnit, toUnit) {
    return this.converters[fromUnit + toUnit];
  }


}
