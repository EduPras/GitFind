import driver from '../database/connection';
import { Request, Response } from 'express';

const mapController = {
    // get user data = repos & techs
    async getUserData (request:Request, response:Response){
        
        const session = driver.session();
        const { username } = request.body;
        try {            
            const repos:any = await session.run(
                `
                match(u:user{username:'${username}'})
                match(r:repo)-[:owned_by]->(u)
                return r
                `,
            )
            const filtredRepos:object = repos.records.map( (repo:any) => {
                return repo.get(0).properties.name
            } )

            const techs:any = await session.run(
                `
                match(u:user{username:'${username}'})
                match(t:tech)<-[:works_with]-(u)
                return t
                `,
            )
            const filtredTechs:object = techs.records.map( (tech:any) => {
                return tech.get(0).properties.name
            } )

            return response.json({filtredRepos,filtredTechs})

        } catch (error) {
            console.log('[MAP - USER_DATA]: ', error)
            response.send({'message':error}).status(400)
        } finally{
            await session.close();
        }

    },

    // get markers = locals on map
    async getMarkers (request:Request, response:Response){

        const session = driver.session();
        try {
            const markers:any = await session.run(
                `match(u:user)
                 return [u.latitude, u.longitude]`
            )

            const filtredMarkers:object = markers.records.map( (marker:any) => {
                return marker.get(0)
            } )
            return response.json({filtredMarkers})
        } catch (error) {
            console.log('[MAP - MARKERS]: ', error)
        } finally {
            await session.close();
        }
    }

}

export default mapController;