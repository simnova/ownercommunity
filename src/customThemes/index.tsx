import { theme } from 'antd'
const customTheme=(themeType:string)=>{
    const seedTokenValue=theme.defaultSeed
    let modifiedToken;
    if(themeType==="light"){
        modifiedToken={
            ...theme.defaultAlgorithm(seedTokenValue)

        }
    }else if(themeType==="dark"){
        modifiedToken={
            ...theme.darkAlgorithm(seedTokenValue)
            
        }
    }
    else if(themeType==="custom"){
        modifiedToken={
            ...theme.defaultAlgorithm(seedTokenValue),
            // and now modify the token as per the user requirement
        }
    }
   
    
    return modifiedToken
}

export default customTheme