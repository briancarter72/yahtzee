import React from 'react';
import { connect } from 'react-redux';
import { List, Segment, Header } from 'semantic-ui-react';
import { updateScores, resetRoll } from '../actions/currentGame';
import { singles, addAllDice, staticScore } from '../utils/scoringEngine';

const styles = {
  pointer: {
    cursor: 'pointer',
  }
}

class ScoreRow extends React.Component {

  updateScore = (key) => {
    let { currentGame: { dice, scores }, dispatch } = this.props;

    let entry = scores.find( d => d.name === key);
    dispatch(resetRoll())

    if(entry.value)
      entry.score = singles(entry.value, dice);
    else if (entry.addAll)
      entry.score = addAllDice(entry.name, dice);
    else
      entry.score = staticScore(entry.name, dice);

    let newScores = scores.map( score => {
      if (score.name === key)
        return entry
      return score
    })

    dispatch(updateScores(newScores));
  }

  render() {
    let { name, score, currentGame: { roll } } = this.props;
    return(
      <List.Item>
        { score === null &&
          <List.Icon
            style={styles.pointer}
            name='check circle outline'
            color='green'
            onClick={ roll !== 0 ? () => this.updateScore(name) : f => f }
          />
        }
        <List.Content>
          <Header as='h4' floated='left'>{score || 0}</Header>
          <Header as='h5' floated='right'>{name}</Header>
        </List.Content>
      </List.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return { currentGame: state.currentGame }
}

export default connect(mapStateToProps)(ScoreRow);
