import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { LearningUnit } from '../../model/learning-unit';
import { TrainGerman } from './TrainGerman';

const selectTrainer = (state: any): LearningUnit[] => state.trainer;

const selectFirstUnit = createSelector(
  [selectTrainer],
  trainer => trainer[0]
);

const mapStateToProps = (state: any) => ({
  unit: selectFirstUnit(state)
});

export const TrainGermanContainer = connect(mapStateToProps)(TrainGerman);