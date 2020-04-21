import React, { Component } from 'react'

import octocat from 'octocat' 


const client = new octocat({
    token: '06ded2137fb96f4ddbe896ec4d055d4684efb2b8'
})

export default class App extends Component {

    state = {
        user: null,
        repos: null,
        commits: null,
        grid: null
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
                this.setState({
                    ...this.state,
                    repos
                })
            })
            .then(() => {
                let { repos, user } = this.state;
                let username = user.login;

                let grid = new Array(12);
                for (let i = 0; i < 12; i++) {
                    grid[i] = new Array(31);
                    for (let j = 0; j < 31; j++) grid[i][j] = 0;
                }
                    
                

                repos.list.forEach(repo => {
                    client.get(`/repos/${ username }/${ repo.name }/commits`) 
                        .then(commits => {
                            let body = commits.body;
                            body.forEach(commit => {
                                let date = commit.commit.author.date;
                                let dateF = new Date(date);
                                let y = dateF.getFullYear();
                                if (y > 2019) {
                                    let m = dateF.getMonth();
                                    let d = dateF.getDate();
                                    if (typeof grid[m - 1][d - 1] === 'undefined') 
                                        grid[m - 1][d - 1] = 1;
                                    else grid[m - 1][d - 1]++;
                                } 
                            })
                        })
                })

                console.log(grid)

                this.setState({
                    ...this.state,
                    grid
                }, () => console.log(grid))

            }) 
            .then(() => {
                console.log(this.state)
                this.forceUpdate()
            })
        
    }
    

    render() {
        const { user, grid } = this.state;

        if (!user || !grid) return (
            <h3>Loading...</h3>
        )

        console.log(grid)

        let blocks = document.createElement('div');

        for (let i = 0; i < 12; i++) {
            for (let j = 0; j <= 30; j++) {
                let span = document.createElement('span');
                span.innerText = grid[i][j];
                blocks.appendChild(span)
            } 
        }

        console.log(blocks)

        return (
            <div>
                { user.login }
                <img src={ user.avatar_url } alt=""/>
            </div>
        )
    }
}
