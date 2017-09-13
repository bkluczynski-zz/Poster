import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts } from '../actions'
import { populateCategories } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import { Container, Divider, List } from 'semantic-ui-react'


class Category extends Component {

  render() {

    const {categories } = this.props

    return (
      <div>
      <Container textAlign='left'>
      <div key={'huge'}>
        <List celled horizontal size={'huge'}>
          <List.Item>
            <Link to="/">
              <p>home</p>
            </Link>
          </List.Item>
        {categories.map(
          category => (
              <List.Item>
                  <Link to={`${category.path}`}>
                    <p>{category.name}</p>
                  </Link>
              </List.Item>
        ))}
        </List>
      </div>
    </Container>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  categories : Object.keys(state.post.categories).map(cat => state.post.categories[cat])
})

const mapDispatchToProps = dispatch => ({
  getCategories: (data) => dispatch(populateCategories(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Category);
