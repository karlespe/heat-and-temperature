import Vue from 'vue'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App component', function() {

  it('result is not displayed initially', function () {
    var wrapper = shallowMount(App, {
      sync: false,
      propsData: {}
    });
    expect(wrapper.vm.$data.displayResult).toBeFalsy();
    // expect(wrapper.vm.isMultiResponse()).toBeFalsy();
    // expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    // expect(wrapper.find('input[type="radio"]').exists()).toBeFalsy();
  });

});
