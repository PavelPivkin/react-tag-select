import React from 'react'
import { Label, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export const Tags = ({tags, color, onClick, onDelete}) => (
    <div>
        {
            tags.map((tag, index) => <Label key={index} as='a' onClick={onClick} color={color} tag>{tag.title}
                { onDelete && <Icon data-id={index} name='close' onClick={onDelete} link/> }
            </Label>)
        }
    </div>
)

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
    onDelete: PropTypes.func
}

Tags.defaultProps = {
    color: 'teal'
}

export default Tags
