// To parse this data:
//
//   import { Convert, UserData } from "./file";
//
//   const userData = Convert.toUserData(json);

export interface UserData {
    ResponseCode?:    number;
    ResponseMessage?: string;
    Comments?:        string;
    Result?:          Result;
}

export interface Result {
    users?: User[];
}

export interface User {
    id?:                   number;
    loginMethod?:          LoginMethod;
    accessToken?:          string;
    firstName?:            string;
    lastName?:             string;
    profilePicture?:       string;
    email?:                string;
    age?:                  number;
    gender?:               Gender;
    contactNumber?:        ContactNumber;
    city?:                 City;
    work?:                 string;
    education?:            string;
    latitude?:             number;
    longitude?:            number;
    deviceType?:           string;
    apiToken?:             string;
    lastLogin?:            Date | LastLoginEnum;
    lastSearchCriteriaId?: number;
    isUcUser?:             number;
    userRole?:             number;
    created_at?:           Date | CreatedAtEnum;
    updated_at?:           Date | CreatedAtEnum;
}

export enum City {
    Empty = "",
    London = "London",
}

export enum ContactNumber {
    Empty = "",
    The7053773020 = "7053773020",
}

export enum CreatedAtEnum {
    The00011130000000 = "-0001-11-30 00:00:00",
}

export enum Gender {
    Empty = "",
    Female = "Female",
    Male = "Male",
}

export enum LastLoginEnum {
    The00000000000000 = "0000-00-00 00:00:00",
}

export enum LoginMethod {
    Dummy = "dummy",
    Email = "email",
    Facebook = "facebook",
    Google = "google",
    Phone = "phone",
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toUserData(json: string): UserData {
        return JSON.parse(json);
    }

    export function userDataToJson(value: UserData): string {
        return JSON.stringify(value);
    }
}
