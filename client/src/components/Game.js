import React from 'react';
import { Grid } from 'semantic-ui-react';
import Board from './Board';
import ScoreCard from './ScoreCard';

const styles = {
 fullHeight: { height: 'calc(100vh - 67px' },
 board: { backgroundColor: '#AAFFAA' },
 scores: { backgroundColor: '#9370DB' }
}

const Game = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={10} style={{...styles.fullHeight, ...styles.board}}>
        <Board />
      </Grid.Column>
      <Grid.Column width={6} style={{...styles.fullHeight, ...styles.scores}}>
        <ScoreCard />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default Game;
