import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Header, List, Container, Loader, Segment } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

const styles = {
  scroller: { height: '60vh', overflow: 'auto' }
}

class Scores extends React.Component {
  state = { scores: [], show: 'All', page: 1, totalPages: 0 }

  componentDidMount() {
    axios.get('/api/scores')
      .then( res => {
        let { data, headers } = res;
        this.setState({ scores: data.scores, totalPages: data.total_pages })
        this.props.dispatch({ type: 'HEADERS', headers })
      });
  }

  toggleShow = () => {
    this.setState( state => {
      return { show: state.show === 'All' ? 'My' : 'All' }
    })
  }

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/scores?page=${page}`)
      .then( ({ data, headers }) => {
        this.setState( state => {
          return { scores: [...state.scores, ...data.scores], page: state.page + 1 }
        })
        this.props.dispatch({ type: 'HEADERS', headers })
      });
  }

  render() {
    let { scores, show, page, totalPages } = this.state;
    return (
      <Container>
        <Header as="h2">{`Showing ${show} Scores`}</Header>
        <Button onClick={this.toggleShow}>
          { show === 'All' ? 'My Scores' : 'All Scores' }
        </Button>
        <List divided style={styles.scroller}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={page < totalPages}
            loader={<Loader />}
            useWindow={false}
          >
            { scores.map( s =>
                <List.Item key={s.id}>
                  <List.Content>
                    <List.Header>{s.value}</List.Header>
                    <List.Description>{s.email}</List.Description>
                  </List.Content>
                </List.Item>
              )
            }
          </InfiniteScroll>
        </List>
      </Container>
    )
  }
}

export default connect()(Scores);
