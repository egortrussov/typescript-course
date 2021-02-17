import React, { Component } from 'react'

import Nav from './Nav'

import styles from '../styles/Layout.module.css'
import Header from './Header'

export default class Layout extends Component {
    render() {
        return (
            <>
                <Nav />
                <div className={ styles.container }>
                    <main className={ styles.main }>
                        <Header
                            title="Hello"
                        />
                        { this.props.children }
                    </main>
                </div>
            </>
        )
    }
}
