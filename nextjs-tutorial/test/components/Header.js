import React, { Component } from 'react'

import styles from '../styles/Layout.module.css'

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1 className={ styles.title }>
                    { this.props.title }
                </h1> 
            </div>
        )
    }
}
