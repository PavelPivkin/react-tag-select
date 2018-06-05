import _ from 'lodash'
import React from 'react'
import { Search, Grid, Header, Label } from 'semantic-ui-react'

var options = options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function(fruit){
    return {label: fruit, value: fruit}
});

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

class TagInput extends React.Component {
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

    handleResultSelect = (e, { result }) => this.setState({ value: '', tags: [...this.state.tags, result] })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

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
            return re.test(result.title) && this.state.tags.findIndex((item) => item.title === result.title) === -1;
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
        }
        var value = event.target.value;
        var tagNotExist = this.state.tags.findIndex((item) => {
            return item.title === value;
        }) === -1
        if (event.keyCode === KeyCodes.enter && !this.state.isSection && tagNotExist) {
            this.setState({ value: '', tags: [...this.state.tags, { title: value }]})
        }
    }
    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid stackable>
                <Grid.Column width={8}>
                    <Search
                        onKeyPress = { this.handleKeyPress }
                        onSelectionChange = { this.handleSelectionChange }
                        onKeyDown={this.handleKeyDown}
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={results}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    {
                        this.state.tags.map((item, index) => <Label key={index} as='a' color='teal' tag>{item.title}</Label>)
                    }
                </Grid.Column>

            </Grid>
        )
    }
}

export default TagInput