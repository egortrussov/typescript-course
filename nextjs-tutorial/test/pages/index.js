import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'

export default class index extends Component {
  render() {

    return (
      <div>
        <Head>
          <title>Webdev</title>
        </Head>

        <h1>Welcome!</h1>

        { this.props.articles.map(article => (
          <Link href="/article/[id]" as={ `/article/${ article.id }` }>
            { article.title }
          </Link>
        )) }
      </div>
    )
  }
}

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')

  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}