import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import TemperatureConverter from '../src/assets/js/TemperatureConverter'

describe('TemperatureConverter', function() {

  it('constants are accurate', function () {
    expect(TemperatureConverter.CELSIUS).toEqual('c');
    expect(TemperatureConverter.FAHRENHEIT).toEqual('f');
    expect(TemperatureConverter.KELVIN).toEqual('k');
    expect(TemperatureConverter.RANKINE).toEqual('r');
  });

  it('accepts and executes an implementation', function () {

    var converter = new TemperatureConverter(function(temperature) {
      return temperature + 5;
    });

    expect(converter.convert(5)).toEqual(10);

  });

  it('returns NaN when a non-number is used', function () {

    var converter = new TemperatureConverter(function(temperature) {
      return temperature + 5;
    });

    expect(converter.convert('dog')).toEqual(NaN);

  });

  it('returns null when on error', function () {

    var converter = new TemperatureConverter(function(temperature) {
      throwError("error");
    });

    expect(converter.convert(98.3)).toEqual(null);

  });

});
