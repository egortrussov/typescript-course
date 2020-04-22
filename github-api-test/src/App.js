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

                let grid = [];
                for (let i = 0; i < 12 * 31; i++) {
                    grid.push(0)
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
                                    grid[(m - 1) * 31 + d]++;
                                } 
                            })
                        })
                })

                console.log(grid[3])

                this.setState({
                    ...this.state,
                    grid
                }, () => console.log(grid === this.state.grid))

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

        let ln = 0;
        console.log(grid)
        console.log(ln, grid[1]);

        let blocks = document.createElement('div');

        console.log(blocks)

        return (
            <div>
                { user.login }
                {
                    grid.map(i => {
                        return (
                            <span>{ i }</span>
                        )
                    })
                }
            </div>
        )
    }
}
