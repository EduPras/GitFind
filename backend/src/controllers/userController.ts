import githubServices from '../services/github';
import driver from '../database/connection';
import { Request, Response } from 'express';


const userController = {

    async index (request:Request, response:Response){
        const { username } = request.body;
        try{
            const user_data = await githubServices.getDataRepos(request, response, username);
            response.send(user_data).status(200)
        } catch(err){
            console.log('[USER CONTROLLER]: ', err)
            response.status(400).send({'Erro':err})
        }      
    },

    async create (request:Request, response:Response) {
        const session = driver.session();
        const {
            user,
            repos,
            techs
        } = request.body;
    
        try {
            await session.writeTransaction(tx => {
                tx.run(
                    `
                     create(u:user{username:'${user}', latitude:'239223', longitude:'238021'})
                     return u.username
                    `
                )   
    
                repos.map( (repo:string) => {
                    return tx.run(
                        `
                            match(u:user{username:'${user}'})
                            create(r:repo{name:'${repo}'})
                            create (u)<-[:owned_by]-(r)
                        `
                    )
                })
    
                techs.map( (tech:string) => {
                    return tx.run(
                        `
                            match(u:user{username:'${user}'})
                            merge(t:tech{name:'${tech}'})
                            create (u)-[:works_with]->(t)
                        `
                    )
                })
            })   
    
            return response.send({'message':'New user added'})
    
        } catch (error) {
            console.log('[neo4j]: ',error)
        } finally {
            await session.close()
            return response.send({'message': 'Closing'})
        }
        
    } 
}

export default userController;