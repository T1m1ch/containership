export async function createSubDomain(subdomain : string) : Promise<boolean> {
    const result = await fetch(`https://api.reg.ru/api/regru2/zone/add_alias?input_data={"username":"${String(process.env.REGRU_USERNAME)}","password":"${String(process.env.REGRU_PASSWORD)}","domains":[{"dname":"${String(process.env.DOMAIN)}"}],"subdomain":"${subdomain}","ipaddr":"${String(process.env.IP)}","output_content_type":"plain"}&input_format=json`, {method : "POST"});
    const answer = await result.json(); 
    if (answer.result != "success") {  
        return false;
    }
    return true;
}