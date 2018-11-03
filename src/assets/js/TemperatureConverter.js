export default class TemperatureConverter {

  constructor(converterImpl) {
    this.converterImpl = converterImpl;
  }

  convert(temperature) {
    try {
      return this.converterImpl(parseFloat(temperature));
    } catch (error) {
      return null;
    }
  }

}

TemperatureConverter.KELVIN = "k";
TemperatureConverter.RANKINE = "r";
TemperatureConverter.CELSIUS = "c";
TemperatureConverter.FAHRENHEIT = "f";

