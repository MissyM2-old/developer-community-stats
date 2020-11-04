import React from 'react'
import { graphql } from 'gatsby'
import 'flag-icon-css/css/flag-icon.min.css'
import DeveloperCard from '../DeveloperCard'

import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

class DevOverview extends React.Component {
  constructor(props) {
    super(props)
    this.initialFilter = { type: '', value: '', name: '' }
    this.state = {
      searchText: '',
      searchType: { label: 'username', value: 'githubUserId' },
      filterableFields: [
        { name: 'Github user name', type: 'githubUserId' },
        { name: 'Name', type: 'name' },
        { name: 'Country', type: 'country' },
      ],
      sortableFields: [
        { name: 'Country', type: 'country' },
        { name: 'Github user name', type: 'githubUserId' },
        { name: 'Name', type: 'name' },
        { name: "This year's commits", type: 'thisYearContribution' },
        { name: 'Followers', type: 'followersCount' },
      ],
      selectedFilter: this.initialFilter,
      filters: [],
      isAddFilterPopoverOpen: false,
      sort: { field: '', type: '', order: '' },
    }
  }

  handleSearchChange = event => {
    const value = event.target.value
    this.setState({
      searchText: value,
    })
  }

  handleTypeChange = event => {
    let index = event.nativeEvent.target.selectedIndex
    let label = event.nativeEvent.target[index].title
    console.log(label)

    this.setState({
      searchType: {
        value: event.target.value,
        label: label,
      },
    })
  }

  deleteFilter = index => {
    const updatedFilters = this.state.filters.filter((filter, i) => i !== index)
    this.setState({
      filters: updatedFilters,
    })
  }

  onPopoverVisibilityChange = visibility => {
    this.setState({
      isAddFilterPopoverOpen: visibility,
    })
  }

  hidePopover = () => {
    this.setState({
      isAddFilterPopoverOpen: false,
    })
  }

  updateSelectedFilterValue = event => {
    const value = event.target.value
    this.setState(prevState => ({
      ...prevState,
      selectedFilter: {
        ...prevState.selectedFilter,
        value: value,
      },
    }))
  }

  updateSelectedFilterType = value => {
    this.setState(prevState => ({
      ...prevState,
      selectedFilter: {
        ...prevState.selectedFilter,
        ...JSON.parse(value),
      },
    }))
  }

  addFilter = () => {
    this.setState({
      isAddFilterPopoverOpen: false,
      filters: this.state.filters.concat(this.state.selectedFilter),
      selectedFilter: { ...this.initialFilter },
    })
  }

  toggleSort = sort => {
    if (this.state.sort && sort.type === this.state.sort.type) {
      if (this.state.sort.order === 'asc') {
        this.setState({
          sort: {
            ...this.state.sort,
            order: 'dsc',
          },
        })
      } else {
        this.setState({
          sort: null,
        })
      }
    } else {
      this.setState({
        sort: { field: sort.field, type: sort.type, order: 'asc' },
      })
    }
  }

  getFilteredList = contributors => {
    const list = contributors.reduce((list, current) => {
      const isFilteredContributor = this.state.filters.every(filter => {
        console.log('====> ', filter.value)
        if (
          current[filter.type]
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        ) {
          return true
        }
      })

      if (isFilteredContributor) {
        list.push(current)
      }

      return list
    }, [])
    return list
  }

  getSortedList = contributors => {
    const list = !!this.state.sort
      ? contributors.sort((a, b) => {
        if (this.state.sort.order === 'asc') {
          if (b[this.state.sort.type]) {
            if (typeof b[this.state.sort.type] === 'number') {
              const order = a[this.state.sort.type] - b[this.state.sort.type]
              return order
            } else {
              const order =
                b[this.state.sort.type] &&
                b[this.state.sort.type]
                  .toString()
                  .localeCompare(
                    a[this.state.sort.type] &&
                    a[this.state.sort.type].toString()
                  )
              return order
            }
          }
        } else {
          if (typeof b[this.state.sort.type] === 'number') {
            const order = b[this.state.sort.type] - a[this.state.sort.type]
            return order
          } else {
            const order =
              a[this.state.sort.type] &&
              a[this.state.sort.type]
                .toString()
                .localeCompare(
                  b[this.state.sort.type] &&
                  b[this.state.sort.type].toString()
                )
            return order
          }
        }
      })
      : contributors

    return list
  }

  render() {
/*       console.log('insixe devOverview, props', props); */
    /* const {
      data: {
        allContributor: { nodes: contributors },
      },
    } = this.props

    const filteredList = this.getFilteredList(contributors)

    const sortedList = this.getSortedList(filteredList)

    const searchFilterList = sortedList.filter(contributor =>
      contributor[this.state.searchType['value']]
        .toLowerCase()
        .includes(this.state.searchText.toLowerCase())
    )
 */
    return (
        <div className="filter-bar">missy
          {/* <div className="type-filter">
            <div className="type-title">Search by: </div>
            <select id="type-select" className="app-select" onChange={this.handleTypeChange}>
              <option value="githubUserId" title="username">
                Username
              </option>
              <option value="country" title="country">
                Country
              </option>
              <option value="name" title="name">
                Name
              </option>
            </select>
          </div>

          <input
            size="large"
            className="app-input"
            placeholder={'Search by ' + this.state.searchType.label}
            onChange={this.handleSearchChange}
            value={this.state.searchText}
          />
          <div className="sort-list">
            {this.state.sortableFields.map(sort => (
              <button
                key={sort.type}
                onClick={() => this.toggleSort(sort)}
                className="button"
              >
                {sort.name}
                {this.state.sort && sort.type === this.state.sort.type ? (
                  this.state.sort.order === 'asc' ? (
                    <AiOutlineArrowUp />
                  ) : (
                      <AiOutlineArrowDown />
                    )
                ) : null}
              </button>
            ))}
          </div>
        </div>
        <div className="developer-card-container">
          {searchFilterList.map((contributorStats, i) => (
            <DeveloperCard
              position={i + 1}
              {...contributorStats}
              key={contributorStats.id}
              searchKey={this.state.searchText}
            />
          ))} */}
        </div>
    )
  }
}

export default DevOverview

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContributor(sort: { order: DESC, fields: thisYearContribution }) {
      totalCount
      nodes {
        id
        countryCode
        repositoryCount
        contributionYears
        country
        firstContribution
        followersCount
        githubUserId
        issuesCount
        linkedin
        website
        name
        pullRequestsCount
        repoContributedCount
        thisYearContribution
        twitter
        avatarUrl
      }
    }
  }
`
