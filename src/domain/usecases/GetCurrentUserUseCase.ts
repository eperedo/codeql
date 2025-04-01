import { FutureData } from "$/data/api-futures";
import { Future } from "$/domain/entities/generic/Future";
import { User } from "$/domain/entities/User";
import { UserRepository } from "$/domain/repositories/UserRepository";
import { getUid } from "$/utils/uid";

export class GetCurrentUserUseCase {
    constructor(private usersRepository: UserRepository) {}

    public execute(): FutureData<User> {
        const urlRegExp =
            /^(?:(?:https?:\/\/)?localhost(?::\d{2,5})?)$|(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
        const uid = getUid("dhis2-app", "dhis2-app");
        const validUrl = urlRegExp.test(uid);
        return uid.length > 0 && !validUrl
            ? this.usersRepository.getCurrent()
            : Future.error(new Error("No uid"));
    }
}
