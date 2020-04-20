import React, { Component } from 'react'

import octocat from 'octocat' 


const client = new octocat({
    token: '06ded2137fb96f4ddbe896ec4d055d4684efb2b8'
})

export default class App extends Component {

    state = {
        user: null,
        repos: null
    }

    componentDidMount() {
        const user = client.user('egortrussov');
        
        user.info() 
            .then((info) => {
                console.log(info)
                this.setState({
                    ...this.state,
                    user: info
                })
            })
        
        user 
            .repos({
                perPage: 300
            })
            .then((repos) => {
                let url = repos.list[0].commits_url;
                
                console.log(repos)

                let repo = client.repo(repos.list[0].full_name);
                console.log(repo)
                repo.info()  
                    .then(infos => {
                        console.log(infos)
                    })
                repo.commits()
                    .then(commits => {
                        console.log(commits)
                    })
                let commit = repo.commit('29cc3ada05826c8a754f624973a1a26d013c9593');
                commit.info().then(inn => console.log(inn))
            })

    }
    

    render() {
        const { user } = this.state;

        if (!user) return (
            <h3>Loading...</h3>
        )

        return (
            <div>
                { user.login }
                <img src={ user.avatar_url } alt=""/>
            </div>
        )
    }
}
