import { NewMath } from '../../../services/math';
import { SequenceExercise } from '../SequenceExercise';

export class EasySequence extends SequenceExercise {

  constructor() {
    const start = NewMath.randBetween(1, 30);
    const shift = NewMath.randBetween(2, 10);
    super(start, shift, 3, 4);
  }
}
