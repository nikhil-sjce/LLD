class AppConfig{
    private static intstance: AppConfig;
    private constructor(){};
    static getInstance(): AppConfig{
        if(!AppConfig.intstance){
            AppConfig.intstance = new AppConfig();
        }
        return AppConfig.intstance;
    }
    getValue(){
        return "confif-value";
    }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2)
