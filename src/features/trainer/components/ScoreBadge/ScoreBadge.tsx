import React from 'react';
import { ArrowDown, ArrowUp } from '../../../../components/Icons';
import './ScoreBadge.scss';

export const ScoreBadge = ({ score, increased, decreased }: {
  score: number;
  increased?: boolean;
  decreased?: boolean;
}): JSX.Element => (
  <span className={`badge rounded-pill score-badge lvl-${score}`}>
    {decreased && <ArrowDown></ArrowDown>}
    {increased && <ArrowUp></ArrowUp>}
    {score}
  </span>
);
