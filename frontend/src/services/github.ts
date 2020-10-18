import axios from 'axios';

const githubToken = 'your github token';

interface repos{
    name: string,
    languages_url: string
}

async function getLanguages (url:string){
    try {
        const { data } = await axios({
            method:"GET",
            url: url,

            auth: {
                username: 'edupras',
                password: githubToken
            }
        }) 

        return data 
    } catch (error) {
        console.log('[GET LANGUAGES]: ',error )
    }
}

async function getReposData(repos:repos[]){
    const reposData = repos.map(
        async (repository:repos) => {
            const langs =  await getLanguages(repository.languages_url)
            return {repo_name: repository.name, languages: langs}
        }
    )
    return reposData;
}

const githubServices = {

    async getDataRepos(username:string){

        try {
            // get data from github
            const { data } = await axios({
                method:"GET",
                url: `https://api.github.com/users/${username}/repos`,

                auth: {
                    username: 'edupras',
                    password: githubToken
                }
            })  
                
            const repos = data.map( (repo:repos)=> {
                return {name: repo.name, languages_url:repo.languages_url}                
            })

            const reposData = await getReposData(repos);
            
            const toReturn = (async () => {
                const finallyData = await Promise.all(reposData);
                return finallyData
              })();

            return toReturn
            
        } catch (error) {
            console.log('[GET REPOS]: ', error)

        } 
    }

}

export default githubServices;