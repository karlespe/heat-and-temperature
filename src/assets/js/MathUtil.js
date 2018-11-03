export default class MathUtil {

  constructor() {}
  
  static round(value, numberOfDecimals) {
    return Number(Math.round(value + 'e' + numberOfDecimals) + 'e-' + numberOfDecimals);
  }

}
