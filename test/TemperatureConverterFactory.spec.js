import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import TemperatureConverterFactory from '../src/assets/js/TemperatureConverterFactory'

describe('TemperatureConverterFactory', function() {

  it('instance is singleton', function () {

    var factory = new TemperatureConverterFactory();

    expect(factory.getInstance()).toEqual(factory.getInstance());
    expect(factory.getInstance() == factory.getInstance()).toBeTruthy();
    expect(factory.getInstance() == new TemperatureConverterFactory().getInstance()).toBeFalsy();

  });

});
