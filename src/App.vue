<template>
  <div id="app" class="container">

    <div class="field">
      <label class="label">Input temperature</label>
      <div class="field has-addons">
        <div class="control">
          <input class="input" id="inputValue" type="text" placeholder="Input temperature" @click="hideResult" @focus="hideResult" v-model="inputValue">
        </div>
        <div class="control">
        <span class="select">
          <select @change="hideResult" v-model="inputUnit" id="inputUnit">
            <option v-for="option in unitOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </span>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Student response</label>
      <div class="field has-addons">
        <div class="control">
          <input class="input" id="studentValue" type="text" placeholder="Student response" @click="hideResult" @focus="hideResult" v-model="studentValue">
        </div>
        <div class="control">
        <span class="select">
          <select @click="hideResult" v-model="studentUnit" id="studentUnit">
            <option v-for="option in unitOptions" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </span>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="computeResult" id="button">Check</button>
      </div>
    </div>
    <div>
      <p class="title is-2" v-show="displayResult" id="result">{{ result }}</p>
    </div>

  </div>
</template>

<script>

import TemperatureConverter from './assets/js/TemperatureConverter'
import TemperatureConverterFactory from './assets/js/TemperatureConverterFactory'
import MathUtil from './assets/js/MathUtil'

export default {

  name: 'app',

  data() {
    return {
      displayResult: false,
      result: '',
      inputValue: '',
      inputUnit: TemperatureConverter.CELSIUS,
      studentValue: '',
      studentUnit: TemperatureConverter.FAHRENHEIT,
      unitOptions: [
        { text: 'Celsius', value: TemperatureConverter.CELSIUS },
        { text: 'Fahrenheit', value: TemperatureConverter.FAHRENHEIT },
        { text: 'Kelvin', value: TemperatureConverter.KELVIN },
        { text: 'Rankine', value: TemperatureConverter.RANKINE }
      ],
      temperatureConverterFactory: null,
      LABEL_CORRECT: "Correct",
      LABEL_INCORRECT: "Incorrect",
      LABEL_INVALID: "Invalid",
    }
  },

  methods: {

    computeResult: function() {

      try {

        var converter = this.temperatureConverterFactory.getConverterInstance(this.inputUnit, this.studentUnit);
        var answer = converter.convert(this.inputValue);

        if (isNaN(answer)) {

          this.result = this.LABEL_INVALID;

        } else {

          var authoritativeAnswer = MathUtil.round(answer, 0);
          var studentAnswer = MathUtil.round(this.studentValue, 0);
          this.result = authoritativeAnswer == studentAnswer ? this.LABEL_CORRECT : this.LABEL_INCORRECT;

        }

      } catch (error) {
        console.log(error);
        this.result = this.LABEL_INVALID;
      }

      this.displayResult = true;

    },

    hideResult: function() {
      this.displayResult = false;
    }

  },

  mounted() {
    this.temperatureConverterFactory = new TemperatureConverterFactory().getInstance();
  }

}

</script>

<style>
  @import './assets/css/bulma.css';
  body { padding-left: 40px; padding-right: 40px; padding-top: 20px; }
</style>
