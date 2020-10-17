import neo4j_driver from 'neo4j-driver';

const driver =  neo4j_driver.driver('neo4j://localhost', neo4j_driver.auth.basic('gitfind', 'root'),{ encrypted : true});
export default driver;