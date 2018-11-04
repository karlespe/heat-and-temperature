import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import MathUtil from '../src/assets/js/MathUtil'
import TemperatureConverter from '../src/assets/js/TemperatureConverter'
import TemperatureConverterFactory from '../src/assets/js/TemperatureConverterFactory'

describe('TemperatureConverterFactory', function() {

  var UNITS = [TemperatureConverter.CELSIUS, TemperatureConverter.FAHRENHEIT, TemperatureConverter.KELVIN, TemperatureConverter.RANKINE];

  it('instance is singleton', function () {

    var factory = new TemperatureConverterFactory();

    expect(factory.getInstance()).toEqual(factory.getInstance());
    expect(factory.getInstance() == factory.getInstance()).toBeTruthy();
    expect(factory.getInstance() == new TemperatureConverterFactory().getInstance()).toBeFalsy();

  });

  it('strategy exists for every unit combination', function () {

    var factory = new TemperatureConverterFactory().getInstance();

    expect(factory.getConverterInstance("x", "y")).toBeUndefined();

    for (var i = 0; i < UNITS.length; i++) {
      var fromUnit = UNITS[i];
      for (var j = 0; j < UNITS.length; j++) {
        var toUnit = UNITS[j];
        expect(factory.getConverterInstance(fromUnit, toUnit)).toBeDefined();
      }
    }

  });

  it('computes convertions accurately', function () {

    var factory = new TemperatureConverterFactory().getInstance();
    var inputValues = ["0", "50", "100"];

    var results = [];
    var fromUnit, toUnit, i, j, k;

    for (i = 0; i < UNITS.length; i++) {
      fromUnit = UNITS[i];
      for (j = 0; j < UNITS.length; j++) {
        toUnit = UNITS[j];
        results[fromUnit + toUnit] = {};
      }
    }

    // Convertion results for all unit combinations with input values 0, 50, and 100.
    results["cc"]["0"] = 0;
    results["cc"]["50"] = 50;
    results["cc"]["100"] = 100;
    results["cf"]["0"] = 32;
    results["cf"]["50"] = 122;
    results["cf"]["100"] = 212;
    results["ck"]["0"] = 273.15;
    results["ck"]["50"] = 323.15;
    results["ck"]["100"] = 373.15;
    results["cr"]["0"] = 491.67;
    results["cr"]["50"] = 581.6700000000001;
    results["cr"]["100"] = 671.6700000000001;
    results["fc"]["0"] = -17.77777777777778;
    results["fc"]["50"] = 10;
    results["fc"]["100"] = 37.77777777777778;
    results["ff"]["0"] = 0;
    results["ff"]["50"] = 50;
    results["ff"]["100"] = 100;
    results["fk"]["0"] = 255.3722222222222;
    results["fk"]["50"] = 283.15;
    results["fk"]["100"] = 310.92777777777775;
    results["fr"]["0"] = 459.67;
    results["fr"]["50"] = 509.67;
    results["fr"]["100"] = 559.6700000000001;
    results["kc"]["0"] = -273.15;
    results["kc"]["50"] = -223.14999999999998;
    results["kc"]["100"] = -173.14999999999998;
    results["kf"]["0"] = -459.66999999999996;
    results["kf"]["50"] = -369.66999999999996;
    results["kf"]["100"] = -279.66999999999996;
    results["kk"]["0"] = 0;
    results["kk"]["50"] = 50;
    results["kk"]["100"] = 100;
    results["kr"]["0"] = 0;
    results["kr"]["50"] = 90;
    results["kr"]["100"] = 180;
    results["rc"]["0"] = -273.1166666666667;
    results["rc"]["50"] = -245.3388888888889;
    results["rc"]["100"] = -217.56111111111113;
    results["rf"]["0"] = -459.67;
    results["rf"]["50"] = -409.67;
    results["rf"]["100"] = -359.67;
    results["rk"]["0"] = 0;
    results["rk"]["50"] = 27.77777777777778;
    results["rk"]["100"] = 55.55555555555556;
    results["rr"]["0"] = 0;
    results["rr"]["50"] = 50;
    results["rr"]["100"] = 100;

    for (i = 0; i < UNITS.length; i++) {
      fromUnit = UNITS[i];
      for (j = 0; j < UNITS.length; j++) {
        toUnit = UNITS[j];
        for (k = 0; k < inputValues.length; k++) {
          var value = inputValues[k];
          var convertion = factory.getConverterInstance(fromUnit, toUnit).convert(value);
          expect(convertion).toEqual(results[fromUnit + toUnit][value]);
        }
      }
    }

  });

});
