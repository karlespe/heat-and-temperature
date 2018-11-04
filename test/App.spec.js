import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App component', function() {

  it('result is not displayed initially', function () {
    var wrapper = shallowMount(App, {
      sync: false,
      propsData: {}
    });
    expect(wrapper.find('#result').isVisible()).toBeFalsy();
    expect(wrapper.vm.$data.displayResult).toBeFalsy();
  });

  it('default units are correct', function () {

    var wrapper = shallowMount(App, {
      sync: false,
      propsData: {}
    });

    var selectInput = wrapper.find('#inputUnit');
    expect(selectInput.element.options[selectInput.element.selectedIndex].text).toBe('Celsius');

    var selectStudent = wrapper.find('#studentUnit');
    expect(selectStudent.element.options[selectStudent.element.selectedIndex].text).toBe('Fahrenheit');

  });

  it('shows proper results based on input data', function () {

    var wrapper = shallowMount(App, {
      sync: false,
      propsData: {}
    });

    var data = [
      ['f', 'Fahrenheit', 'r', 'Rankine', '84.2', '543.5', 'Correct'],
      ['c', 'Celsius', 'k', 'Kelvin', '-45.14', '227.51', 'Correct'],
      ['k', 'Kelvin', 'f', 'Fahrenheit', '317.33', '110.5', 'Incorrect'],
      ['r', 'Rankine', 'c', 'Celsius', '444.5', '-30.9', 'Incorrect'],
      ['f', 'Fahrenheit', 'r', 'Rankine', '6.5', 'dog', 'Incorrect'],
      ['f', 'Fahrenheit', 'c', 'Celsius', 'dog', '45.32', 'Invalid']
    ];

    for (var i = 0; i < data.length; i++) {

      var selectInput = wrapper.find('#inputUnit');
      selectInput.element.value = data[i][0];
      selectInput.trigger('change');
      expect(selectInput.element.options[selectInput.element.selectedIndex].text).toBe(data[i][1]);

      var selectStudent = wrapper.find('#studentUnit');
      selectStudent.element.value = data[i][2];
      selectStudent.trigger('change');
      expect(selectStudent.element.options[selectStudent.element.selectedIndex].text).toBe(data[i][3]);

      wrapper.find('#inputValue').element.value = data[i][4];
      wrapper.find('#inputValue').trigger('change');
      wrapper.find('#inputValue').trigger('input');
      wrapper.find('#studentValue').element.value = data[i][5];
      wrapper.find('#studentValue').trigger('change');
      wrapper.find('#studentValue').trigger('input');

      wrapper.find('#button').trigger('click');

      expect(wrapper.vm.$data.displayResult).toBeTruthy();
      expect(wrapper.vm.$data.result).toBe(data[i][6]);

    }


  });

});
