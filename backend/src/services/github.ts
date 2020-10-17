import axios from 'axios';
import { Request, Response} from 'express';

interface repos{
    name: string,
    languages_url: string
}

async function getLanguages (url:string){
    try {
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        console.log('[GET LANGUAGES]: ',error )
    }
}


const githubServices = {

    async getDataRepos(request:Request, response:Response, username:string){

        try {
            // get data from github
            const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
        
            // get repos and languages used in
            const user_repos = data.map(async (repo:repos)=>{
                // for each repo get languages
                await getLanguages(repo.languages_url)
                    .then(lang => {
                        console.log()
                        return {repo:repo.name, languages:lang}
                    } ) 
                response.send({'message':'Got data'})           
            })
            return user_repos;
        } catch (error) {
            console.log('[GET REPOS]: ', error)
            return response.status(403).send({'message': 'Error'})
        } 
    }

}

export default githubServices;