import { Profile } from "@/types/profile";

export interface IProfileRepository {
    getAll(): Promise<Profile[]>;
    save(profile: Profile): Promise<void>;
    delete(id: string): Promise<void>;
    saveMany(profiles: Profile[]): Promise<void>;
}
