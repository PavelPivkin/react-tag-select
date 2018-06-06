import _ from 'lodash'
import React from 'react'
import TagInput from '../../components/tag-input/tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13,
    backspace: 8
};


const source =[
    {
        "title": "apple",
    },
    {
        "title": "banana",
    },
    {
        "title": "pineapple",
    },
    {
        "title": "orange",
    },
    {
        "title": "cherry",
    }
]

class TagInputContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            tags: [],
            isSection: false
        }
    }
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        //this.props.onTagsListChange
        this.setState({ value: '', tags: [...this.state.tags, result] })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value: value })
        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
            this.setState({
                isLoading: false,
                results: this.findResults(this.state.value),
            })
        })
    }


    findResults = (value) => {
        const re = new RegExp(_.escapeRegExp(value), 'i')
        const isMatch = result => {
            return re.test(result.title) && this.state.tags.findIndex((tag) => tag.title === result.title) === -1;
        }
        return _.filter(source, isMatch)
    }


    handleSelectionChange = (event, { result }) => {
        this.setState({ isSection: true });
    }

    handleKeyPress = (event) => {
        this.setState({isSection: false})
    }


    handleKeyDown = (event) => {
        if (event.keyCode === KeyCodes.backspace && event.target.value === '' && this.state.tags.length > 0) {
            const tags = this.state.tags.slice(0, this.state.tags.length);
            const currentTag = tags.pop();
            this.setState({ tags: tags, value: currentTag.title });
            //this.props.onTagsListChange
        }
        var value = event.target.value;
        var tagNotExist = this.state.tags.findIndex((tag) => {
            return tag.title === value;
        }) === -1
        if (event.keyCode === KeyCodes.enter && !this.state.isSection && tagNotExist) {
            //this.props.onTagsListChange
            this.setState({ value: '', tags: [...this.state.tags, { title: value }]})
        }
    }

    handleDelete = (event) => {
        const tags = this.state.tags.filter((item, index) => parseInt(event.target.dataset.id) !== index);
        this.setState({ tags: tags })
    }

    render() {
        const { isLoading, value, tags, results } = this.state

        return <TagInput
            isLoading={isLoading}
            value={value}
            results={results}
            tags={tags}
            handleKeyPress={this.handleKeyPress}
            handleSelectionChange={this.handleSelectionChange}
            handleKeyDown={this.handleKeyDown}
            handleResultSelect={this.handleResultSelect}
            handleSearchChange={this.handleSearchChange}
            handleDelete = {this.handleDelete}
            noResultsMessage={'Добавить тег'}
            props = {this.props}
        />
    }
}

export default TagInputContainer