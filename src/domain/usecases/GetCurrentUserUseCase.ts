import { FutureData } from "$/data/api-futures";
import { Future } from "$/domain/entities/generic/Future";
import { User } from "$/domain/entities/User";
import { UserRepository } from "$/domain/repositories/UserRepository";
import { getUid } from "$/utils/uid";

export class GetCurrentUserUseCase {
    constructor(private usersRepository: UserRepository) {}

    public execute(): FutureData<User> {
        const uid = getUid("dhis2-app", "dhis2-app");
        return uid.length > 0
            ? this.usersRepository.getCurrent()
            : Future.error(new Error("No uid"));
    }
}
