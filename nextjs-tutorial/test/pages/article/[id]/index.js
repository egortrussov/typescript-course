import React, { Component } from 'react'

import { useRouter } from 'next/router'

const article = ({ article }) => {
    const router = useRouter();

    const { id } = router.query;

    return (
        <div className="article">
            <h3>Article { article.title }</h3>
        </div>
    )
}

export const getStaticProps = async (ctx) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${ ctx.params.id }`)

    const article = await res.json();

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async (ctx) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    const articles = await res.json();

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => { return { params: { id: id.toString() } } })

    return {
        paths,
        fallback: false
    }
}

export default article