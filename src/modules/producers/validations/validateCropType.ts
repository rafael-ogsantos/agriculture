import { ValidationStrategy } from "../interfaces/validation";
import { Crops, ProducerInput } from "../schema";

export class ValidateCropType implements ValidationStrategy {
  validate(producer: ProducerInput) {
    const { crops } = producer;
    const validCropTypes = Object.values(Crops);

    for (const crop of crops) {
      if (!validCropTypes.includes(crop)) {
        throw new Error('Invalid crop type');
      }
    }
  }
}