import _ from 'lodash'
import React from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export const TagInput = (
    {
        isLoading,
        value,
        source,
        tags,
        handleKeyPress,
        handleSelectionChange,
        handleKeyDown,
        handleResultSelect,
        handleSearchChange,
        noResultsMessage,
        props
    }) => {

    const findResults = () => {
        const re = new RegExp(_.escapeRegExp(value), 'i')
        const isMatch = result => {
            return re.test(result.title) && tags.findIndex((tag) => tag.title === result.title) === -1;
        }
        return _.filter(source, isMatch)
    }

    return (
        <Grid stackable>
            <Grid.Column width={8}>
                <Search
                    onKeyPress = { handleKeyPress }
                    onSelectionChange = { handleSelectionChange }
                    onKeyDown={handleKeyDown}
                    loading={isLoading}
                    onResultSelect={handleResultSelect}
                    onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                    results={findResults(value)}
                    value={value}
                    noResultsMessage = {noResultsMessage + ' #' + value}
                    {...props}
                />
            </Grid.Column>
            <Grid.Column width={4}>
                {
                   tags.map((tag, index) => <Label key={index} as='a' color='teal' tag>{tag.title}</Label>)
                }
            </Grid.Column>
        </Grid>
    )
}

TagInput.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    source: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleResultSelect: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    props: PropTypes.object
}

export default TagInput
