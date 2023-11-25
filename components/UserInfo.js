export default class UserInfo {
    constructor({ profileName, profileDescription }) {
        this._name = profileName;
        this._job = profileDescription;
    }

    //Получение данных 
    getUserInfo() {
        return {
            profileName: this._name.textContent,
            profileDescription: this._job.textContent,
        };
    }

    //Присвоение данных
    setUserInfo({ name, job }) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}
