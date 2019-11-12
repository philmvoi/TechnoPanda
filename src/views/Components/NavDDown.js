import React from "react"
import PropTypes from "prop-types"

const noop = () => {

}

class NavDDown extends React.Component {
    state = {
        value: this.props.value
    }
}

NavDDown.defaultProps = {
    onChange: noop
}

export default NavDDown