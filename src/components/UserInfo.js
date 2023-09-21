export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._name = nameSelector;
        this._job = descriptionSelector;
    }

    //Получение данных 
    getUserInfo() {
        return {
            nameSelector: this._name.textContent,
            descriptionSelector: this._job.textContent,
        };
    }

    //Присвоение данных
    setUserInfo({ name, job }) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}
