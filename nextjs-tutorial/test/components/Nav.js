import React, { Component } from 'react'

import Link from 'next/link'

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link href="/about">about</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}
