import _ from 'lodash'
import React from 'react'
import { Search, Grid, Label } from 'semantic-ui-react'
import Tags from '../tags/tags'
import PropTypes from 'prop-types';

export const TagInput = (
    {
        isLoading,
        value,
        results,
        tags,
        handleKeyPress,
        handleSelectionChange,
        handleKeyDown,
        handleResultSelect,
        handleSearchChange,
        handleDelete,
        noResultsMessage,
        props
    }) => {

    return (
        <div>
            <Search
                onKeyPress = { handleKeyPress }
                onSelectionChange = { handleSelectionChange }
                onKeyDown={handleKeyDown}
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                noResultsMessage = {noResultsMessage}
                icon='tags'
                {...props}
            />
            <Tags tags={tags} onDelete={handleDelete}/>
        </div>
    )
}

TagInput.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleResultSelect: PropTypes.func.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    props: PropTypes.object
}

export default TagInput
