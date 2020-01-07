import { DRUGS , FOODS , USERS ,LOGIN ,REGISTER, TOKEN } from "../store/DataTypes";

const port = 3500 ;
const host = "localhost" ;
const protocol = "http" ;

export const URLS = {
    [DRUGS] : `${protocol}://${host}:${port}/api/${DRUGS}`,
    [FOODS] : `${protocol}://${host}:${port}/api/${FOODS}`,
    [USERS] : `${protocol}://${host}:${port}/api/${USERS}`,
    [TOKEN] : `${protocol}://${host}:${port}/api/${TOKEN}`,
    [LOGIN] : `${protocol}://${host}:${port}/auth/${LOGIN}`,
    [REGISTER] : `${protocol}://${host}:${port}/auth/${REGISTER}`,
}