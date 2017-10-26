import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import d1 from '../images/d1.png';
import d2 from '../images/d2.png';
import d3 from '../images/d3.png';
import d4 from '../images/d4.png';
import d5 from '../images/d5.png';
import d6 from '../images/d6.png';
import { toggleKept } from '../actions/currentGame';
import { connect } from 'react-redux';

const styles = {
  dice: { marginLeft: '20px', cursor: 'pointer' },
  selected: { borderBottom: 'solid 2px blue' }
}

const images = { d1, d2, d3, d4, d5, d6 }

const Dice = ({ value, index, kept, dispatch }) => (
 <Grid.Column textAlign="center" width={3}>
   <Image
     style={ kept ? { ...styles.dice, ...styles.selected } : styles.dice }
     src={images[`d${value}`]}
     alt={`dice value ${value}`}
     onClick={ () => dispatch(toggleKept(index)) }
   />
 </Grid.Column>
)

export default connect()(Dice);
