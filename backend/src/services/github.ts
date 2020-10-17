import axios from 'axios';

interface repos{
    name: string,
    languages_url: string
}

async function getLanguages (url:string){
    try {
        const { data } = await axios.get(url)
        console.log('[GET LANGUAGES]: ', data)
        return data
    } catch (error) {
        console.log('[GET LANGUAGES]: ',error )
    }
}
async function getDataRepos(request:any, response:any){
    try {
        // get data from github
        const { data } = await axios.get('https://api.github.com/users/Edupras/repos');
    
        // get repos and languages used in
        data.map(async (repo:repos)=>{
            // for each repo get languages
            await getLanguages(repo.languages_url)
                .then(lang => {
                    console.log()
                    return {repo:repo.name, languages:lang}
                } )            
        })
        return response.send({'message':'Done'});
    } catch (error) {
        console.log('[GET REPOS]: ', error)
        return response.status(403).send({'message': 'Error'})
    } 
}

export default getDataRepos;